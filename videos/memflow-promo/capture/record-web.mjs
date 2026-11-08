// Records real interactions on app.memflow.one (public test account) as high-res MP4 takes.
// Writes to the Memflow database are intercepted and answered locally, so the test account is never modified.
// Usage: node capture/record-web.mjs [take ...]   → assets/web/<take>.mp4 + capture/web/<take>.events.json
import { chromium } from "playwright";
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP = "https://app.memflow.one";
const RAW = path.join(ROOT, "capture/web");
const OUT = path.join(ROOT, "assets/web");
const VIEW = { width: 1440, height: 900 };
const DPR = 2;
const BIO = "8ed53235-8d76-4e9b-92b7-795b1f88b19d";

// Real pointer drawn inside the page so the screencast carries it.
const CURSOR = `
addEventListener('DOMContentLoaded', () => {
  const c = document.createElement('div');
  c.id = '__cursor';
  c.innerHTML = '<svg width="34" height="34" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.3 L11.6 22 L14.6 20.7 L11.7 14.2 L18 14.2 Z" fill="#2B241D" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 2147483647, pointerEvents: 'none',
    transform: 'translate(-40px,-40px)', transition: 'scale .12s ease', transformOrigin: '4px 3px', filter: 'drop-shadow(0 2px 3px rgba(43,36,29,.28))' });
  document.documentElement.appendChild(c);
  const at = (window.__cursorAt ||= { x: -40, y: -40 });
  c.style.transform = 'translate(' + (at.x - 4) + 'px,' + (at.y - 3) + 'px)';
  addEventListener('mousemove', e => { at.x = e.clientX; at.y = e.clientY; c.style.transform = 'translate(' + (e.clientX - 4) + 'px,' + (e.clientY - 3) + 'px)'; }, true);
  addEventListener('mousedown', () => { c.style.scale = '0.86'; }, true);
  addEventListener('mouseup', () => { c.style.scale = '1'; }, true);
  const s = document.createElement('style');
  s.textContent = 'html{scrollbar-width:none} ::-webkit-scrollbar{display:none} *{cursor:none!important}';
  document.head.appendChild(s);
});`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Real Chrome in a 2x virtual X screen, grabbed by ffmpeg: true 2880x1800 pixels in real time.
const DISPLAY = ":99";
async function makePage() {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "mf-rec-"));
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: false, executablePath: "/usr/bin/google-chrome", env: { ...process.env, DISPLAY }, viewport: null, locale: "fr-BE",
    args: ["--app=data:text/html,", `--force-device-scale-factor=${DPR}`, `--window-size=${VIEW.width},${VIEW.height}`, "--window-position=0,0", "--hide-scrollbars", "--lang=fr-BE", "--no-first-run", "--disable-infobars", "--test-type"],
    ignoreDefaultArgs: ["--enable-automation"],
  });
  await ctx.addCookies(JSON.parse(fs.readFileSync(path.join(RAW, "state.json"), "utf8")).cookies);
  await ctx.addInitScript(CURSOR);
  await ctx.route("**/*", (route) => {
    const q = route.request();
    const write = !["GET", "HEAD", "OPTIONS"].includes(q.method()) && q.url().includes("supabase.co/rest/");
    return write ? route.fulfill({ status: 201, contentType: "application/json", body: "[]" }) : route.continue();
  });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  const answers = new Map();
  page.on("response", async (res) => {
    if (!res.url().includes("/rest/v1/flashcards") || res.request().method() !== "GET") return;
    try { for (const c of await res.json()) if (c.question) answers.set(c.question.trim(), (c.correct_answer ?? "").trim()); } catch {}
  });
  return { ctx, page, answers };
}

function recorder(page, name) {
  const raw = path.join(RAW, `${name}.mkv`);
  const events = [];
  let ff, t0;
  const pos = { x: VIEW.width + 60, y: VIEW.height * 0.6 };
  return {
    pos,
    t0: () => t0,
    async start() {
      await page.mouse.move(pos.x, pos.y);
      ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "x11grab", "-framerate", "30", "-draw_mouse", "0", "-video_size", `${VIEW.width * DPR}x${VIEW.height * DPR}`,
        "-i", `${DISPLAY}.0+0,0`, "-copyts", "-c:v", "libx264", "-preset", "ultrafast", "-crf", "8", raw], { stdio: ["pipe", "inherit", "inherit"] });
      await sleep(700);
      t0 = Date.now() / 1000;
    },
    mark(label, extra = {}) { events.push({ label, t: +(Date.now() / 1000 - t0).toFixed(3), ...extra }); },
    async stop() {
      await sleep(400);
      const done = new Promise((r) => ff.on("exit", r));
      ff.stdin.write("q"); await done;
      const startTs = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=start_time", "-of", "csv=p=0", raw]).toString().trim();
      const offset = t0 - startTs; // seconds of video before t0
      fs.mkdirSync(OUT, { recursive: true });
      const mp4 = path.join(OUT, `${name}.mp4`);
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-vf", "setpts=PTS-STARTPTS,format=yuv420p", "-r", "30",
        "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-movflags", "+faststart", mp4]);
      const dur = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]).toString().trim();
      const shifted = events.map((e) => ({ ...e, t: +(e.t + offset).toFixed(3) }));
      fs.writeFileSync(path.join(RAW, `${name}.events.json`), JSON.stringify({ viewport: VIEW, dpr: DPR, duration: dur, events: shifted }, null, 2));
      fs.copyFileSync(path.join(RAW, `${name}.events.json`), path.join(ROOT, `capture/${name}.events.json`));
      console.log(`${name}: ${dur.toFixed(1)} s, offset ${offset.toFixed(2)} → ${path.relative(ROOT, mp4)}`);
    },
  };
}

// Human-like eased pointer travel.
async function glide(page, rec, x, y, ms = 650) {
  const { x: x0, y: y0 } = rec.pos;
  const n = Math.max(8, Math.round(ms / 16));
  for (let i = 1; i <= n; i++) {
    const k = ease(i / n);
    await page.mouse.move(x0 + (x - x0) * k, y0 + (y - y0) * k);
    await sleep(ms / n);
  }
  rec.pos.x = x; rec.pos.y = y;
}
async function center(loc) {
  await loc.waitFor({ state: "visible", timeout: 15000 });
  const b = await loc.boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}
async function clickOn(page, rec, loc, label, { ms = 650, dx = 0, dy = 0 } = {}) {
  const c = await center(loc);
  await glide(page, rec, c.x + dx, c.y + dy, ms);
  await sleep(180);
  rec.mark(label, { x: c.x + dx, y: c.y + dy });
  await page.mouse.down(); await sleep(70); await page.mouse.up();
}
// In-page eased scroll at display rate (wheel events are too slow to stay on schedule).
async function smoothScroll(page, dy, ms = 900) {
  await page.evaluate(([dy, ms]) => new Promise((done) => {
    const se = document.scrollingElement, y0 = se.scrollTop, t0 = performance.now();
    const k = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => { const t = Math.min(1, (now - t0) / ms); se.scrollTop = y0 + dy * k(t); t < 1 ? requestAnimationFrame(step) : done(); };
    requestAnimationFrame(step);
  }), [dy, ms]);
}

const takes = {
  // One continuous session choreographed on the narration (audio/voiceover.words.json).
  // FILM0: film second that matches the recorder start; at(T) waits for film second T.
  async film(page, rec) {
    const FILM0 = 2.0;
    const at = async (T) => { const wait = (T - FILM0) - (Date.now() / 1000 - rec.t0()); if (wait > 0) await sleep(wait * 1000); };
    const clickAt = async (loc, label, T, ms = 700) => {
      const c = await center(loc);
      await at(T - ms / 1000 - 0.12);
      await glide(page, rec, c.x, c.y, ms);
      await at(T);
      rec.mark(label, { x: c.x, y: c.y });
      await page.mouse.down(); await sleep(70); await page.mouse.up();
    };
    const hoverAt = async (loc, label, T, ms = 600, dx = 0, dy = 0) => {
      const c = await center(loc);
      await at(T - ms / 1000);
      await glide(page, rec, c.x + dx, c.y + dy, ms);
      rec.mark(label, { x: c.x + dx, y: c.y + dy });
    };
    await page.goto(APP + "/", { waitUntil: "networkidle" });
    await sleep(800);
    await rec.start();
    await at(3.7); await glide(page, rec, 980, 330, 700);                       // enters after the logo lands
    await at(4.35); await smoothScroll(page, 420, 900); rec.mark("scroll-collections");  // "rassemble tes cartes par matière"
    await clickAt(page.locator("main a", { hasText: "Biologie" }).first(), "open-collection", 5.95, 650); // "matière … puis"
    await page.waitForURL(/collection/);
    await clickAt(page.getByRole("link", { name: "Étudier" }).or(page.getByRole("button", { name: "Étudier" })).first(), "study", 7.4, 650); // "session … web"
    await page.waitForURL(/study/); await page.getByText("Mode d’étude").waitFor(); rec.mark("setup-shown");
    await at(8.4); await glide(page, rec, 900, 640, 900);                       // rests while the camera is on the tablet
    await hoverAt(page.getByText("La session suit le calendrier de révision de Memflow."), "hover-calendar", 13.75, 900, -120, 4); // "planifie"
    await hoverAt(page.getByText(/Les cartes dues sont prioritaires/), "hover-due", 15.0, 800, -60, 0);                         // "selon tes réponses"
    await hoverAt(page.getByText("QCM", { exact: true }), "hover-qcm", 16.47, 650);
    await hoverAt(page.getByText("Flashcard", { exact: true }), "hover-flashcard", 17.24, 550);
    await hoverAt(page.getByText("Texte à trous", { exact: true }), "hover-cloze", 18.33, 550);
    await clickAt(page.getByRole("link", { name: "Importer", exact: true }).first(), "nav-import", 22.35, 800); // "Tu as déjà un fichier ?"
    await page.waitForURL(/importer/); await page.getByRole("button", { name: "Parcourir les fichiers" }).waitFor();
    const chooser = page.waitForEvent("filechooser");
    await clickAt(page.getByRole("button", { name: "Parcourir les fichiers" }), "browse", 23.8, 650);           // "Importe-le"
    await (await chooser).setFiles(path.join(ROOT, "capture/biologie-cellule.csv"));
    await page.getByRole("heading", { name: "Prévisualisation" }).waitFor(); rec.mark("preview-shown");
    await at(24.55); await smoothScroll(page, 470, 900); rec.mark("scroll-preview");                          // "vérifie l'aperçu"
    await hoverAt(page.getByRole("button", { name: "Confirmer l’import" }), "hover-confirm", 25.95, 700);     // "puis commence"
    await clickAt(page.getByRole("link", { name: "Stats", exact: true }).first(), "nav-stats", 26.9, 750);    // "Tes cartes" → cut to the stats take
    await at(28.0);
  },
  // Stats page already loaded (it takes ~3.4 s to load); joined to "film" on the Stats click.
  async statsfilm(page, rec) {
    const FILM0 = 26.0;
    const at = async (T) => { const wait = (T - FILM0) - (Date.now() / 1000 - rec.t0()); if (wait > 0) await sleep(wait * 1000); };
    await page.goto(APP + "/stats", { waitUntil: "networkidle" });
    await page.getByText("Activité").first().waitFor(); await sleep(800);
    rec.pos.x = 120; rec.pos.y = 180;
    await rec.start();
    await page.mouse.move(120, 180);
    await at(27.3); await glide(page, rec, 700, 520, 700); rec.mark("glide");
    await at(27.9); await smoothScroll(page, 300, 1300); rec.mark("scroll-stats");                           // "progression"
    await at(31.0);
  },
  // Dashboard → collection → study setup → flashcard → reveal → rate → next card
  async flow(page, rec) {
    await page.goto(APP + "/", { waitUntil: "networkidle" });
    await sleep(600);
    await rec.start();
    await sleep(900);
    await glide(page, rec, 900, 300, 900);
    await sleep(500);
    await smoothScroll(page, 420, 1000);
    await sleep(400);
    const card = page.locator("main a", { hasText: "Biologie" }).first();
    await clickOn(page, rec, card, "open-collection", { ms: 750 });
    await page.waitForURL(/collection/); await page.waitForLoadState("networkidle"); await sleep(1200);
    rec.mark("collection-shown");
    await clickOn(page, rec, page.getByRole("link", { name: "Étudier" }).or(page.getByRole("button", { name: "Étudier" })).first(), "study", { ms: 800 });
    await page.waitForURL(/study/); await page.waitForLoadState("networkidle"); await sleep(900);
    rec.mark("setup-shown");
    await clickOn(page, rec, page.getByText("Flashcard", { exact: true }), "mode-flashcard", { ms: 700 });
    await sleep(500);
    await clickOn(page, rec, page.getByRole("button", { name: /Commencer la session/ }), "start", { ms: 700 });
    await page.getByRole("button", { name: /Afficher la réponse/ }).waitFor(); await sleep(400);
    rec.mark("card-shown");
    await sleep(1400);
    await clickOn(page, rec, page.getByRole("button", { name: /Afficher la réponse/ }), "reveal", { ms: 700 });
    await sleep(1500);
    await clickOn(page, rec, page.locator("aside button", { hasText: "Correct" }), "rate-correct", { ms: 800 });
    await sleep(1600);
    rec.mark("next-card");
  },
  // QCM: pick the right option, see it confirmed, keep the suggested grade
  async qcm(page, rec, answers) {
    await page.goto(`${APP}/study?collectionId=${BIO}`, { waitUntil: "networkidle" });
    await page.getByText("QCM", { exact: true }).click();
    await sleep(300);
    await page.mouse.move(VIEW.width + 60, VIEW.height * 0.6);
    await rec.start();
    await sleep(500);
    await clickOn(page, rec, page.getByRole("button", { name: /Commencer la session/ }), "start", { ms: 800 });
    const h = page.locator("#study-question h1, #study-question h2, #study-question [class*=questionPrompt] h1").first();
    await page.locator("#study-question button").first().waitFor(); await sleep(500);
    rec.mark("question-shown");
    const q = (await page.locator("#study-question").innerText()).trim();
    let right = null;
    for (const [question, a] of answers) if (q.includes(question)) right = a;
    const opts = page.locator("#study-question button:not(details *)");
    const texts = await opts.allInnerTexts();
    const idx = Math.max(0, texts.findIndex((t) => right && t.trim().endsWith(right)));
    console.log("qcm:", q.split("\n").slice(-6).join(" / "), "→", right, idx);
    await sleep(1400);
    await clickOn(page, rec, opts.nth(idx), "answer", { ms: 800 });
    await sleep(1700);
    await clickOn(page, rec, page.locator("aside button", { hasText: "Correct" }), "rate-correct", { ms: 800 });
    await sleep(1500);
    rec.mark("next-card");
  },
  // Import: choose a CSV, preview appears, scroll to it, point at confirm (never confirmed)
  async import(page, rec) {
    await page.goto(APP + "/importer", { waitUntil: "networkidle" });
    await sleep(500);
    await rec.start();
    await sleep(700);
    const chooser = page.waitForEvent("filechooser");
    await clickOn(page, rec, page.getByRole("button", { name: "Parcourir les fichiers" }), "browse", { ms: 850 });
    await (await chooser).setFiles(path.join(ROOT, "capture/biologie-cellule.csv"));
    rec.mark("file-chosen");
    await page.getByRole("heading", { name: "Prévisualisation" }).waitFor();
    await sleep(500);
    await smoothScroll(page, 470, 1100);
    rec.mark("preview-shown");
    await sleep(900);
    await glide(page, rec, 700, 560, 900);
    await sleep(500);
    const confirm = await center(page.getByRole("button", { name: "Confirmer l’import" }));
    await glide(page, rec, confirm.x, confirm.y, 800);
    rec.mark("hover-confirm");
    await sleep(1500);
  },
  // Stats: settle, then travel down to the charts
  async stats(page, rec) {
    await page.goto(APP + "/stats", { waitUntil: "networkidle" });
    await sleep(1200);
    await rec.start();
    await sleep(500);
    await glide(page, rec, 640, 470, 900);
    await sleep(600);
    await smoothScroll(page, 260, 1300);
    rec.mark("scrolled");
    await sleep(1600);
  },
};

const xvfb = spawn("Xvfb", [DISPLAY, "-screen", "0", `${VIEW.width * DPR}x${VIEW.height * DPR}x24`, "-nolisten", "tcp"], { stdio: "ignore" });
await sleep(800);
fs.mkdirSync(RAW, { recursive: true });
try {
  if (!fs.existsSync(path.join(RAW, "state.json"))) {
    const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
    const ctx = await browser.newContext({ viewport: VIEW, locale: "fr-BE" });
    const p = await ctx.newPage();
    await p.goto(APP + "/auth", { waitUntil: "networkidle" });
    await p.fill("#email", "test@memflow.one");
    await p.fill("#password", "TestMemflow2026");
    await p.getByRole("button", { name: "Se connecter" }).click();
    await p.waitForURL((u) => !u.pathname.startsWith("/auth"), { timeout: 20000 });
    await ctx.storageState({ path: path.join(RAW, "state.json") });
    await browser.close();
  }
  for (const name of process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(takes)) {
    const { ctx, page, answers } = await makePage();
    const rec = recorder(page, name);
    await takes[name](page, rec, answers);
    await rec.stop();
    await ctx.close();
  }
} finally {
  xvfb.kill();
}

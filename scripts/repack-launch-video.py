#!/usr/bin/env python3
"""Reproducible transform for the standalone launch-video bundle.

`public/launch-video.html` is a self-contained HyperFrames bundle. The entire
video player lives in one gzip+base64 asset inside the manifest: the
`launch-scenes.jsx` React source (UUID below). This script decodes that asset,
applies a set of guarded edits to the `Stage` / `PlaybackBar` components, and
re-encodes it back into the bundle so the binary blob is never hand-edited.

Edits:
  1. autoplay off  -> the video starts paused (play on demand)
  2. start at t=0   -> the big play button always shows on load
  3. drop dark frame -> Stage background transparent so the cream page shows through
  4. light control bar + light icon buttons (on-brand, sits below the canvas)
  5. touch support for the scrubber (mobile)
  6. big centered play-button overlay while paused
  7. scope the keydown handler to when the stage is hovered (no host-page hijack)

Run:  python3 scripts/repack-launch-video.py
Idempotent-safe: each edit asserts its anchor appears exactly once, so re-running
on an already-patched file fails loudly instead of corrupting it.
"""
import base64
import gzip
import json
import os
import sys

HTML = os.path.join(os.path.dirname(__file__), "..", "public", "launch-video.html")
ASSET_UUID = "d31c88ba-607e-4684-a724-afcd3db68094"
MANIFEST_LINE = 169  # 0-indexed line holding the single-line manifest JSON


def apply_edit(src, name, old, new):
    n = src.count(old)
    if n != 1:
        raise SystemExit(f"EDIT '{name}': expected exactly 1 occurrence, found {n}")
    print(f"  ok  {name}")
    return src.replace(old, new)


def transform(js):
    # 1 — play on demand (no autoplay)
    js = apply_edit(
        js, "autoplay off",
        '<Stage width={1920} height={1080} duration={30} background={C.bg} persistKey="memflow-launch">',
        '<Stage width={1920} height={1080} duration={30} background={C.bg} autoplay={false} persistKey="memflow-launch">',
    )

    # 2 — always start at t=0 so the play button shows every visit
    js = apply_edit(
        js, "start at 0",
        "const [time, setTime] = useState(() => { try { const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0'); return isFinite(v) ? clamp(v, 0, duration) : 0; } catch { return 0; } });",
        "const [time, setTime] = useState(0);",
    )

    # 7a — add a hovered ref alongside the other Stage refs
    js = apply_edit(
        js, "hoveredRef declaration",
        "const stageRef = useRef(null), rafRef = useRef(null), lastTsRef = useRef(null);",
        "const stageRef = useRef(null), rafRef = useRef(null), lastTsRef = useRef(null), hoveredRef = useRef(false);",
    )

    # 3 + 7b — Stage outer: cream background (matches the canvas, so the
    # letterbox blends into the inset card instead of showing the dark page
    # body) + track hover for the key guard
    js = apply_edit(
        js, "stage frame cream + hover",
        "<div ref={stageRef} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif' }}>",
        "<div ref={stageRef} onMouseEnter={() => { hoveredRef.current = true; }} onMouseLeave={() => { hoveredRef.current = false; }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FDFAF6', fontFamily: 'Inter, system-ui, sans-serif' }}>",
    )

    # 6a — make the canvas region positioned so the play overlay can cover it
    js = apply_edit(
        js, "flex region relative",
        "<div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: 0 }}>",
        "<div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: 0 }}>",
    )

    # 3b + 6b — drop the heavy shadow and inject the big play overlay after the canvas box
    js = apply_edit(
        js, "canvas shadow off + play overlay",
        "<div style={{ width, height, background, position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', overflow: 'hidden' }}>\n          <TimelineContext.Provider value={ctxValue}>{children}</TimelineContext.Provider>\n        </div>",
        "<div style={{ width, height, background, position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0, boxShadow: 'none', overflow: 'hidden' }}>\n          <TimelineContext.Provider value={ctxValue}>{children}</TimelineContext.Provider>\n        </div>\n        {!playing && (\n          <button onClick={() => setPlaying(true)} aria-label=\"Lire la vidéo\" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(253,250,246,0.18)', border: 'none', cursor: 'pointer', zIndex: 5 }}>\n            <span style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(255,255,255,0.94)', boxShadow: '0 8px 28px rgba(28,20,16,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s ease' }}>\n              <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\"><path d=\"M11 7l12 8-12 8V7z\" fill=\"#DE7935\"/></svg>\n            </span>\n          </button>\n        )}",
    )

    # 7c — only handle keys while the stage is hovered (no host-page hijack)
    js = apply_edit(
        js, "keydown hover guard",
        "const onKey = (e) => {\n      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;",
        "const onKey = (e) => {\n      if (!hoveredRef.current) return;\n      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;",
    )

    # 4 — light control bar container
    js = apply_edit(
        js, "bar background light",
        "background: 'rgba(20,20,20,0.92)',",
        "background: '#FFFFFF',",
    )
    js = apply_edit(
        js, "bar border + spacing",
        "borderTop: '1px solid rgba(255,255,255,0.08)', width: '100%', maxWidth: 680, alignSelf: 'center', borderRadius: 8,",
        "border: '1px solid rgba(100,70,40,0.12)', boxShadow: '0 1px 3px rgba(28,20,16,0.06)', marginTop: 12, width: '100%', maxWidth: 680, alignSelf: 'center', borderRadius: 8,",
    )
    js = apply_edit(
        js, "bar text color",
        "color: '#f6f4ef', fontFamily: 'Inter, system-ui, sans-serif', userSelect: 'none', flexShrink: 0 }}>",
        "color: '#1C1410', fontFamily: 'Inter, system-ui, sans-serif', userSelect: 'none', flexShrink: 0 }}>",
    )
    js = apply_edit(
        js, "duration readout color",
        "width: 60, color: 'rgba(246,244,239,0.55)' }}>{fmt(duration)}",
        "width: 60, color: '#6B5B4A' }}>{fmt(duration)}",
    )
    js = apply_edit(
        js, "scrubber track color",
        "height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}/>",
        "height: 4, background: 'rgba(100,70,40,0.12)', borderRadius: 2 }}/>",
    )
    js = apply_edit(
        js, "scrubber knob on light",
        "width: 12, height: 12, marginLeft: -6, marginTop: -6, background: '#fff', borderRadius: 6, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}/>",
        "width: 12, height: 12, marginLeft: -6, marginTop: -6, background: '#fff', border: '1px solid rgba(100,70,40,0.18)', borderRadius: 6, boxShadow: '0 1px 3px rgba(28,20,16,0.25)' }}/>",
    )

    # 4 — light icon buttons
    js = apply_edit(
        js, "icon button background",
        "background: h ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',",
        "background: h ? 'rgba(100,70,40,0.10)' : 'transparent', border: '1px solid rgba(100,70,40,0.14)',",
    )
    js = apply_edit(
        js, "icon button color",
        "borderRadius: 6, color: '#f6f4ef', cursor: 'pointer', padding: 0, transition:",
        "borderRadius: 6, color: '#1C1410', cursor: 'pointer', padding: 0, transition:",
    )

    # 5 — touch support for the scrubber
    js = apply_edit(
        js, "timeFromEvent touch-aware",
        "const timeFromEvent = (e) => {\n    const rect = trackRef.current.getBoundingClientRect();\n    return clamp((e.clientX - rect.left) / rect.width, 0, 1) * duration;\n  };",
        "const timeFromEvent = (e) => {\n    const rect = trackRef.current.getBoundingClientRect();\n    const cx = e.clientX != null ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0));\n    return clamp((cx - rect.left) / rect.width, 0, 1) * duration;\n  };",
    )
    js = apply_edit(
        js, "drag listeners + touch",
        "const onUp = () => setDragging(false);\n    const onMove = (e) => { if (trackRef.current) onSeek(timeFromEvent(e)); };\n    window.addEventListener('mouseup', onUp); window.addEventListener('mousemove', onMove);\n    return () => { window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onMove); };",
        "const onUp = () => setDragging(false);\n    const onMove = (e) => { if (trackRef.current) { if (e.cancelable) e.preventDefault(); onSeek(timeFromEvent(e)); } };\n    window.addEventListener('mouseup', onUp); window.addEventListener('mousemove', onMove);\n    window.addEventListener('touchend', onUp); window.addEventListener('touchmove', onMove, { passive: false });\n    return () => { window.removeEventListener('mouseup', onUp); window.removeEventListener('mousemove', onMove); window.removeEventListener('touchend', onUp); window.removeEventListener('touchmove', onMove); };",
    )
    js = apply_edit(
        js, "scrubber touch start",
        '<div ref={trackRef} onMouseDown={(e) => { setDragging(true); onSeek(timeFromEvent(e)); }}',
        '<div ref={trackRef} onTouchStart={(e) => { setDragging(true); onSeek(timeFromEvent(e)); }} onMouseDown={(e) => { setDragging(true); onSeek(timeFromEvent(e)); }}',
    )

    # 8 — fix logo path: assets/logo.png is relative to the composition source;
    #     when served as an iframe from the Next.js app the resolved URL is wrong.
    #     /logo.png is the correct absolute path (served from public/).
    js = apply_edit(
        js, "logo absolute path",
        'src="assets/logo.png"',
        'src="/logo.png"',
    )

    # 9 — landing page link should point to the app, not the marketing root
    js = apply_edit(
        js, "link app.memflow.one",
        "}}>memflow.one</span>",
        "}}>app.memflow.one</span>",
    )
    return js


def main():
    with open(HTML, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n")
    manifest = json.loads(lines[MANIFEST_LINE])
    entry = manifest[ASSET_UUID]

    js = gzip.decompress(base64.b64decode(entry["data"])).decode("utf-8")
    print("patching launch-scenes.jsx:")
    new_js = transform(js)

    packed = base64.b64encode(gzip.compress(new_js.encode("utf-8"))).decode("ascii")
    entry["data"] = packed
    entry["compressed"] = True
    lines[MANIFEST_LINE] = json.dumps(manifest, separators=(",", ":"))
    with open(HTML, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    # round-trip verification
    text2 = open(HTML, "r", encoding="utf-8").read()
    m2 = json.loads(text2.split("\n")[MANIFEST_LINE])
    js2 = gzip.decompress(base64.b64decode(m2[ASSET_UUID]["data"])).decode("utf-8")
    checks = [
        "autoplay={false}",
        "useState(0)",
        "hoveredRef = useRef(false)",
        "background: '#FDFAF6', fontFamily: 'Inter",
        "Lire la vidéo",
        "background: '#FFFFFF',",
        "onTouchStart=",
        "if (!hoveredRef.current) return;",
        'src="/logo.png"',
        "}}>app.memflow.one</span>",
    ]
    missing = [c for c in checks if c not in js2]
    if missing:
        raise SystemExit(f"ROUND-TRIP FAILED, missing: {missing}")
    print("ROUND-TRIP OK")


if __name__ == "__main__":
    main()

# MemFlow Official Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Refresh the official MemFlow site as a truthful, French, web-first product presentation with a public test login and a clear mobile/tablet availability date.

**Architecture:** Keep the existing Next.js app and legal routes. Replace the homepage's outdated demo-oriented composition with focused product sections, update shared navigation/footer/metadata, and preserve the existing video section and player assets byte-for-byte.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide.

**Spec:** [2026-11-08-memflow-site-redesign-design.md](../specs/2026-11-08-memflow-site-redesign-design.md)

## Global Constraints

- Use the existing site repository and dependencies.
- Keep MemFlow's warm cream, dark ink, and orange palette with Lora and Outfit.
- Do not introduce a contrasting accent stripe, band, notch, or sharply demarcated accent block.
- Write site copy in French and prioritize the current web product.
- Show the public account `test@memflow.one` with password `TestMemflow2026`.
- Say the ready mobile/tablet version is planned for public availability around summer 2027.
- Do not edit the video component or its assets.
- Remove the discontinued demo-site references.
- Do not publish or deploy.

## Review Focus

- Mobile navigation, product sections, and credential panel fit narrow screens without horizontal overflow.
- Account email and password remain readable and selectable on both light and accent surfaces.
- Reduced-motion preferences remain respected by the rewritten sections.
- Legal routes, cookie controls, analytics behavior, and footer links continue to work.
- The preserved video section still composes correctly with the new surrounding layout.

---

### Task 1: Replace the demo-oriented homepage with the current web product story

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/hero.tsx`
- Modify: `components/product-showcase.tsx`
- Modify: `components/study-modes.tsx`
- Modify: `components/spaced-repetition.tsx`
- Modify: `components/import-section.tsx`
- Modify: `components/stats-section.tsx`
- Modify: `components/use-cases.tsx`
- Create or modify focused section components as needed under `components/`
- Preserve unchanged: `components/video-section.tsx`, `public/launch-video.html`, and video assets

**Interfaces:**
- Consumes: current copy and route from the approved spec; current app screenshots only if they faithfully represent the web app.
- Produces: one home page with a web-first hero, current feature story, public test-account panel, and mobile/tablet timing note.

- [x] **Step 1: Map old homepage sections to the approved content structure**
  Keep the video section in its existing place and remove the demo CTA section from the page composition. Consolidate or replace sections whose content describes obsolete app states.
- [x] **Step 2: Build the web-first hero and product sections**
  Use current Memflow Web capabilities only. The six study modes are QCM, classic flashcards, reversed flashcards, cloze, free text, and true/false. Describe CSV preview/validation accurately and avoid claiming in-app AI generation.
- [x] **Step 3: Add the public test-account panel and platform timing note**
  Show the exact supplied credentials as selectable text, link to `https://app.memflow.one`, and state that mobile/tablet is ready but planned for public availability around summer 2027.
- [x] **Step 4: Review composition and responsive styles**
  Retain brand palette and Lora/Outfit, ensure layouts adapt to phone/tablet/desktop, and avoid contrasting accent bands or notches.

### Task 2: Update shared site navigation, footer, and metadata

**Files:**
- Modify: `components/navbar.tsx`
- Modify: `components/footer.tsx`
- Modify: `components/final-cta.tsx`
- Modify: `components/demo-cta.tsx` (remove from composition or replace with a correctly named app-access section)
- Modify: `app/layout.tsx`
- Modify: `app/opengraph-image.tsx`
- Modify: legal copy only where it still says the discontinued demo collects signup data

**Interfaces:**
- Consumes: homepage destinations and approved wording from Task 1.
- Produces: consistent web-app CTAs, legal/footer navigation, and current search/social metadata without demo references.

- [x] **Step 1: Replace demo links and labels in shared navigation and footer**
  Keep one primary “Ouvrir l’application” route to `https://app.memflow.one`; remove demo-site destinations from desktop and mobile menus.
- [x] **Step 2: Align final CTA and page metadata**
  Use French, web-first descriptions matching the current product and update the Open Graph presentation while preserving the brand mark.
- [x] **Step 3: Remove outdated demo-only privacy wording**
  Keep the legal statements accurate for current site behavior and preserve existing legal navigation.

### Task 3: Remove obsolete demo section wiring and verify the resulting site

**Files:**
- Modify: `app/page.tsx`
- Delete or repurpose: `components/demo-cta.tsx` if no longer referenced
- Modify: `app/(legal)/politique-confidentialite/page.tsx` only for demo signup wording
- Inspect only: `components/video-section.tsx`, `public/launch-video.html`, and video assets

- [x] **Step 1: Remove remaining references to the discontinued demo**
  Search the site source for `demo.memflow.one`, “Essayer la démo”, and obsolete prefilled-demo claims; remove or replace marketing references.
- [x] **Step 2: Confirm video preservation**
  Compare the video-related files to the initial git state and ensure they have no changes.
- [x] **Step 3: Run the production build**
  Run: `pnpm run build`
  Expected: Next.js production build completes successfully.
- [x] **Step 4: Review the final diff**
  Run: `git diff --check`
  Expected: no whitespace errors; confirm only intended marketing/legal/shared files changed.

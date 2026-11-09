# MemFlow official site redesign

## Intent

Refresh the official MemFlow marketing site so it describes the current web application accurately and gives visitors a clear route into it. The product site should prioritize the web experience while setting expectations that the ready mobile and tablet versions will only become available later, around summer 2027.

## Audience and primary job

French-speaking learners who want to organize study material and practice retrieval over time. The site should explain the current web product, show its actual workflow, and let a visitor open the app. A public test account is available for visitors who want to explore it.

## Goals

- Present MemFlow as a web-first study and spaced-repetition application.
- Describe only capabilities present in the current Memflow Web repo: collections and decks, six study modes, spaced repetition, CSV import/export, study statistics, and offline-first local work with background synchronization.
- Make app.memflow.one the primary product destination.
- Provide the public test login: `test@memflow.one`, password `TestMemflow2026`.
- State that mobile/tablet is ready, but its public availability is planned for around summer 2027.
- Preserve the site's French legal pages and navigation to them.
- Keep the existing presentation video and its assets unchanged for Claude's separate work.
- Remove links and copy for the discontinued demo site.

## Non-goals

- Rework, regenerate, or edit the video component or `public/launch-video.html`.
- Build or link to a demo site.
- Change the Memflow Web application itself.
- Publish or deploy the site.

## Constraints

- Continue using the existing Next.js site repository and dependency set.
- Preserve MemFlow's warm cream, dark ink, and orange brand palette; use Lora and Outfit for display and interface text.
- Do not introduce a contrasting accent stripe, band, notch, or sharply demarcated accent block.
- Keep marketing copy in French and make web capabilities the main focus.
- The mobile/tablet statement must say that the version is ready but not available until later, around summer 2027.
- The supplied test credentials are public and may appear on the official site.
- Leave the video code, player layout, and video assets untouched.

## Content and structure

1. A simpler navigation with product sections and one primary “Ouvrir l’application” action.
2. A web-first hero with a clear value proposition and a truthful preview of the current web workspace.
3. A compact explanation of organizing courses in collections and decks and practicing in six study modes.
4. A section on spaced repetition and progress tracking.
5. A section explaining CSV import/export and its actual preview/validation workflow.
6. A public test-account panel with the supplied credentials and a direct link to app.memflow.one.
7. A clear availability note for the ready mobile/tablet versions, planned around summer 2027.
8. The existing video section, included without edits, plus the existing legal footer and cookie behavior.

## Visual direction

Keep the recognizable warm MemFlow palette and Lora/Outfit typography, but replace the current stack of generic marketing sections with a composed, editorial product story. Use real interface evidence from the current web application where available, restrained spacing and surfaces, and a strong typographic hero. Maintain readable line lengths and responsive layouts. Avoid contrasting color bands and decorative gradients that compete with product details.

## Acceptance criteria

- The home page clearly prioritizes and links to the current web application.
- Visitors can find and copy the public test email and password.
- The mobile/tablet availability statement is unambiguous and gives the around-summer-2027 timing.
- No current page or shared navigation links to `demo.memflow.one` or describes the old demo flow.
- The existing video implementation and its assets are unchanged.
- The marketing claims match current Memflow Web behavior.
- The site remains responsive and preserves legal pages, cookie behavior, keyboard focus, and reduced-motion support.

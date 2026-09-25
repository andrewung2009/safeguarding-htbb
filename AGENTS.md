# AGENTS.md

## Project Overview

Static HTML/CSS/JS single-page app — a church safeguarding training course for HTBB (Holy Trinity Bukit Bintang). Built with Vite, ES modules, no framework. Deploys to GitHub Pages as static files.

## Quick Start

```bash
npm install
npm run dev        # starts Vite dev server on http://localhost:3000
```

## Build & Deploy

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

Deploys automatically on push to `main` via GitHub Actions (`peaceiris/actions-gh-pages`) to the `gh-pages` branch. GitHub Pages must be set to "Deploy from a branch" → `gh-pages`.

## Files

| File | Role |
|------|------|
| `index.html` | Vite entry point. Shell DOM (header with theme toggle, `<main>` content area, bottom nav). Service worker registration. |
| `src/main.js` | Entry point — imports CSS and calls `init()`. |
| `src/app.js` | All rendering, event listeners, and init logic (~1050 lines). Hub view + progressive lesson flow. |
| `src/icons.js` | 17 inline SVG icon strings in `ICONS` object. |
| `src/utils.js` | Helpers: `escHtml`, `arrEq`, `getYoutubeEmbedUrl`. |
| `src/state.js` | `localStorage` state with schema versioning and input sanitization (`saveState`, `loadState`). |
| `src/course-data.js` | Entire course content inlined as `COURSE_DATA` object. |
| `src/style.css` | Full stylesheet with CSS custom properties. Light + dark mode via `body.dark` class. |
| `public/htbb-logo.png` | Logo asset (served at root). |
| `public/manifest.json` | PWA manifest. |
| `public/sw.js` | Service worker — stale-while-revalidate for HTML, cache-first for assets. |

## Architecture

**Module dependency flow:**
```
main.js → app.js → icons.js, utils.js, state.js, course-data.js
```

**State:** `localStorage` key `htbb-safeguarding-state` (schema v2). Shape: `{ v, view, currentLessonId, currentBlockIndex, quizAnswers, discussionTexts }`. View is `'hub'` or `'lesson'`. `currentBlockIndex` tracks progressive block disclosure within a lesson. Theme preference stored separately under `htbb-theme`.

**Content block types:** `video`, `quiz`, `discussion`, `scenario`, `text`, `principles`, `officers`, `links`, `warning`, `safer-recruitment`, `declaration`

The app has two views:
- **Hub view**: Module card grid with progress ring, resume button, course stats
- **Lesson view**: Progressive block-by-block flow (one block at a time, "Next Step" to advance)

Scenario lessons render a collapsible scenario reference panel above their quiz blocks.

## Editing Course Content

All course content lives in `src/course-data.js`. To add/modify lessons, edit that object directly. Each lesson has `id`, `title`, `icon`, and `blocks` array.

**Quiz block schema:**
```js
{
  type: "quiz",
  id: "q-s1-1",              // unique, used as key in quizAnswers
  questionNumber: 1,
  question: "Text?",
  options: [
    { id: "a", label: "A.", text: "..." },
    { id: "b", label: "B.", text: "..." }
  ],
  correctAnswers: ["a"],      // array of option ids
  selectMode: "single"        // or "multi"
}
```

## Code Conventions

- ES modules (`import`/`export`) — no IIFE wrapper.
- All DOM rendering via `innerHTML` string concatenation.
- SVG icons are inline strings in `ICONS`, not external files.
- Accessibility: `aria-hidden` on decorative SVGs, `role="status"` on live feedback, labels use `for`/`id` pairs, `announce()` helper for screen reader announcements.
- Dark mode: `body.dark` class (not media query) so users can toggle; respects `prefers-color-scheme` on first visit.
- No test framework, no linter. Manual browser testing only.

## Gotchas

- `COURSE_DATA` is ~660 lines of inline JS — easy to break with missing commas/brackets.
- YouTube URL parsing via regex in `getYoutubeEmbedUrl()`.
- Declaration block renders a prominent link to `DECLARATION_URL` (forms.cloud.microsoft) in a new tab — no in-app form, no gating.
- The final module is locked on the hub until every other lesson is complete (`isModuleLocked()` / `isLessonLocked()` in app.js).
- Progress percentage is quiz-only, not discussions or other block types.
- Quiz handlers exist in two places (`updateQuizCard` and `attachQuizListeners`) — keep them in sync or consolidate.
- WSL users must run `npm` from WSL, not Windows PowerShell.

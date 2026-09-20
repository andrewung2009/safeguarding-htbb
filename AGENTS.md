# AGENTS.md

## Project Overview

Static HTML/CSS/JS single-page app — a church safeguarding training course for HTBB. Built with Vite, ES modules, no framework. Deploys to GitHub Pages as static files.

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

For GitHub Pages: set base path in `vite.config.js` if deploying to a subdirectory (e.g., `base: '/repo-name/'`).

## Files

| File | Role |
|------|------|
| `index.html` | Vite entry point. Shell DOM (header with back button, content area, bottom nav with step dots). |
| `src/main.js` | Entry point — imports CSS and calls `init()`. |
| `src/app.js` | All rendering, event listeners, and init logic (~1000 lines). Hub view + progressive lesson flow. |
| `src/icons.js` | 20 inline SVG icon strings. |
| `src/utils.js` | Helpers: `escHtml`, `arrEq`, `getYoutubeEmbedUrl`. |
| `src/state.js` | `localStorage` state management (`saveState`, `loadState`). |
| `src/course-data.js` | Entire course content inlined as `COURSE_DATA` object. |
| `src/style.css` | Full stylesheet with CSS custom properties. |
| `public/htbb-logo.png` | Logo asset (served at root). |

## Architecture

**Module dependency flow:**
```
main.js → app.js → icons.js, utils.js, state.js, course-data.js
```

**State:** `localStorage` key `htbb-safeguarding-state`. Shape: `{ view, currentLessonId, currentBlockIndex, quizAnswers, discussionTexts, expandedModules, declarationChecks }`. View is `'hub'` or `'lesson'`. `currentBlockIndex` tracks progressive block disclosure within a lesson.

**Content block types:** `video`, `quiz`, `discussion`, `scenario`, `text`, `principles`, `officers`, `links`, `warning`, `safer-recruitment`, `declaration`, `closing`

## Architecture

The app has two views:
- **Hub view**: Module card grid with progress ring, course stats
- **Lesson view**: Progressive block-by-block flow (one block at a time, "Continue" to advance)

No sidebar — navigation is via module cards on the hub and prev/next buttons at the bottom of lessons.

## Editing Course Content

All course content lives in `src/course-data.js`. To add/modify lessons, edit that object directly. Each lesson has `id`, `title`, `icon`, and `blocks` array.

## Code Conventions

- ES modules (`import`/`export`) — no IIFE wrapper.
- All DOM rendering via `innerHTML` string concatenation.
- SVG icons are inline strings in `ICONS`, not external files.
- No test framework, no linter. Manual browser testing only.

## Gotchas

- `COURSE_DATA` is ~660 lines of inline JS — easy to break with missing commas/brackets.
- YouTube URL parsing via regex in `getYoutubeEmbedUrl()`.
- Declaration form opens a Microsoft Forms URL in a new tab.
- Progress percentage is quiz-only, not discussions or other block types.
- `expandedModules` defaults all modules to expanded on first load.
- Old `app.js` (IIFE version) is kept as reference — the active code is in `src/app.js`.

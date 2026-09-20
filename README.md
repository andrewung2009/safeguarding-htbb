# safeguarding-htbb

HTBB Church Safeguarding Training Course — an interactive e-learning module covering how to recognise, respond to, and prevent abuse in church ministry.

## Quick Start

```bash
npm install
npm run dev
```

Opens at **http://localhost:3000**.

## Build for Production

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

## Course Structure

7 modules covering safeguarding topics including introduction, gospel context, scope, types of abuse, responding to disclosure, practical safeguarding, and self-declaration.

## Editing Course Content

All course content is inlined in `src/course-data.js` as the `COURSE_DATA` object. Edit that object to add, remove, or modify lessons and quizzes.

## Tech Stack

Vanilla HTML, CSS, and JavaScript with Vite for dev server and build. No frameworks. Deploys to GitHub Pages as static files.

## Project Structure

```
├── index.html              # Vite entry point
├── src/
│   ├── main.js             # Entry point — imports CSS, calls init()
│   ├── app.js              # All rendering, listeners, and init logic
│   ├── icons.js            # 20 inline SVG icon strings
│   ├── utils.js            # Helper functions
│   ├── state.js            # localStorage state management
│   ├── course-data.js      # Entire course content (~660 lines)
│   └── style.css           # Full stylesheet with CSS custom properties
├── public/
│   └── htbb-logo.png       # Logo asset
└── vite.config.js           # Vite configuration
```

# Prasad Gopishetty — Portfolio

Personal portfolio site. Static HTML/CSS/JS, no build step.

**Live:** https://prasadkuce.github.io/prasad-portfolio/

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All content — hero, profile, skills, experience, projects, credentials, contact |
| `styles.css` | Design tokens, layout, light/dark themes, print styles |
| `script.js` | Theme toggle, scroll-spy nav, reveal animations, project expander |

## Local preview

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Editing

Content lives entirely in `index.html` — edit the text directly. Colours and
typography are CSS custom properties at the top of `styles.css`.

## Deploy

Pushing to `main` publishes automatically via GitHub Pages (Settings → Pages →
Deploy from branch → `main` / `root`).

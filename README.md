# Riduan Aziz Portfolio

Professional GitHub Pages portfolio for Riduan Aziz, a Computer Science & Engineering professional focused on software engineering, AI/ML, data science, backend development, and intelligent applications.

## Stack

- Semantic HTML5
- Modern CSS with responsive Grid and Flexbox
- Vanilla JavaScript for navigation, scroll reveals, and accessibility behavior
- Font Awesome and Devicon for interface icons
- No build step, server, API key, or runtime dependency required

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

For a production preview:

```bash
npm run build
npm run preview
```

## Deploy on GitHub Pages

This repository uses the Vite build workflow at `.github/workflows/deploy.yml`. Pushes to `main` install dependencies, build `dist`, and deploy the result through GitHub Pages. In GitHub, set Pages to **GitHub Actions** under **Settings > Pages**.

The live site is intended for:

```text
https://RiduanAziz.github.io/
```

## Content notes

The portfolio distinguishes completed software projects, research-oriented work, concepts, and currently learning technologies. Project links point to GitHub, and no unverified metrics, employment claims, publications, or model performance scores are presented.

To add a real headshot, replace the portrait placeholder in `src/App.jsx` with an optimized image and descriptive `alt` text.

## Resume

The Resume button points to `public/assets/CV of Riduan Aziz.pdf`. Replace that file with the final CV when needed, or update the link in `src/App.jsx`.

## Updating content

Portfolio content is organized in `src/data/portfolioData.js`. Update the structured objects for professional information, experience, skills, projects, concepts, education, and certifications. The reusable page structure lives in `src/App.jsx`.

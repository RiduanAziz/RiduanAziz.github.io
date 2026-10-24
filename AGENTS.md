# Portfolio Repository Instructions

## Source of truth

All public portfolio records belong in [`src/data/portfolioData.js`](./src/data/portfolioData.js). Keep layout and rendering logic in `src/App.jsx` or the reusable components; do not duplicate profile facts in JSX.

## Data conventions

- Every education, project, concept, certification, award, leadership, and volunteering record requires a stable, unique kebab-case `id`.
- Education records require `degree`, `institution`, `details`, `status`, and `period`. Use `cgpa` only for an actual GPA/CGPA, and use `credits` for credit totals.
- Certifications require `title`, `issuer`, `type`, and `status`. Use `year` for a year/date label and `duration` for durations such as `8 months`; never put a duration in `year`.
- Projects require `title`, `category`, `description`, `tech`, and `status`. Use `github: null` when an exact repository cannot be verified.
- Awards require `title`, `organization`, `date`, and `description`. Leadership records require `role`, `organization`, `institution`, `period`, and `area`. Volunteering records require `role`, `organization`, `period`, `area`, and `description`.
- Optional values may be `null` or omitted. Components must omit optional UI rather than rendering blank badges or implementation values such as `undefined`.

## URLs and assets

- Add only factual information supplied by the profile owner. Never invent award details, responsibilities, verification URLs, repository URLs, or certificates.
- External links must use valid `http://` or `https://` URLs. Credential URLs must be issuer-provided and verified.
- Local document and image paths must be root-relative paths under `public/`, and the referenced file must exist. Use `import.meta.env.BASE_URL` through the existing asset helper in UI code.
- Keep resume preview, download, and new-tab actions pointed at the same real PDF.

## Validation and delivery

Run `npm ci`, `npm run validate:data`, `npm run build`, `npm ls --depth=0`, and `git diff --check` before delivery. The deployment workflow runs data validation before the production build.

Preserve existing valid records and the current responsive/theme architecture. Fix the data or rendering root cause instead of suppressing compiler, runtime, accessibility, or security warnings. Do not add placeholder documents or unverified links.

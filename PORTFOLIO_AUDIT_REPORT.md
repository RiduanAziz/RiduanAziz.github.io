# Portfolio Audit Report

Date: 2026-10-20

## Findings and severity

| Severity | Finding | Status |
| --- | --- | --- |
| High | `package.json` used `latest` dependency ranges while the lockfile resolved React 19/Vite 8; this made future installs non-reproducible and the README claimed older versions. | Fixed by pinning the tested versions and documenting the Node requirement. |
| Medium | Several project cards linked to the generic GitHub profile, and the supplied SpendWise URL currently returned 404 from the GitHub API. | Fixed by showing a pending-verification label when no exact public repository was confirmed. |
| Medium | The contact form opened a `mailto:` URL but described the message as forwarded directly. | Fixed by explaining that the default mail client opens and that the site does not send the message. |
| Medium | Resume and document viewers did not consistently expose dialog semantics or keep keyboard focus within the modal. | Fixed with dialog labels, focus trapping, Escape handling, focus restoration, and scroll locking. |
| Low | Form fields had required/type validation but no length limits. | Fixed with conservative client-side maximum lengths. |
| Low | `npm audit` reports transitive vulnerabilities in Tailwind 3's dependency tree and `source-map-js`; the automated breaking fix would upgrade Tailwind to 4. | Not upgraded because it would be an unrelated major framework migration. Reassess when a compatible non-breaking fix is available. |

## Files changed and reasons

- `package.json`: pinned resolved dependency versions and added Node `>=20.19.0` engine metadata.
- `package-lock.json`: synchronized with the exact manifest versions.
- `.github/workflows/deploy.yml`: aligned Actions Node setup with the Vite 8 minimum supported Node version.
- `README.md`: aligned badges, stack, Node prerequisite, CGPA wording, and contact-form behavior with the implementation.
- `src/data/portfolioData.js`: removed unverified generic project destinations while preserving the records; unavailable repository links now remain explicitly absent.
- `src/App.jsx`: rendered pending repository states, improved contact-form disclosure and input limits, and added accessible resume modal behavior.
- `src/components/DocumentViewer.jsx`: added keyboard focus trapping and complete modal focus lifecycle.
- `PORTFOLIO_AUDIT_REPORT.md`: recorded this audit, evidence, fixes, and remaining issues.

## Confirmed fixes

- Existing design, React/Vite architecture, data records, academic documents, credential records, project history, routes, and GitHub Pages base path were preserved.
- `vite.config.js` retains `base: '/'`, which is correct for `https://riduanaziz.github.io/`.
- Transcript and degree-certificate actions remain unavailable because their `file` values are still `null`.
- Exact public repository checks returned:
  - ASL recognition: HTTP 200.
  - DataSetSanity: HTTP 200.
  - Adury Voice Assistant: HTTP 200.
  - SpendWise supplied destination: HTTP 404, so it is not rendered as a repository link.
  - Aziz Mansion and Bengali ASR retain no exact public repository destination.
- Existing credential IDs, certificate files, verification-pending labels, and academic conflict notes were preserved.

## Items requiring user verification

- Authoritative CBIU CGPA, total credits, completed credits, and expected graduation date.
- AWS Academy issue year/date discrepancy.
- Exact official credential URLs, if available.
- University Merit Scholarship wording, frequency, award years, and selection details.
- District and Upazila Rover Scout award confirmations.
- Current responsibilities for the District Senior Rover Mate Representative role.
- Exact public repositories for SpendWise, Aziz Mansion, and Regional Bengali ASR, if they exist under different names or visibility.
- Whether the remote GitHub profile image should be replaced with a repository-hosted public asset.

## Commands executed and actual results

- `git branch backup/portfolio-audit-20261020`: succeeded; clean starting-state checkpoint created.
- `npm ci`: succeeded; installed 101 packages. npm reported 8 audit vulnerabilities.
- `npm ls --depth=0`: succeeded; resolved React 19.3.0, React DOM 19.3.0, Vite 8.2.2, plugin-react 6.1.1, and the pinned supporting packages.
- `npm audit --omit=dev`: failed with 1 high-severity transitive `source-map-js` advisory; `npm audit --audit-level=moderate` reported 8 total vulnerabilities.
- `npm install --package-lock-only --ignore-scripts`: succeeded after manifest pinning.
- `npm run build`: succeeded; Vite transformed 2,267 modules and emitted `dist` assets.
- `npm run dev -- --host 127.0.0.1`: started successfully at `http://127.0.0.1:5173/` under Node 24.20.0.
- `npm run preview -- --host 127.0.0.1`: started successfully at `http://127.0.0.1:4173/` under Node 24.20.0.
- `curl` checks against the preview returned HTTP 200 for the HTML, resume PDF, CV pages, academic certificate images, and training certificate PDF.
- `git diff --check`: passed.
- No lint or automated test script exists in `package.json`.

## Remaining issues

- Full visual/browser interaction testing at 320px, 375px, 768px, and desktop widths still requires a browser session. Static implementation checks and production preview asset checks passed, but no browser-console capture was available in this environment.
- `npm audit` remains non-zero because the safe fix path is not available without a Tailwind major-version migration.
- Public project and credential destinations remain intentionally pending where exact verification was unavailable.

## Deployment verification steps

1. Use Node 20.19+ and run `npm ci`.
2. Run `npm run build` and confirm `dist/index.html` plus referenced `/assets/` files exist.
3. Confirm GitHub Pages is configured with GitHub Actions as the source.
4. Push the authorized commit to `main`; `.github/workflows/deploy.yml` runs `npm ci`, builds `dist`, uploads the Pages artifact, and deploys it.
5. Confirm the workflow completes and check `https://riduanaziz.github.io/` plus the `.well-known/discord` verification path.

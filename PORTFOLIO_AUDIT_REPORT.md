# Portfolio Audit Report

**Audit date:** 2026-10-20  
**Branch:** `portfolio-audit-fixes`  
**Scope:** Source-data accuracy, repository links, dependency metadata, contact form, resume preview, GitHub Pages workflow, and README consistency.

## Changes made

- Pinned direct npm dependencies to the versions already resolved in the current lockfile instead of using `latest` or semver ranges. The pinned stack includes React 19.3.0, React DOM 19.3.0, Vite 8.2.2, and @vitejs/plugin-react 6.1.1.
- Updated the lockfile's root dependency declarations to match `package.json`.
- Updated the GitHub Pages workflow to use Node.js 22, which satisfies the current Vite 8 / plugin-react 6 engine range.
- Updated README badges, framework descriptions, local Node requirements, and setup steps to match the current stack. The documented install command now uses `npm ci`.
- Updated the education record to the latest reported CGPA (3.795/4.000) and credit total (152/162), and removed older contradictory academic snapshots from the public education card. **Confirm the credit total and expected graduation date against the latest university record before treating them as final.**
- Reworded the Great Learning Excel entries as training instead of implying they are official Microsoft Office Specialist exam certifications.
- Removed non-specific GitHub profile URLs from project repository actions. The Aziz Mansion repository was found to be private, so a public visitor should not be sent to a generic profile or a private-repository dead end. No exact public repository for the Regional Bengali ASR project was verified.
- Updated the contact-form copy to explain that it opens the visitor's default email application with prefilled content. The static website itself does not send or store the message.
- Corrected the browser PDF preview to use the same CV file as the download/new-tab controls.

## Remaining owner verification

1. **Education:** Verify `152 / 162` credits and the December 2026 expected graduation date against the latest official record. This audit uses the most recent reported figures available, but did not inspect a current transcript.
2. **AWS Academy credential:** The data contains both a 2025 year and a reported January 2026 issue date. Confirm the certificate date and update the record to one verified value.
3. **Credential evidence:** Add issuer verification URLs or genuine certificate files only where available. Do not fabricate credential URLs, IDs, or certificate previews.
4. **Project access:** Add a project-specific public URL for the Regional Bengali ASR work if one exists. Keep private source repositories unlinked on the public site.
5. **Public contact links:** Open LinkedIn, WhatsApp, X, and Discord links once in a browser to confirm they still lead to the intended profiles.

## Validation status

- [x] Repository source and deployment configuration reviewed.
- [x] Dependency declarations pinned and lockfile root metadata aligned.
- [x] README framework and Node.js guidance updated.
- [x] Obvious misleading contact-form wording corrected.
- [x] Resume preview filename aligned with the actual download path.
- [ ] `npm ci` and `npm run build` executed in a real checkout.
- [ ] Browser smoke test of desktop and mobile layouts.
- [ ] Keyboard/focus and reduced-motion checks.
- [ ] Verification of all linked public assets and academic/certificate documents.
- [ ] Post-merge GitHub Pages deployment check.

**Build limitation:** The audit environment could not resolve `github.com` from its shell, so it was not possible to clone the branch and run `npm ci` or `npm run build` locally. A successful historical GitHub Actions deployment is not proof that this exact patch builds. The changes should remain under review until the branch has a successful CI build and the live page has been smoke-tested.

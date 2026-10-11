# Portfolio Data Audit

Date: 2026-10-11

## Project and source-of-truth audit

- Framework: React with Vite, JavaScript, Tailwind CSS, Framer Motion, and Lucide/React Icons.
- Application entry: `src/main.jsx`; primary page and section rendering: `src/App.jsx`.
- Profile data source of truth: `src/data/portfolioData.js`.
- Reusable data-driven UI: `src/components/EducationCard.jsx` and `src/components/CredentialCard.jsx`.
- Deployment-related paths: Vite `BASE_URL` is used for resume, academic, and certificate assets. No route configuration is present; the site is a single-page application.
- Existing worktree state: clean on `main` before this audit.
- Existing local assets: two academic certificate images, one graphic-design training PDF, and resume/CV assets. No additional certificate files were found.

## Existing record inventory

| Area | Existing records | Current location |
| --- | ---: | --- |
| Professional identity/contact | 1 | `professionalInfo` |
| Impact highlights | 4 | `impactHighlights` |
| Focus areas | 4 | `focusAreas` |
| Experience | 3 | `experience` |
| Skill groups | 3 groups | `skills` |
| Featured projects | 6 | `projects` |
| Research concepts | 5 | `concepts` |
| Education | 3 | `education` |
| Certifications/training | 7 before integration | `certifications` |
| Honors/awards | 0 | No data structure or rendered section |
| Volunteering/leadership | 0 | No data structure or rendered section |
| Languages | 0 | No data structure or rendered section |

## Comparison with supplied candidate data

### Already present and preserved

- Name, GitHub, LinkedIn, email, and the existing concise AI/data/software identity.
- All three listed employment records and their core responsibilities.
- HSC and SSC records, institutions, dates, grades, and certificate assets.
- CBIU degree record, current in-progress status, current CGPA/credit snapshot, expected graduation, and ICPC activity.
- All six existing project records, five research concepts, and their existing descriptions/statuses.
- Eight certification/training records after integration, including the seven preserved records and the distinct ICPC credential/activity record; the existing graphic-design certificate file remains associated only with its original training record.
- Existing skills across programming, data, AI/ML, application development, and emerging technologies.

### Partial matches requiring additive enrichment or verification flags

- The professional headline is shorter than the supplied candidate headline; preserve the existing headline and consider adding the non-conflicting CSE-undergraduate context only if useful.
- The CBIU education record has a reported `3.795 / 4.000` and `152 / 160` snapshot, while the supplied data also reports `3.782 / 4.00`, `152 / 162`, and different completion details. These must remain explicitly marked as reported snapshots requiring verification; no value should be silently replaced.
- AWS Academy currently says 2025; supplied data reports January 2026 and the earlier 2025 value. Preserve the current value and flag the date discrepancy.
- Disaster Management currently says 2025; supplied data reports May 2025. Preserve the existing year and add the month only if clearly labeled as reported.
- Existing project cards for Aziz Mansion, ASL recognition, and Bengali ASR use the GitHub profile URL as a fallback. The supplied data provides a confirmed ASL repository and a confirmed Bengali ASR project description but no confirmed Aziz Mansion repository. Replace only unconfirmed fallback URLs with confirmed URLs where the match is exact; do not invent a repository link.
- Existing Bengali ASR description says “100+ hours” and “12 subregions”; supplied research context gives more detailed reported dataset figures. These should be labeled reported/unverified rather than presented as verified results.

### Missing candidate data that can be added

- Credential IDs for CS50x (`ee71a8a7-c8f3-423e-8d15-e0ebf1499ed9`), ICPC (`1058195`), Excel Intermediate (`KQEXITWV`), and Professional Outsourcing Training (`322884`), after matching each ID to its exact existing record.
- ICPC is now represented as one certification record while its existing education activity remains the single activity reference; this is intentional because the supplied profile treats it as both.
- Issuers/date detail for the existing records where the supplied information is compatible and non-conflicting.
- Honors/awards data structure and the three supplied recognitions, with wording that clearly marks reported details pending verification.
- Volunteer/leadership data structure and the District Senior Rover Mate Representative entry, marked as reported/pending verification.
- Additional skills that are genuinely absent, placed in existing proficiency groups without upgrading proficiency claims.

### Not added

- No CBIU Career Club role, dates, or responsibilities because the supplied details are not confirmed.
- No language claims because none are explicitly confirmed.
- No repository URL for Aziz Mansion.
- No credential URLs because none were supplied and none can be safely inferred.
- No completion claim for the Inception BD bootcamp.
- No research concepts as completed projects; existing concept labels remain distinct.

## Planned additive changes

1. Enrich exact existing project matches with confirmed repository URLs and carefully labeled research context.
2. Add only confirmed credential IDs to matching existing certification records; retain all existing IDs, files, URLs, and descriptions.
3. Add missing award and volunteering records as separate, clearly labeled reported entries.
4. Add absent skills to the existing `primary`, `workingKnowledge`, or `exploring` taxonomy without changing existing proficiency placement.
5. Add display support for awards, volunteering, verification/pending labels, and credential IDs only where required by the new records.
6. Validate record counts, URLs, asset paths, production build, and preserved existing content after the changes.

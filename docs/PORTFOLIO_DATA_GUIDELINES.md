# Portfolio data guidelines

Update [`src/data/portfolioData.js`](../src/data/portfolioData.js), then run:

```bash
npm run validate:data
npm run build
```

Use a stable kebab-case `id` for every record. Keep records in their existing collection:

| Collection | Required content |
| --- | --- |
| `education` | `id`, `degree`, `institution`, `details`, `status`, `period` |
| `certifications` | `id`, `title`, `issuer`, `type`, `status`; use `year` for dates and `duration` for durations |
| `projects` | `id`, `title`, `category`, `description`, `tech`, `status`; use `github: null` unless an exact repository is verified |
| `awards` | `id`, `title`, `organization`, `date`, `description` |
| `leadership` | `id`, `role`, `organization`, `institution`, `period`, `area` |
| `volunteering` | `id`, `role`, `organization`, `period`, `area`, `description` |

Optional credential URLs, document files, and repository URLs may be absent or `null`. Never invent a URL or use a generic profile URL for a specific project. Local assets must be added under `public/` before they are referenced. Preserve valid existing facts, and label owner-reported information accurately rather than implying independent verification.

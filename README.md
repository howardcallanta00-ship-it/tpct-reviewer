# TOPCIT Sprint

A web reviewer for the TOPCIT exam, built from six reviewer documents (Software, Data, System Architecture, Information Security, IT Business and Ethics, Technology Communication and Project Management).

## What's inside

- **243 questions** with the original figures, the reviewer's answer key, a plain-language explanation, a note for every option and a memory hook.
- **Answer key checks.** You are always scored on the reviewer's red-marked answer. Where that answer looks wrong or doubtful, a "Your answer key may be wrong here" panel explains why and marks the option that is more likely correct. Questions with no answer in the reviewer are labeled "No key in reviewer".
- **33 concept lessons**, sorted by how often each topic appears in the questions, each with a "Check yourself" quiz from the reviewer.
- **Practice** with a smart mix (mistakes and due reviews first), spaced repetition through "How sure were you?", combo counter and keyboard shortcuts (1–4, B, Enter).
- **Mock exam** that is timed, mixes all domains evenly and gives a per-domain breakdown with full review.
- **Dashboard** showing readiness milestones, the six-domain chart, week streak, tonight's plan and an "Up next" question.
- Progress is stored in the browser (export/import in Settings). No account, no backend.

## Run locally

```bash
npm install
npm run dev
```

## Project layout

| Path | Contents |
| --- | --- |
| `src/data/raw/*.json` | Questions extracted from the .docx reviewers |
| `public/img/<domain>/` | Figures from the reviewers (WebP) |
| `src/content/notes/*.ts` | Explanations, option notes and key checks per question |
| `src/content/lessons/*.ts` | Concept lessons |
| `scripts/extract.mjs` | Re-extracts questions and images from the .docx files |

To re-extract after editing the Word files:

```bash
npm run extract -- "C:/path/to/folder/with/the/reviewers"
```

## Deploy on Render (free static site)

The repo includes `render.yaml`, so Render can set everything up automatically.

1. Sign in at https://dashboard.render.com with your GitHub account.
2. Click **New** → **Blueprint**, pick this repository, and click **Apply**. Render reads `render.yaml` and creates a static site called `tpct-reviewer`.
3. Wait for the first deploy (about 1–2 minutes). Your site will be at `https://tpct-reviewer.onrender.com` (or a similar name if that one is taken).

Manual alternative: **New** → **Static Site** → pick the repo, then set:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Under **Redirects/Rewrites**, add a rule: source `/*`, destination `/index.html`, action **Rewrite** (so links like `/learn/db-sql` work on refresh).

Every push to `main` redeploys automatically.

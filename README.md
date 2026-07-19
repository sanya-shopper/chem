# UNR Chemistry — A Prospective-Student Guide (with a Cancer-Research Ranking)

### 🔗 Live site: **https://sanya-shopper.github.io/chem/**

A pitch to future chemists — especially anyone dreaming of **academic drug discovery** —
showing where a UNR Chemistry education can lead, plus a small, dependency-free static website that ranks the research-active faculty of
the University of Nevada, Reno **Department of Chemistry** and **Department of
Biochemistry, Molecular Biology & Biotechnology (BMB)** by how directly their work
bears on **cancer research** — and notes, where a public source documents it, where
their students went and which trainees now run their own labs.

It has since grown into a small **prospective-student site** for the department, with a
mobile-first landing page, an undergraduate-experience guide, and per-lab academic
**lineages** alongside the original ranking. It is designed to be served as-is by
**GitHub Pages** — no build step, no framework: HTML pages read small JavaScript data
files and render themselves.

- **Landing** — `index.html` (mobile-first hero, routes to everything below)
- **Undergraduate experience** — `undergrad.html` (static; degrees, paid research, instruments, scholarships)
- **Research labs & lineages** — `lineages.html` (rendered from `assets/lineage.js`)
- **Cancer-research ranking** — `ranking.html` (rendered from `assets/data.js`)
- **Methodology & rubric** — `methodology.html`
- **Sources & cross-linked bibliography** — `sources.html`

> This is an independent, unofficial compilation, not affiliated with or endorsed by
> UNR. Every entry links to the primary source it came from; verify before relying on
> any claim. Data was assembled from public pages accessed **19 July 2026**.

---

## Project layout

```
.
├── index.html          # mobile-first landing / hero (static)
├── undergrad.html      # undergraduate experience guide (static, sourced inline)
├── lineages.html       # per-lab academic genealogy (rendered from lineage.js)
├── ranking.html        # cancer-proximity ranking (rendered from data.js)
├── methodology.html    # the 0–10 rubric, the four tiers, and the evidence bar
├── sources.html        # numbered bibliography with two-way cross-links
├── assets/
│   ├── data.js         # SINGLE SOURCE OF TRUTH for the ranking: SOURCES + FACULTY
│   ├── app.js          # render functions for the ranking + bibliography
│   ├── lineage.js      # SINGLE SOURCE OF TRUTH for the lineages: PROGRAM, LABS, MEDIA
│   ├── lineage-app.js  # render functions for the lineage page (photos w/ avatar fallback)
│   ├── styles.css      # presentation; light/dark; tiers; hero + mobile-first landing
│   └── favicon.svg
├── localrefs/          # local archive copies of open-access cited PDFs
│   ├── fetch.sh        # downloads those PDFs on your machine
│   └── README.md
├── test/
│   ├── validate.js          # ranking data-integrity checks
│   └── validate-lineage.js  # lineage data-integrity checks
└── .nojekyll           # tell Pages to serve files verbatim
```

Run both checks before committing: `node test/validate.js && node test/validate-lineage.js`.

## Data model

Everything the site shows is derived from two structures in
[`assets/data.js`](assets/data.js):

- **`SOURCES`** — every citable reference, keyed by a short id, each with
  `title`, `publisher`, `url`, and `accessed`. Optional `archive` points at a local
  PDF copy (see `localrefs/`); optional `structural: true` marks site-wide directory
  links that are referenced from the page chrome rather than a specific card.
- **`FACULTY`** — one record per person: identity, a one-line research summary, the
  `tier` and `score`, the `rationale`, an `evidence` list of source ids, and
  `students` (either a plain note, or an array of records each with its own
  `sources`).

The pages and code cite each other on purpose:
`app.js` renders each faculty card’s citations as links into `sources.html`, and each
bibliography entry links **back** to every faculty member who cites it — so a reader
can move between a claim and its evidence in either direction. The scoring rubric
lives in `methodology.html` and is mirrored as `RUBRIC` in `data.js`.

## Editing the data

1. Edit `assets/data.js` only — never hand-edit generated markup.
2. Run the checks: `node test/validate.js`. It fails on a dangling source id, an
   out-of-range score, a duplicate slug, a named student with no source, and similar
   integrity problems. Treat a red run as a broken build.
3. Commit. The documents are versioned like source (see *Source control* below).

## Local archive copies of references

A few cited articles are open access. To keep a durable local copy (and light up the
“Local archived copy (PDF)” buttons on the Sources page):

```bash
bash localrefs/fetch.sh
```

## Run locally

No server is required — open `index.html` in a browser. To mimic Pages exactly:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy to GitHub Pages

You’ll do the final push (the site can’t reach your GitHub account for you). From this
folder:

```bash
# 1. Put it under version control (documents are treated as source; see below)
git init
git add -A
git commit -m "UNR cancer-proximity faculty site"

# 2. Create an empty repo on github.com (no README), then point this at it:
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then, in the GitHub web UI: **Settings → Pages → Build and deployment →
Source: “Deploy from a branch” → Branch: `main` / `/ (root)` → Save.**
Your site appears at `https://<your-username>.github.io/<repo-name>/` within a minute
or two. The `.nojekyll` file is already included so Pages serves everything verbatim.

To use a project subpath is fine — all links in the site are **relative**, so it works
at either a user-site root or a project subpath without changes.

## Source control conventions

Per the project’s standing practice, the documents here are versioned **as source**:

- Commit `index.html`, `methodology.html`, `sources.html`, and `assets/*` — they are
  the human-authored source and the rendered product in one.
- When the data changes, run `node test/validate.js`, then commit the data change and
  the pages together so the repository is always internally consistent.
- Archived PDFs in `localrefs/` are regenerable products of `fetch.sh`; they are
  ignored by git (see `.gitignore`) so the history stays text-only.

## License / use

Faculty facts are drawn from public university and laboratory pages, each linked on the
Sources page. The compilation and code are provided for informational use; correct any
entry against its linked primary source.

# localrefs/

Local archived copies of the **open-access** works cited on the Sources page.

The site records, for a few freely-available articles, an `archive:` path in
[`../assets/data.js`](../assets/data.js). Those paths point here. When the files
exist, the **“Local archived copy (PDF)”** buttons on `sources.html` resolve to a
copy that survives even if the original moves.

## Populating this folder

PubMed Central serves its PDFs behind a browser check, so the copies are fetched
on your own machine rather than committed to the repo:

```bash
bash localrefs/fetch.sh
```

This downloads each PDF, records the fetch time in `FETCH_LOG.txt`, and is safe to
re-run (it skips files that already exist).

## Adding another archived reference

1. In `assets/data.js`, add `archive: "localrefs/<filename>.pdf"` to the source.
2. Add a matching `fetch` line to `fetch.sh`.
3. Run the script.

Only add works that are genuinely free to redistribute (open-access / author
copies). For paywalled sources, keep the citation link only — do not archive.

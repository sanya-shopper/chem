#!/usr/bin/env bash
#
# fetch.sh — download local archive copies of the open-access articles cited on
# the Sources page, into this folder (localrefs/).
#
# Why this is a script you run locally rather than something committed:
#   PubMed Central serves its PDFs behind a browser check that the site's build
#   environment cannot clear, so the copies are fetched on your machine. Once you
#   run this, the "Local archived copy (PDF)" links on sources.html resolve.
#
# Usage:
#   bash localrefs/fetch.sh
#
# The filenames below MUST match the `archive:` paths in ../assets/data.js.

set -euo pipefail
cd "$(dirname "$0")"

fetch() {
  local url="$1" out="$2"
  if [ -f "$out" ]; then
    echo "skip (exists): $out"
    return
  fi
  echo "fetching: $out"
  # -L follows redirects; PMC OA PDFs are freely licensed for download.
  curl -fL --retry 3 -A "Mozilla/5.0 (local archive fetch)" "$url" -o "$out"
  echo "  fetched $(date -u +%Y-%m-%dT%H:%MZ) — $out" >> FETCH_LOG.txt
}

# PMC3377772 — 4-hydroxynonenal / sulforaphane chemoprevention (Stan).
fetch "https://pmc.ncbi.nlm.nih.gov/articles/PMC3377772/pdf/" \
      "stan-sulforaphane-PMC3377772.pdf"

# PMC10312355 — peptide-based quorum sensing review (Tal-Gan).
fetch "https://pmc.ncbi.nlm.nih.gov/articles/PMC10312355/pdf/" \
      "talgan-quorum-sensing-review-PMC10312355.pdf"

echo "Done. Archived copies live in localrefs/ and are now linked from sources.html."

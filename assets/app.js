/*
 * app.js — renders the ranking (index.html) and the cross-linked bibliography
 * (sources.html) from the single data model in data.js.
 *
 * The two pages share one dataset and one set of helpers so a change to the data
 * propagates everywhere (see README > "Data model"). Nothing here mutates
 * SOURCES/FACULTY; every function is a pure transform of the data into DOM.
 *
 * Cross-reference contract (honoured in both directions):
 *   - A faculty card has id  fac-<slug>  and cites sources as links to
 *     sources.html#src-<id>.
 *   - A bibliography entry has id  src-<id>  and links back to every citing
 *     faculty at index.html#fac-<slug>.
 */

(function () {
  "use strict";

  // ---- small helpers -------------------------------------------------------

  /** Escape text for safe insertion into HTML. */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  const TIER_ORDER = TIERS.reduce(function (acc, t, i) { acc[t.key] = i; return acc; }, {});

  /** Ranking order: closer tiers first, then higher score, then name. */
  function byRank(a, b) {
    if (TIER_ORDER[a.tier] !== TIER_ORDER[b.tier]) return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  }

  /** All faculty in ranked order, annotated with a 1-based global rank. */
  function rankedFaculty() {
    return FACULTY.slice().sort(byRank).map(function (f, i) {
      return Object.assign({ rank: i + 1 }, f);
    });
  }

  /** Render a superscript citation list linking into the bibliography. */
  function citeLinks(ids) {
    return ids.map(function (id) {
      const idx = sourceIndex()[id];
      return '<a href="sources.html#src-' + esc(id) + '" title="' +
        esc(SOURCES[id] ? SOURCES[id].title : id) + '">' + idx + "</a>";
    }).join("");
  }

  /** Stable 1-based numbering of sources, in the order they appear in SOURCES. */
  let _sourceIndex = null;
  function sourceIndex() {
    if (!_sourceIndex) {
      _sourceIndex = {};
      Object.keys(SOURCES).forEach(function (id, i) { _sourceIndex[id] = i + 1; });
    }
    return _sourceIndex;
  }

  // ---- index.html : the ranking -------------------------------------------

  function studentsBlock(f) {
    if (typeof f.students === "string") {
      return '<div class="students"><h4>Students &amp; researchers</h4>' +
        '<p class="none">' + esc(f.students) + "</p></div>";
    }
    const items = f.students.map(function (s) {
      const own = s.ownLab ? '<span class="own-lab">runs own lab</span>' : "";
      const cites = "<sup>" + citeLinks(s.sources) + "</sup>";
      return '<li><span class="who">' + esc(s.name) + "</span> " +
        '<span class="badge dept">' + esc(s.degree) + "</span>" +
        '<span class="arrow">→</span>' + esc(s.outcome) + own + " " + cites + "</li>";
    }).join("");
    return '<div class="students"><h4>Students &amp; researchers (verified destinations)</h4><ul>' +
      items + "</ul></div>";
  }

  function facultyCard(f) {
    const deptLabel = f.dept === "BMB" ? "Biochemistry (BMB)" : "Chemistry";
    return '' +
      '<article class="card" id="fac-' + esc(f.slug) + '" data-tier="' + esc(f.tier) +
      '" data-dept="' + esc(f.dept) + '" data-name="' + esc(f.name.toLowerCase()) + '">' +
        '<div class="card-top">' +
          "<div>" +
            "<h3><span class=\"rank\">#" + f.rank + "</span>" +
              '<a href="' + esc(f.homepage) + '" target="_blank" rel="noopener">' + esc(f.name) + "</a></h3>" +
            '<p class="title">' + esc(f.title) + "</p>" +
          "</div>" +
          '<div class="badges">' +
            '<span class="badge dept">' + esc(deptLabel) + "</span>" +
            '<span class="badge tier-' + esc(f.tier) + '">' + esc(f.tier) + "</span>" +
            '<span class="score">' + f.score.toFixed(1) + "<small>/10</small></span>" +
          "</div>" +
        "</div>" +
        '<p class="research">' + esc(f.research) + "</p>" +
        '<p class="rationale"><b>Why this rank:</b> ' + esc(f.rationale) + "</p>" +
        '<p class="cites">Evidence: ' + citeLinks(f.evidence) + "</p>" +
        studentsBlock(f) +
      "</article>";
  }

  function renderRanking(list) {
    const host = document.getElementById("ranking");
    if (!host) return;
    let html = "";
    TIERS.forEach(function (t) {
      const inTier = list.filter(function (f) { return f.tier === t.key; });
      if (!inTier.length) return;
      html += '<section class="tier" data-tier="' + esc(t.key) + '">' +
        '<div class="tier-head"><span class="tier-dot"></span>' +
        "<h2>" + esc(t.label) + "</h2></div>" +
        '<p class="tier-blurb">' + esc(t.blurb) + "</p>" +
        inTier.map(facultyCard).join("") +
        "</section>";
    });
    host.innerHTML = html || '<p class="result-count">No faculty match your filters.</p>';
  }

  function wireControls(all) {
    const search = document.getElementById("search");
    const dept = document.getElementById("dept-filter");
    const tier = document.getElementById("tier-filter");
    const count = document.getElementById("result-count");
    if (!search) return;

    function apply() {
      const q = search.value.trim().toLowerCase();
      const d = dept.value;
      const t = tier.value;
      const filtered = all.filter(function (f) {
        if (d && f.dept !== d) return false;
        if (t && f.tier !== t) return false;
        if (q && !(f.name.toLowerCase().indexOf(q) >= 0 ||
                   f.research.toLowerCase().indexOf(q) >= 0 ||
                   f.title.toLowerCase().indexOf(q) >= 0)) return false;
        return true;
      });
      renderRanking(filtered);
      count.textContent = filtered.length + " of " + all.length + " faculty shown";
    }
    [search, dept, tier].forEach(function (el) {
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });
    apply();
  }

  // ---- sources.html : the bibliography ------------------------------------

  /** For each source id, the faculty (slug+name) that cite it anywhere. */
  function citationBacklinks() {
    const map = {};
    Object.keys(SOURCES).forEach(function (id) { map[id] = []; });
    FACULTY.forEach(function (f) {
      const ids = new Set(f.evidence);
      if (Array.isArray(f.students)) {
        f.students.forEach(function (s) { s.sources.forEach(function (id) { ids.add(id); }); });
      }
      ids.forEach(function (id) {
        if (map[id]) map[id].push({ slug: f.slug, name: f.name });
      });
    });
    return map;
  }

  function renderBibliography() {
    const host = document.getElementById("bibliography");
    if (!host) return;
    const idx = sourceIndex();
    const back = citationBacklinks();
    host.innerHTML = Object.keys(SOURCES).map(function (id) {
      const s = SOURCES[id];
      const refs = back[id];
      const backHtml = refs.length
        ? '<div class="backlinks"><span class="lbl">Cited by:</span> ' +
            refs.map(function (r) {
              return '<a href="ranking.html#fac-' + esc(r.slug) + '">' + esc(r.name) + "</a>";
            }).join(", ") + "</div>"
        : '<div class="backlinks"><span class="lbl">' +
            (s.structural ? "Site directory reference (linked from every page)." : "Not currently cited.") +
            "</span></div>";
      const local = s.archive
        ? '<div><a class="local-link" href="' + esc(s.archive) + '" target="_blank" rel="noopener">Local archived copy (PDF)</a>' +
            ' <span class="lbl" style="font-size:.8rem;color:var(--text-muted)">— open access; populate via <code>localrefs/fetch.sh</code></span></div>'
        : "";
      return '<div class="bib-entry" id="src-' + esc(id) + '">' +
        '<div><span class="num">[' + idx[id] + "]</span> " +
          '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + "</a></div>" +
        '<div class="meta">' + esc(s.publisher) + " · accessed " + esc(s.accessed) + "</div>" +
        local + backHtml +
        "</div>";
    }).join("");
  }

  // ---- boot ----------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("ranking")) {
      const all = rankedFaculty();
      wireControls(all);           // wireControls performs the first render
      if (!document.getElementById("search")) renderRanking(all);
    }
    renderBibliography();
  });
})();

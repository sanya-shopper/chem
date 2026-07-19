/*
 * lineage-app.js — renders lineages.html from lineage.js.
 *
 * Renders three things: a program-links intro, one section per lab (faculty
 * header + collapsible interests/pubs + a genealogy "path" list + current
 * cohort), and a media/testimonials list. Photos degrade gracefully: a missing
 * or broken image is replaced in-place by a generated initials avatar, so the
 * page never shows a broken-image icon or a wrong face.
 */

(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /** Deterministic pastel-ish color from a string (stable per name). */
  function colorFor(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    return "hsl(" + h + ", 45%, 42%)";
  }

  function initials(name) {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    const first = parts[0] ? parts[0][0] : "?";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  /** An inline SVG data URI used as the avatar / image fallback. */
  function avatarDataUri(name) {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
      '<rect width="120" height="120" rx="60" fill="' + colorFor(name) + '"/>' +
      '<text x="50%" y="50%" dy=".35em" text-anchor="middle" ' +
      'font-family="Arial, sans-serif" font-size="48" fill="#fff">' + esc(initials(name)) + "</text></svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  /** <img> that falls back to an initials avatar on error or when no photo. */
  function avatar(name, photo, cls) {
    const fallback = avatarDataUri(name);
    const src = photo || fallback;
    return '<img class="' + cls + '" loading="lazy" referrerpolicy="no-referrer" alt="' +
      esc(name) + '" src="' + esc(src) + '" ' +
      'onerror="this.onerror=null;this.src=\'' + fallback.replace(/'/g, "%27") + "'\" />";
  }

  function linkRow(links) {
    if (!links || !links.length) return "";
    return '<div class="ln-links">' + links.map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>";
    }).join("") + "</div>";
  }

  /** One person's journey: From (before UNR) → At UNR (years) → Now, + links. */
  function pathRow(p) {
    const badgeText = "runs their own lab" + (p.ownLabWhere ? " · " + esc(p.ownLabWhere) : "");
    const badge = p.ownLab
      ? (p.ownLabUrl
          ? '<a class="own-lab" href="' + esc(p.ownLabUrl) + '" target="_blank" rel="noopener">' + badgeText + " ↗</a>"
          : '<span class="own-lab">' + badgeText + "</span>")
      : "";
    const before = p.beforeUNR
      ? '<span class="step"><b>From:</b> ' + esc(p.beforeUNR) + "</span>"
      : '<span class="step muted"><b>Before UNR:</b> not documented</span>';
    const here = '<span class="step here"><b>At UNR:</b> ' + esc(p.role) + (p.years ? ", " + esc(p.years) : "") + "</span>";
    const after = '<span class="step after"><b>Now:</b> ' + esc(p.after || "not documented") + "</span>";
    const story = p.story ? '<p class="path-story">' + esc(p.story) + "</p>" : "";
    return '<li class="path">' +
      avatar(p.name, p.photo, "pic") +
      '<div class="path-body">' +
        '<div class="path-name">' + esc(p.name) + badge + "</div>" +
        '<div class="steps">' + before + '<span class="sep">→</span>' + here + '<span class="sep">→</span>' + after + "</div>" +
        story +
        linkRow(p.links) +
      "</div>" +
    "</li>";
  }

  function currentCard(m) {
    return '<li class="member">' + avatar(m.name, m.photo, "pic") +
      '<div><div class="path-name">' + esc(m.name) + "</div>" +
      '<div class="member-detail">' + esc(m.role) + (m.detail ? " · " + esc(m.detail) : "") + "</div>" +
      linkRow(m.links) + "</div></li>";
  }

  function pubsBlock(pubs) {
    if (!pubs || !pubs.length) return "";
    return "<ul class=\"pubs\">" + pubs.map(function (p) { return "<li>" + esc(p.cite) + "</li>"; }).join("") + "</ul>";
  }

  function labSection(lab) {
    const f = lab.faculty;
    let html = '<section class="lab" id="lab-' + esc(lab.slug) + '">';
    // Faculty header
    html += '<div class="lab-head">' +
      avatar(f.name, f.photo, "pic pic-lg") +
      "<div><h2>" + esc(f.name) + "</h2>" +
      '<p class="lab-title">' + esc(f.title) + "</p>" +
      '<p class="lab-focus">' + esc(lab.focus) + "</p>" +
      linkRow(f.links) +
      "</div></div>";
    // Undergraduate-research highlight (only where verified)
    if (lab.undergrads) {
      html += '<div class="ug-flag"><span class="ug-badge">🎓 Undergraduates welcome</span> ' +
        esc(lab.undergrads) + "</div>";
    }
    // Collapsibles
    html += '<details class="fold"><summary>Research interests</summary><p>' + esc(f.interests) + "</p></details>";
    html += '<details class="fold"><summary>Selected publications</summary>' + pubsBlock(f.pubs) + "</details>";
    // Genealogy tree
    if (lab.tree && lab.tree.length) {
      html += '<h3 class="ln-h3">Student &amp; researcher journeys</h3>' +
        '<div class="legend">Each row is one person’s path: ' +
          '<span class="lg lg-from">From</span> where they studied before UNR → ' +
          '<span class="lg lg-at">At UNR</span> the years they spent here → ' +
          '<span class="lg lg-now">Now</span> where they are today.</div>' +
        '<ul class="paths">' + lab.tree.map(pathRow).join("") + "</ul>";
    }
    // Current cohort
    if (lab.current && lab.current.length) {
      html += '<h3 class="ln-h3">Current group</h3>' +
        '<ul class="members">' + lab.current.map(currentCard).join("") + "</ul>";
    }
    if (lab.note) html += '<p class="lab-note">' + esc(lab.note) + "</p>";
    html += "</section>";
    return html;
  }

  function renderProgram() {
    const host = document.getElementById("program");
    if (!host) return;
    host.innerHTML = "<p>" + esc(PROGRAM.note) + "</p>" +
      '<div class="ln-links prog">' + PROGRAM.links.map(function (l) {
        return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>";
      }).join("") + "</div>";
  }

  function renderLabs() {
    const host = document.getElementById("labs");
    if (!host) return;
    host.innerHTML = LABS.map(labSection).join("");
  }

  function renderMedia() {
    const host = document.getElementById("media");
    if (!host) return;
    host.innerHTML = "<ul class=\"media-list\">" + MEDIA.map(function (m) {
      return '<li><a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.title) + " ↗</a>" +
        ' <span class="tag">' + esc(m.lab) + "</span></li>";
    }).join("") + "</ul>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderProgram();
    renderLabs();
    renderMedia();
  });
})();

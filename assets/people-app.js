/*
 * people-app.js — renders the people/careers sections (people.js) into whatever
 * containers a page provides: #journeys, #destinations, #facilities.
 *
 * Reliability choices:
 *   - Destination "logos" use the Google favicon service (no API key, always
 *     resolves); a failed icon simply hides, leaving the name text.
 *   - Facility photos fall back to a captioned gradient tile if the image fails,
 *     so a dead image URL never leaves a broken-image icon.
 */

(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function favicon(domain) {
    return "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(domain) + "&sz=64";
  }

  function colorFor(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    return "hsl(" + h + ", 45%, 42%)";
  }
  function initials(name) {
    const p = String(name).trim().split(/\s+/).filter(Boolean);
    return ((p[0] ? p[0][0] : "?") + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
  }
  function avatarUri(name) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">' +
      '<rect width="96" height="96" rx="48" fill="' + colorFor(name) + '"/>' +
      '<text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial" font-size="40" fill="#fff">' +
      esc(initials(name)) + "</text></svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function sourceLinks(sources) {
    return sources.map(function (u, i) {
      return '<a href="' + esc(u) + '" target="_blank" rel="noopener">source' +
        (sources.length > 1 ? " " + (i + 1) : "") + "</a>";
    }).join(" · ");
  }

  function journeyCard(j) {
    const dest = '<img class="dest-ic" alt="" loading="lazy" referrerpolicy="no-referrer" src="' +
      esc(favicon(j.destDomain)) + '" onerror="this.style.display=\'none\'" />';
    return '<article class="journey">' +
      '<div class="j-head">' +
        '<img class="j-avatar" alt="" src="' + esc(avatarUri(j.name)) + '" />' +
        '<div><span class="j-name">' + esc(j.name) + "</span>" +
        (j.badge ? '<span class="j-badge">' + esc(j.badge) + "</span>" : "") + "</div></div>" +
      '<div class="j-from">' + esc(j.from) + "</div>" +
      '<p class="j-did">' + esc(j.did) + "</p>" +
      '<div class="j-next">' + dest + "<span><strong>Now:</strong> " + esc(j.next) + "</span></div>" +
      '<div class="j-src">' + sourceLinks(j.sources) + "</div>" +
    "</article>";
  }

  function renderJourneys() {
    const host = document.getElementById("journeys");
    if (!host) return;
    host.innerHTML = JOURNEYS.map(journeyCard).join("");
  }

  function logoChip(item) {
    return '<span class="logo-chip">' +
      '<img alt="" loading="lazy" referrerpolicy="no-referrer" src="' + esc(favicon(item.domain)) +
      '" onerror="this.style.display=\'none\'" />' + esc(item.name) + "</span>";
  }

  function renderDestinations() {
    const host = document.getElementById("destinations");
    if (!host) return;
    host.innerHTML =
      '<h3 class="wall-h">Graduate schools &amp; research programs</h3>' +
      '<div class="logo-wall">' + DESTINATIONS.universities.map(logoChip).join("") + "</div>" +
      '<h3 class="wall-h">Industry &amp; biotech</h3>' +
      '<div class="logo-wall">' + DESTINATIONS.employers.map(logoChip).join("") + "</div>";
  }

  function renderFacilities() {
    const host = document.getElementById("facilities");
    if (!host) return;
    host.innerHTML =
      '<div class="fac-grid">' + FACILITIES.images.map(function (im) {
        return '<figure class="fac">' +
          '<img alt="' + esc(im.caption) + '" loading="lazy" referrerpolicy="no-referrer" src="' + esc(im.url) +
          '" onerror="this.closest(\'.fac\').classList.add(\'noimg\'); this.remove();" />' +
          '<figcaption>' + esc(im.caption) + "</figcaption></figure>";
      }).join("") + "</div>" +
      '<p class="fac-credit">' + esc(FACILITIES.credit) + "</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderJourneys();
    renderDestinations();
    renderFacilities();
  });
})();

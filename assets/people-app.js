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

  function renderVideos() {
    const host = document.getElementById("videos");
    if (!host || typeof VIDEOS === "undefined") return;
    host.innerHTML = '<div class="video-grid">' + VIDEOS.map(function (v) {
      return '<figure class="video">' +
        '<div class="video-frame"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/' +
        esc(v.id) + '" title="' + esc(v.title) + '" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe></div>' +
        '<figcaption>▶ ' + esc(v.title) + "</figcaption></figure>";
    }).join("") + "</div>";
  }

  var SOCIAL_ICON = {
    instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3v11.6a2.6 2.6 0 1 1-2.6-2.6c.2 0 .5 0 .7.1V9a5.7 5.7 0 1 0 5 5.6V8.7a7.2 7.2 0 0 0 4.2 1.3V7a4.3 4.3 0 0 1-3.3-1.2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
  };
  function renderSocials() {
    const host = document.getElementById("socials");
    if (!host || typeof SOCIALS === "undefined") return;
    host.innerHTML = '<div class="social-bar">' + SOCIALS.map(function (s) {
      return '<a class="social social-' + esc(s.kind) + '" href="' + esc(s.url) +
        '" target="_blank" rel="noopener">' + (SOCIAL_ICON[s.kind] || "") +
        "<span>" + esc(s.name) + "</span></a>";
    }).join("") + "</div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderJourneys();
    renderDestinations();
    renderFacilities();
    renderVideos();
    renderSocials();
  });
})();

/*
 * validate-lineage.js — integrity checks for assets/lineage.js.
 * Run:  node test/validate-lineage.js   (exit 1 on any failure)
 *
 * Mirrors validate.js in spirit: because lineages.html is rendered from data at
 * runtime, these checks catch a malformed record before it becomes a silent
 * rendering bug (a broken link, a missing name, a non-URL photo).
 */

"use strict";

const { PROGRAM, LABS, MEDIA } = require("../assets/lineage.js");

const failures = [];
const fail = (m) => failures.push(m);

const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);
const isDataOrUrl = (s) => isUrl(s) || (typeof s === "string" && s.indexOf("data:") === 0);

function checkLinks(where, links) {
  if (!Array.isArray(links)) return fail(`${where}: links must be an array.`);
  links.forEach((l, i) => {
    if (!l || !l.label) fail(`${where}: link[${i}] missing label.`);
    if (!isUrl(l && l.url)) fail(`${where}: link[${i}] url is not http(s): ${l && l.url}`);
  });
}

// PROGRAM
if (!PROGRAM || !PROGRAM.note) fail("PROGRAM.note missing.");
checkLinks("PROGRAM", PROGRAM.links);

// LABS
const slugs = new Set();
LABS.forEach((lab) => {
  const w = "lab:" + (lab.slug || "?");
  if (!lab.slug) fail(`${w}: missing slug.`);
  if (slugs.has(lab.slug)) fail(`Duplicate lab slug "${lab.slug}".`);
  slugs.add(lab.slug);
  if (!lab.focus) fail(`${w}: missing focus.`);

  const f = lab.faculty;
  if (!f || !f.name || !f.title || !f.interests) fail(`${w}: faculty missing name/title/interests.`);
  if (f && f.photo != null && !isUrl(f.photo)) fail(`${w}: faculty photo is not a URL.`);
  if (f && !Array.isArray(f.pubs)) fail(`${w}: faculty.pubs must be an array.`);
  if (f) checkLinks(w + ".faculty", f.links);

  (lab.tree || []).forEach((p, i) => {
    const pw = `${w}.tree[${i}]`;
    if (!p.name || !p.role) fail(`${pw}: missing name/role.`);
    if (p.photo != null && !isUrl(p.photo)) fail(`${pw}: photo is not a URL.`);
    if ("ownLab" in p && typeof p.ownLab !== "boolean") fail(`${pw}: ownLab must be boolean.`);
    if (p.ownLab && !p.ownLabWhere) fail(`${pw}: ownLab true but ownLabWhere missing.`);
    checkLinks(pw, p.links || []);
  });

  (lab.current || []).forEach((m, i) => {
    const mw = `${w}.current[${i}]`;
    if (!m.name || !m.role) fail(`${mw}: missing name/role.`);
    if (m.photo != null && !isUrl(m.photo)) fail(`${mw}: photo is not a URL.`);
    checkLinks(mw, m.links || []);
  });
});

// MEDIA
(MEDIA || []).forEach((m, i) => {
  if (!m.title) fail(`MEDIA[${i}]: missing title.`);
  if (!isUrl(m.url)) fail(`MEDIA[${i}]: url is not http(s).`);
  if (!m.lab) fail(`MEDIA[${i}]: missing lab tag.`);
});

if (failures.length) {
  failures.forEach((m) => console.error("FAIL:", m));
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}
const trainees = LABS.reduce((n, l) => n + (l.tree ? l.tree.length : 0) + (l.current ? l.current.length : 0), 0);
console.log(`OK: ${LABS.length} labs, ${trainees} people, ${MEDIA.length} media links. All lineage checks passed.`);

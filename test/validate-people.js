/*
 * validate-people.js — integrity checks for assets/people.js.
 * Run:  node test/validate-people.js   (exit 1 on any failure)
 */

"use strict";

const { JOURNEYS, DESTINATIONS, FACILITIES } = require("../assets/people.js");

const failures = [];
const fail = (m) => failures.push(m);
const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);

JOURNEYS.forEach((j, i) => {
  const w = "JOURNEYS[" + i + (j.name ? " " + j.name : "") + "]";
  ["name", "from", "did", "next", "destDomain"].forEach((k) => {
    if (!j[k]) fail(`${w}: missing ${k}.`);
  });
  if (!Array.isArray(j.sources) || j.sources.length === 0) fail(`${w}: needs at least one source.`);
  else j.sources.forEach((u) => { if (!isUrl(u)) fail(`${w}: source not http(s): ${u}`); });
});

["universities", "employers"].forEach((group) => {
  const list = DESTINATIONS[group];
  if (!Array.isArray(list) || !list.length) return fail(`DESTINATIONS.${group} must be a non-empty array.`);
  list.forEach((d, i) => {
    if (!d.name) fail(`DESTINATIONS.${group}[${i}]: missing name.`);
    if (!d.domain || /\s|https?:/.test(d.domain)) fail(`DESTINATIONS.${group}[${i}]: domain should be a bare host, got "${d.domain}".`);
  });
});

if (!FACILITIES.credit) fail("FACILITIES.credit missing.");
if (!Array.isArray(FACILITIES.images) || !FACILITIES.images.length) fail("FACILITIES.images empty.");
FACILITIES.images.forEach((im, i) => {
  if (!isUrl(im.url)) fail(`FACILITIES.images[${i}]: url not http(s).`);
  if (!/\.(jpg|jpeg|png|svg)$/i.test(im.url.split("?")[0])) fail(`FACILITIES.images[${i}]: url is not a direct image file.`);
  if (!im.caption) fail(`FACILITIES.images[${i}]: missing caption.`);
});

if (failures.length) {
  failures.forEach((m) => console.error("FAIL:", m));
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}
console.log(`OK: ${JOURNEYS.length} journeys, ${DESTINATIONS.universities.length + DESTINATIONS.employers.length} destinations, ${FACILITIES.images.length} facility photos. All people checks passed.`);

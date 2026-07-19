/*
 * validate.js — data-integrity checks for assets/data.js.
 *
 * Run with:  node test/validate.js
 * Exit code 0 = all checks pass; 1 = at least one failure.
 *
 * These checks are the site's "unit tests": because index.html and sources.html
 * are rendered from data.js at runtime, a broken reference would otherwise only
 * surface as a silent dead link in the browser. Keeping the checks here lets the
 * data be edited confidently (see README > "Editing the data").
 */

"use strict";

const { TIERS, RUBRIC, SOURCES, FACULTY } = require("../assets/data.js");

const failures = [];
const warnings = [];
function fail(msg) { failures.push(msg); }
function warn(msg) { warnings.push(msg); }

const TIER_KEYS = new Set(TIERS.map((t) => t.key));
const REQUIRED = ["slug", "name", "dept", "title", "homepage", "research", "tier", "score", "rationale", "evidence", "students"];

// 1. Rubric caps sum to 10 (score domain matches the documented rubric).
const rubricMax = RUBRIC.reduce((n, r) => n + r.max, 0);
if (rubricMax !== 10) fail(`RUBRIC max points sum to ${rubricMax}, expected 10.`);

// 2. Per-faculty structural checks.
const seenSlugs = new Set();
const citedSources = new Set();

for (const f of FACULTY) {
  const who = f.slug || f.name || "<unknown>";

  for (const key of REQUIRED) {
    if (!(key in f)) fail(`${who}: missing required field "${key}".`);
  }
  if (seenSlugs.has(f.slug)) fail(`Duplicate slug "${f.slug}".`);
  seenSlugs.add(f.slug);

  if (!TIER_KEYS.has(f.tier)) fail(`${who}: unknown tier "${f.tier}".`);
  if (typeof f.score !== "number" || f.score < 0 || f.score > 10) {
    fail(`${who}: score ${f.score} out of range [0,10].`);
  }
  if (f.dept !== "Chemistry" && f.dept !== "BMB") fail(`${who}: unexpected dept "${f.dept}".`);

  // Evidence ids must resolve.
  if (!Array.isArray(f.evidence) || f.evidence.length === 0) {
    fail(`${who}: evidence must be a non-empty array.`);
  } else {
    for (const id of f.evidence) {
      if (!SOURCES[id]) fail(`${who}: evidence cites undefined source "${id}".`);
      else citedSources.add(id);
    }
  }

  // Students: either a note string, or an array of sourced records.
  if (Array.isArray(f.students)) {
    for (const s of f.students) {
      if (!s.name || !s.degree || !s.outcome) fail(`${who}: incomplete student record ${JSON.stringify(s)}.`);
      if (!Array.isArray(s.sources) || s.sources.length === 0) {
        fail(`${who}: student "${s.name}" has no sources (every named trainee needs one).`);
      } else {
        for (const id of s.sources) {
          if (!SOURCES[id]) fail(`${who}: student "${s.name}" cites undefined source "${id}".`);
          else citedSources.add(id);
        }
      }
      if ("ownLab" in s && typeof s.ownLab !== "boolean") fail(`${who}: student "${s.name}" ownLab must be boolean.`);
    }
  } else if (typeof f.students !== "string" || f.students.trim() === "") {
    fail(`${who}: students must be a non-empty note string or an array of records.`);
  }
}

// 3. Every non-structural source must be cited somewhere (no dead weight).
for (const id of Object.keys(SOURCES)) {
  if (SOURCES[id].structural) continue;
  if (!citedSources.has(id)) warn(`Source "${id}" is defined but never cited.`);
}

// 4. Every source needs the fields the bibliography renders.
for (const id of Object.keys(SOURCES)) {
  const s = SOURCES[id];
  for (const key of ["title", "publisher", "url", "accessed"]) {
    if (!s[key]) fail(`Source "${id}": missing "${key}".`);
  }
}

// --- report ----------------------------------------------------------------
warnings.forEach((w) => console.warn("WARN:", w));
if (failures.length) {
  failures.forEach((m) => console.error("FAIL:", m));
  console.error(`\n${failures.length} failure(s), ${FACULTY.length} faculty, ${Object.keys(SOURCES).length} sources.`);
  process.exit(1);
}
console.log(`OK: ${FACULTY.length} faculty, ${Object.keys(SOURCES).length} sources, ${warnings.length} warning(s). All integrity checks passed.`);

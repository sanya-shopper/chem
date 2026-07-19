/*
 * people.js — the "people & careers" data for the pitch pages (landing + undergrad).
 *
 * Three datasets, all rendered by people-app.js wherever the matching container
 * (#journeys / #destinations / #facilities) exists:
 *
 *   JOURNEYS     — verified stories of UNR chemistry UNDERGRADUATES who went on to
 *                  do research of their own. Every entry is sourced; nothing is
 *                  included unless a public source documents the undergraduate
 *                  origin AND the next step. (We deliberately excluded leads whose
 *                  undergrad-at-UNR status could not be verified.)
 *   DESTINATIONS — the places UNR chemistry students and alumni have landed, shown
 *                  as a logo wall (favicons — reliable, no API key).
 *   FACILITIES   — real, openly-licensed campus photos (credited).
 *
 * test/validate-people.js enforces required fields and URL shapes.
 */

/** UNR chemistry undergrads → their own research. Verified only. */
const JOURNEYS = [
  {
    name: "Quinn Padovan",
    from: "B.S. Chemistry (Honors), UNR — 2025",
    did: "Ran real research as an undergrad in the Barile Lab — turning CO₂ into fuel with electrochemistry — and won three Nevada Undergraduate Research Awards.",
    next: "NSF Graduate Research Fellowship (2026)",
    destDomain: "nsf.gov",
    badge: "National NSF Fellow",
    sources: [
      "https://www.unr.edu/nevada-today/news/2024/undergrad-researchers-combat-climate-change",
      "https://www.unr.edu/nevada-today/news/2026/graduate-school-students-earn-nsf-grfp",
    ],
  },
  {
    name: "Tyler Torres",
    from: "B.S. Chemistry, UNR — 2018 (Westfall Scholar)",
    did: "Started in undergraduate research, then earned a master’s in the Tal-Gan peptide-therapeutics lab.",
    next: "Research scientist, Arrowhead Pharmaceuticals",
    destDomain: "arrowheadpharma.com",
    badge: "Industry scientist",
    sources: [
      "https://www.unr.edu/science/student-resources/westfall-scholars",
      "https://talgan.wixsite.com/researchgroup/alumni",
    ],
  },
  {
    name: "Crissey Cameron",
    from: "Chemistry undergraduate researcher, Tal-Gan Lab (2017–2020)",
    did: "Did hands-on chemical-biology research as a UNR undergrad.",
    next: "Chemistry PhD program, Vanderbilt University",
    destDomain: "vanderbilt.edu",
    badge: "PhD track",
    sources: ["https://talgan.wixsite.com/researchgroup/alumni"],
  },
  {
    name: "Naiya Phillips",
    from: "Biochemistry undergraduate researcher, Tal-Gan Lab (2016–2018)",
    did: "Joined a research lab as a UNR undergrad.",
    next: "Biochemistry PhD program, UC Berkeley",
    destDomain: "berkeley.edu",
    badge: "PhD track",
    sources: ["https://talgan.wixsite.com/researchgroup/alumni"],
  },
  {
    name: "Sally Hamry",
    from: "Chemistry undergraduate researcher, Tal-Gan Lab (2015–2018)",
    did: "Did undergraduate research in peptide chemical biology.",
    next: "Chemistry PhD program, McGill University",
    destDomain: "mcgill.ca",
    badge: "PhD track",
    sources: ["https://talgan.wixsite.com/researchgroup/alumni"],
  },
];

/** Where UNR chemistry students & alumni have gone (logo wall). */
const DESTINATIONS = {
  universities: [
    { name: "UC Berkeley", domain: "berkeley.edu" },
    { name: "Vanderbilt University", domain: "vanderbilt.edu" },
    { name: "McGill University", domain: "mcgill.ca" },
    { name: "UNC–Chapel Hill", domain: "unc.edu" },
    { name: "University of Zurich", domain: "uzh.ch" },
    { name: "Duke University", domain: "duke.edu" },
    { name: "Boston University", domain: "bu.edu" },
    { name: "UW–Madison", domain: "wisc.edu" },
    { name: "University of Toronto", domain: "utoronto.ca" },
    { name: "SUNY New Paltz", domain: "newpaltz.edu" },
    { name: "MSU Denver", domain: "msudenver.edu" },
  ],
  employers: [
    { name: "Merck", domain: "merck.com" },
    { name: "AbbVie", domain: "abbvie.com" },
    { name: "ImmunityBio", domain: "immunitybio.com" },
    { name: "Arrowhead Pharmaceuticals", domain: "arrowheadpharma.com" },
    { name: "Thermo Fisher Scientific", domain: "thermofisher.com" },
  ],
};

/**
 * Campus & lab photography. These are University of Nevada, Reno first-party
 * images (verified to serve real content), used on this UNR-focused guide; each
 * loads with a graceful gradient fallback (people-app.js) if a URL ever moves.
 */
const FACILITIES = {
  credit: "Images: University of Nevada, Reno",
  images: [
    {
      url: "https://www.unr.edu/main/images/news/2024/August/tom-bell-group.jpg",
      caption: "The Bell research group — grad students and undergrads together",
      source: "https://www.unr.edu/nevada-today/news/2024/disease-inhibitors-bell-group",
    },
    {
      url: "https://www.unr.edu/main/images/news/2026/April/crystallization-team.jpg",
      caption: "Students running a crystallization experiment",
      source: "https://www.unr.edu/nevada-today/news/2026/innovation-day",
    },
    {
      url: "https://www.unr.edu/global/images/unr-stock/CampusImage-FB.jpg",
      caption: "The University of Nevada, Reno campus",
    },
    {
      url: "https://www.unr.edu/main/images/colleges-schools/science/home/cta-image/mackay-school-ctaimage.jpg",
      caption: "The Mackay School building, College of Science",
    },
    {
      url: "https://www.unr.edu/main/images/news/2026/July/journal-artwork.jpg",
      caption: "Cover art from a UNR chemistry research paper",
      source: "https://www.unr.edu/nevada-today/news/2026/quinone-paper",
    },
  ],
};

/** Official UNR videos to embed (verified, official @unevadareno channel). */
const VIDEOS = [
  { id: "r1jaVRqcVEU", title: "Take the official UNR campus tour" },
  { id: "a932jHqCwPk", title: "Nia — art meets science at Lake Tahoe" },
  { id: "IRbR5ZLhFz0", title: "Why the Pack: 150 years of Nevada" },
];

/** Official UNR social accounts (brand-colored chips). */
const SOCIALS = [
  { name: "Instagram", kind: "instagram", url: "https://www.instagram.com/unevadareno/" },
  { name: "TikTok", kind: "tiktok", url: "https://www.tiktok.com/@unevadareno" },
  { name: "YouTube", kind: "youtube", url: "https://www.youtube.com/@unevadareno" },
  { name: "College of Science", kind: "instagram", url: "https://www.instagram.com/unrscience/" },
  { name: "Chemistry on Facebook", kind: "facebook", url: "https://www.facebook.com/UNRChemistry/" },
];

if (typeof window !== "undefined") {
  window.JOURNEYS = JOURNEYS;
  window.DESTINATIONS = DESTINATIONS;
  window.FACILITIES = FACILITIES;
  window.VIDEOS = VIDEOS;
  window.SOCIALS = SOCIALS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { JOURNEYS, DESTINATIONS, FACILITIES, VIDEOS, SOCIALS };
}

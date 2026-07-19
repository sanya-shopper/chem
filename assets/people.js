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
    name: "Michelle Fuhrman",
    from: "Chemistry undergraduate, UNR",
    did: "Won a National Science Foundation Graduate Research Fellowship while still a UNR chemistry undergraduate (2017).",
    next: "NSF-funded PhD research",
    destDomain: "nsf.gov",
    badge: "National NSF Fellow",
    sources: [
      "https://www.unr.edu/nevada-today/news/2017/nsf-graduate-research-fellowship",
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

/** Openly-licensed campus photography (Wikimedia Commons, CC BY-SA 2.0, Ken Lund). */
const FACILITIES = {
  credit: "Photos: Ken Lund, CC BY-SA 2.0 (Wikimedia Commons)",
  images: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Morrill_Hall%2C_University_of_Nevada_%2C_Reno%2C_Nevada_%283162493782%29.jpg",
      caption: "Morrill Hall — the university’s founding building, on the historic Quad",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Mathewson-IGT_Knowledge_Center%2C_University_of_Nevada%2C_Reno%2C_Nevada_%283161659371%29.jpg",
      caption: "Mathewson-IGT Knowledge Center — the main library and study hub",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mackay_School_of_Mines_Building%2C_University_of_Nevada%2C_Reno%2C_Nevada_%283162493646%29.jpg",
      caption: "Mackay School of Mines — a historic science building on campus",
    },
  ],
};

if (typeof window !== "undefined") {
  window.JOURNEYS = JOURNEYS;
  window.DESTINATIONS = DESTINATIONS;
  window.FACILITIES = FACILITIES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { JOURNEYS, DESTINATIONS, FACILITIES };
}

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

/**
 * TRAJECTORIES — verified undergrad → PhD → postdoc → faculty paths of current
 * early-career (assistant/newly-associate) drug-discovery professors. Every step
 * was read off an official faculty/lab bio page (source linked). `tag` classifies
 * the UNDERGRADUATE institution to make the "your start doesn't have to be elite"
 * pattern visible at a glance.
 */
const TRAJECTORIES = [
  { name: "Brittany S. Morgan", now: "Asst. Professor of Cancer Drug Discovery, Notre Dame", focus: "Covalent drugs against cancer proteins (first-gen college student)",
    undergrad: "Western Kentucky University", tag: "Regional public", phd: "Duke University", postdoc: "University of Michigan",
    source: "https://chemistry.nd.edu/people/brittany-morgan/" },
  { name: "Cassandra Callmann", now: "Asst. Professor of Chemistry, UT Austin (CPRIT cancer scholar)", focus: "Carbohydrate-based materials for cancer",
    undergrad: "West Chester University of Pennsylvania", tag: "Regional public", phd: "UC San Diego", postdoc: "Northwestern University",
    source: "https://chemistry.utexas.edu/directory/cassandra-callmann" },
  { name: "Velvet Blair Journigan", now: "Asst. Professor of Pharmaceutical Sciences, Univ. of Pittsburgh", focus: "Small molecules for chronic pain (TRPM8)",
    undergrad: "UNC Wilmington", tag: "Regional public", phd: "University of Mississippi", postdoc: "—",
    source: "https://www.pharmacy.pitt.edu/people/velvet-blair-journigan" },
  { name: "Matthew J. Moschitto", now: "Asst. Professor of Medicinal Chemistry, Rutgers", focus: "Covalent inhibitors for understudied proteins",
    undergrad: "Bates College", tag: "Liberal-arts college", phd: "Cornell University", postdoc: "Northwestern (Silverman lab)",
    source: "https://sites.rutgers.edu/moschitto-lab/about/" },
  { name: "Steven Bloom", now: "Assoc. Professor of Medicinal Chemistry, Univ. of Kansas", focus: "Photoredox chemistry for protein/peptide drugs",
    undergrad: "McDaniel College", tag: "Liberal-arts college", phd: "Johns Hopkins University", postdoc: "Princeton (MacMillan lab)",
    source: "https://medchem.ku.edu/people/steven-bloom" },
  { name: "Elizabeth Parkinson", now: "Assoc. Professor of Chemistry & Med. Chem., Purdue", focus: "Natural-product discovery for antibiotics & anticancer",
    undergrad: "Rhodes College", tag: "Liberal-arts college", phd: "Univ. of Illinois (Hergenrother lab)", postdoc: "Univ. of Illinois",
    source: "https://www.chem.purdue.edu/people/profile/eparkins" },
  { name: "Charlie Fehl", now: "Asst. Professor of Chemistry, Wayne State", focus: "Chemical probes for sugar signaling in cancer & diabetes",
    undergrad: "University of Michigan", tag: "Public flagship", phd: "University of Kansas", postdoc: "Oxford (Ben Davis lab)",
    source: "https://fehl-lab.com/charlie-fehl/" },
  { name: "Xingui Liu", now: "Asst. Professor of Medicinal Chemistry, Univ. of Florida", focus: "PROTAC targeted protein degraders",
    undergrad: "China Pharmaceutical University", tag: "International", phd: "Univ. of Arkansas for Medical Sciences", postdoc: "Florida & Dundee (Ciulli lab)",
    source: "https://mc.pharmacy.ufl.edu/profile/liu-xingui/" },
  { name: "Keriann M. Backus", now: "Assoc. Professor of Chemistry & Biochem., UCLA", focus: "Covalent chemoproteomics for “undruggable” targets",
    undergrad: "Brown University", tag: "Ivy League", phd: "University of Oxford", postdoc: "Scripps (Cravatt lab)",
    source: "https://www.chemistry.ucla.edu/directory/backus-keriann-m/" },
  { name: "Ekaterina V. Vinogradova", now: "Asst. Professor, The Rockefeller University", focus: "Covalent chemical proteomics for immune drug targets",
    undergrad: "Higher Chemical College (Russian Academy of Sciences)", tag: "International", phd: "MIT (Buchwald lab)", postdoc: "Scripps (Cravatt lab)",
    source: "https://www.rockefeller.edu/our-scientists/heads-of-laboratories/8735-ekaterina-v-vinogradova/" },
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
  window.TRAJECTORIES = TRAJECTORIES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { JOURNEYS, DESTINATIONS, FACILITIES, VIDEOS, SOCIALS, TRAJECTORIES };
}

/*
 * lineage.js — data for the "For Prospective Students" page (lineages.html).
 *
 * Separate from data.js (the ranking) on purpose: this page answers a different
 * question — "what would training in a medicinal / chemical-biology lab at UNR
 * look like, and where do people go afterward?" — and carries photos, pubs, and
 * genealogy paths the ranking doesn't need.
 *
 * Verification rules (same bar as the rest of the site):
 *   - Every person and destination is drawn from a public lab/alumni page.
 *   - `photo` is set ONLY to a real, verified image URL. Where a lab publishes a
 *     duplicated placeholder or no image, `photo` is null and the page renders a
 *     generated initials avatar instead — never a wrong face.
 *   - `beforeUNR` is a person's training BEFORE this lab (BS institution, or the
 *     PhD institution for someone who arrived as a postdoc). Undergraduate
 *     *research lab* is almost never published, so it is null unless documented.
 *   - `ownLab: true` only when a trainee holds a verified independent faculty post.
 *
 * test/validate-lineage.js enforces the required-field and URL-shape invariants.
 */

/** Program-level links a prospective student actually needs. */
const PROGRAM = {
  note:
    "UNR Chemistry does not advertise a separate “medicinal chemistry” degree track. " +
    "The closest advertised home for this work is chemical biology — anchored by the " +
    "interdisciplinary Chemistry of Biological Interactions (CBI) training program — " +
    "plus individual medicinal, bioorganic, and bioanalytical labs in the department.",
  links: [
    { label: "Chemistry graduate program", url: "https://www.unr.edu/chemistry/graduate" },
    { label: "PhD & MS in Chemistry", url: "https://www.unr.edu/chemistry/graduate/phd-and-ms-in-chemistry" },
    { label: "Graduate admissions", url: "https://www.unr.edu/chemistry/graduate/graduate-admissions" },
    { label: "Chemistry of Biological Interactions (CBI) program", url: "https://www.unr.edu/chemistry-of-biological-interactions" },
    { label: "Department directory", url: "https://www.unr.edu/chemistry/people" },
  ],
};

/**
 * Labs, ordered as presented. Each has a faculty header (with collapsible
 * interests + pubs), an optional genealogy `tree` of past trainees, and an
 * optional `current` cohort. `note` states honestly when a lineage is undocumented.
 */
const LABS = [
  {
    slug: "bell",
    focus: "Medicinal chemistry · anticancer & antiviral drug design",
    teamPhoto: "https://www.unr.edu/main/images/news/2024/August/tom-bell-group.jpg",
    teamCaption: "The Bell group in matching lab shirts",
    teamPhotoSource: "https://www.unr.edu/nevada-today/news/2024/disease-inhibitors-bell-group",
    undergrads: "Undergraduates work alongside grad students synthesizing real drug candidates — the clearest on-ramp to academic drug discovery in the department.",
    undergradNames: ["Martin Kerr", "Gavin Paul"],
    faculty: {
      name: "Thomas W. Bell",
      title: "Professor of Chemistry",
      photo: null,
      interests:
        "Bell’s group is a medicinal-chemistry lab that fuses organic synthesis, molecular modeling, analytical chemistry, and molecular biology. Its signature effort is “nascent protein degraders” — small molecules (the CADA / cyclotriazadisulfonamide family) that intercept a chosen protein as it is being made and divert it for degradation, a route toward “one protein, one drug.” Targets span cancer (sortilin / breast-cancer stem cells), HIV (CD4 down-modulation), plus myosin inhibitors and other disease programs.",
      pubs: [
        { cite: "Reduction of Progranulin-Induced Breast Cancer Stem Cell Propagation by Sortilin-Targeting CADA Compounds — J. Med. Chem. (2021)" },
        { cite: "Syntheses and Anti-HIV and CD4 Down-modulating Potencies of Pyridine-fused CADA Compounds — J. Med. Chem. (2020)" },
        { cite: "The Signal Peptide as a New Target for Drug Design — Bioorg. Med. Chem. Lett. (2020)" },
        { cite: "Isoform-selective 4-hydroxycoumarin imines as inhibitors of myosin II — J. Med. Chem. (2023)" },
        { cite: "Role of Sec61α2 Translocon in Insulin Biosynthesis — Diabetes (2024)" },
      ],
      links: [
        { label: "UNR profile", url: "https://www.unr.edu/chemistry/thomas-bell" },
        { label: "“One protein, one drug” (Nevada Today, 2024)", url: "https://www.unr.edu/nevada-today/news/2024/disease-inhibitors-bell-group" },
        { label: "Molecular Biosciences profile", url: "https://www.unr.edu/molecular-biosciences/people/thomas-bell" },
      ],
    },
    tree: [],
    current: [
      { name: "Jaiden Christopher", role: "Graduate student", detail: "Rheumatoid-arthritis program", photo: null, links: [] },
      { name: "Anabela Splitstoser", role: "Graduate student", detail: "Malaria program", photo: null, links: [] },
      { name: "Amarawan Intasiri", role: "Group researcher", detail: "Drug-property studies", photo: null, links: [] },
    ],
    note:
      "Bell’s lab is the department’s most explicitly medicinal, cancer-relevant group. It does not publish an alumni page, so past-trainee destinations aren’t documented; current members are named in the 2024 Nevada Today feature.",
  },

  {
    slug: "tal-gan",
    focus: "Chemical biology · peptide therapeutics & quorum sensing",
    undergrads: "A long line of undergraduate researchers, many going on to medical or graduate school — this lab clearly invests in training students early.",
    undergradNames: ["Oscar Liu", "Angela Wang", "Daniel Elliott"],
    undergradAlumni: [
      { name: "Crissey Cameron", years: "2017–2020", major: "Chemistry", now: "Chemistry PhD, Vanderbilt University", destDomain: "vanderbilt.edu", source: "https://talgan.wixsite.com/researchgroup/alumni" },
      { name: "Naiya Phillips", years: "2016–2018", major: "Biochemistry", now: "Biochemistry PhD, UC Berkeley", destDomain: "berkeley.edu", source: "https://talgan.wixsite.com/researchgroup/alumni" },
      { name: "Sally Hamry", years: "2015–2018", major: "Chemistry", now: "Chemistry PhD, McGill University", destDomain: "mcgill.ca", source: "https://talgan.wixsite.com/researchgroup/alumni" },
    ],
    faculty: {
      name: "Yftah Tal-Gan",
      title: "Professor of Chemistry",
      photo: "https://static.wixstatic.com/media/5f9915_23ecb16615364933a799182677b89abf~mv2.jpg/v1/fill/w_200,h_200,al_c,q_80/tal-gan_lab004014.jpg",
      interests:
        "The Tal-Gan lab designs synthetic peptides as chemical tools and therapeutics, centered on bacterial quorum sensing — the cell-to-cell signaling that Gram-positive pathogens (streptococci, enterococci) use to coordinate virulence. By building modified competence-stimulating-peptide (CSP) analogs, the group silences or reprograms these circuits as an anti-virulence alternative to antibiotics that avoids driving resistance. The work spans organic synthesis, biochemistry, and microbiology, and is an unusually well-documented training pipeline.",
      pubs: [
        { cite: "Designing cyclic competence-stimulating peptide (CSP) analogs — PNAS (2020)" },
        { cite: "Noncanonical S. sanguinis ComCDE circuitry integrates environmental cues — Cell Chemical Biology (2023)" },
        { cite: "Attenuating the S. pneumoniae competence regulon using urea-bridged cyclic CSP analogs — J. Med. Chem. (2022)" },
        { cite: "Targeting peptide-based quorum sensing systems for Gram-positive infections (review) — Peptide Science (2023)" },
      ],
      links: [
        { label: "UNR profile", url: "https://www.unr.edu/chemistry/faculty/yftah-tal-gan" },
        { label: "Lab website", url: "https://talgan.wixsite.com/researchgroup" },
        { label: "Alumni page", url: "https://talgan.wixsite.com/researchgroup/alumni" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=P9qymhkAAAAJ&hl=en" },
      ],
    },
    tree: [
      { name: "Dominic McBrayer", role: "Postdoc", years: "2016–2019", beforeUNR: "PhD, UT Austin", after: "Assistant Professor, SUNY New Paltz", ownLab: true, ownLabWhere: "SUNY New Paltz", ownLabUrl: "https://www.newpaltz.edu/chemistry/directory.html",
        photo: "https://static.wixstatic.com/media/5f9915_85857d04a2374ce4994b11920c3a402a~mv2.jpg",
        story: "Came to UNR as a postdoc, then joined SUNY New Paltz as a chemistry professor — where he now runs his own lab with undergraduate researchers.",
        links: [ { label: "Their lab ↗", url: "https://www.newpaltz.edu/chemistry/directory.html" }, { label: "Feature", url: "https://sites.newpaltz.edu/news/2024/03/assistant-professor-dominic-mcbrayer-prediction-model/" }, { label: "Scholar", url: "https://scholar.google.com/citations?hl=en&user=K-G-JN0AAAAJ" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/dominicmcbrayer" } ] },
      { name: "Keely Rodriguez-Renshaw", role: "PhD", years: "2022–2026", beforeUNR: "BS Biology, Nevada State College", after: "Tenure-track faculty, The Evergreen State College", ownLab: true, ownLabWhere: "Evergreen State College",
        photo: null,
        story: "Earned her PhD at UNR and moved into a tenure-track faculty role, now teaching and mentoring her own students.",
        links: [ { label: "LinkedIn", url: "https://www.linkedin.com/in/keely-rodriguez-renshaw/" } ] },
      { name: "Bimal Koirala", role: "PhD", years: "2015–2019", beforeUNR: null, after: "Senior Scientist, Merck", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_5ce7d631af704a089f4259ce1810a2cb~mv2.jpg",
        links: [ { label: "Scholar", url: "https://scholar.google.com/citations?user=VKfb0mkAAAAJ&hl=en" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/bimal-koirala-phd-08810393/" } ] },
      { name: "Tahmina Milly", role: "PhD", years: "2016–2022", beforeUNR: null, after: "Senior Scientist I, AbbVie", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_183cd12960f24c3198ae3a081fabd19f~mv2.jpg",
        links: [ { label: "Scholar", url: "https://scholar.google.com/citations?user=_mBm2yEAAAAJ&hl=en" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/tahmina-ahmed-milly-phd-b90aa8b3/" } ] },
      { name: "Chowdhury Raihan Bikash", role: "PhD", years: "2015–2020", beforeUNR: null, after: "Scientist II, ImmunityBio", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_29a85151ac31412f8d4bc54ddabf0299~mv2.jpg",
        links: [ { label: "LinkedIn", url: "https://www.linkedin.com/in/crbikash" }, { label: "ResearchGate", url: "https://www.researchgate.net/profile/Chowdhury-Raihan-Bikash" } ] },
      { name: "Ryan W. Mull", role: "PhD", years: "2016–2021", beforeUNR: null, after: "Postdoc, UNC–Chapel Hill (Bo Li lab)", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_e27375bcdf8143229bac5d047aaec461~mv2.jpg",
        links: [ { label: "UNC lab", url: "https://tarheels.live/ligroup/news/" } ] },
      { name: "Yifang Yang", role: "PhD", years: "2015–2019", beforeUNR: null, after: "Postdoc, SUNY Buffalo", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_106a8e5baf8b4996adcf8cd00a0ea59c~mv2.jpg",
        links: [ { label: "ResearchGate", url: "https://www.researchgate.net/profile/Yifang-Yang-4" } ] },
      { name: "Alec Brennan", role: "PhD", years: "2020–2025", beforeUNR: null, after: "UNC–Chapel Hill Medical School", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_4c4a06ea8ba046dd9fddaab8bd408b10~mv2.jpg",
        links: [ { label: "LinkedIn", url: "https://www.linkedin.com/in/alecbrennan/" }, { label: "Scholar", url: "https://scholar.google.com/citations?user=WlS6HlcAAAAJ&hl=en" } ] },
      { name: "Mona Mehrani", role: "PhD", years: "2019–2025", beforeUNR: null, after: "Chemist III, Nevada State Public Health Lab", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_656c4fc98f2a467489107668cb285a36~mv2.jpg",
        links: [ { label: "LinkedIn", url: "https://www.linkedin.com/in/mona-mehrani" } ] },
      { name: "Muralikrishna Lella", role: "Postdoc", years: "2019–2023", beforeUNR: "PhD, IISER Bhopal", after: "Postdoc, Duke University", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_3b088a33fd6c46ca8a9705ceedad97e0~mv2.png",
        links: [ { label: "Scholar", url: "https://scholar.google.com/citations?user=4Wr6OfYAAAAJ&hl=en" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/muralikrishna-lella-273551170/" } ] },
      { name: "Tyler Torres", role: "MS", years: "2019–2022", beforeUNR: "BS, UNR (2018)", after: "Associate Chemist, Arrowhead Pharmaceuticals", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_37bad8f20fb24962a94b75b2e0b37e9d~mv2.jpg",
        story: "A UNR chemistry B.S. (Westfall Scholar) who stayed for a research master’s, then became an industry research scientist.",
        links: [] },
      { name: "Morgan Yeager", role: "MS", years: "2024–2026", beforeUNR: null, after: "PhD student, University of Zurich (Hartrampf lab)", ownLab: false,
        photo: "https://static.wixstatic.com/media/5f9915_6da29b38b9184604b9e6b22a4c628353~mv2.jpg", links: [] },
    ],
    current: [
      { name: "Anju Basnet", role: "Graduate student", detail: "joined 2021", photo: "https://static.wixstatic.com/media/5f9915_99c9e400f05c4367b56e74370dcfcd35~mv2.jpg", links: [] },
      { name: "Aspen Easter", role: "Graduate student", detail: "BS Chemistry, UNR (2024)", photo: "https://static.wixstatic.com/media/5f9915_c8842904b38347739d1725a90530fecd~mv2.jpg", links: [] },
    ],
    note:
      "The department’s deepest documented pipeline: two alumni now run their own academic labs (McBrayer, Rodriguez-Renshaw), with others across pharma (Merck, AbbVie), biotech (ImmunityBio, Arrowhead), academia, and medicine.",
  },

  {
    slug: "tucker",
    focus: "Biophysical chemistry · ultrafast 2D-IR of peptides & proteins",
    teamPhoto: "https://images.squarespace-cdn.com/content/v1/5b117a105b409b1e0dd26975/1528402977123-Q9QUX1ZIRXMGAWVXETW9/laser.jpg",
    teamCaption: "The ultrafast 2D-IR laser setup students actually run",
    undergrads: "Regularly mentors undergraduate researchers, several of whom appear as co-authors and move on to PhD programs.",
    undergradNames: ["Lexington Harris", "Chloe Blackwelder"],
    faculty: {
      name: "Matthew J. Tucker",
      title: "Professor of Chemistry",
      photo: null,
      interests:
        "The Tucker group uses ultrafast, two-dimensional infrared (2D-IR) spectroscopy — femtosecond laser pulses — to watch proteins and peptides move in real time during folding, binding, and membrane interaction. They engineer site-specific vibrational reporters (cyano-tryptophan, azides, cyanamide) and photochemical triggers to resolve dynamics at atomic scale, with side projects in vibrational energy flow and the UV-photoprotection chemistry of desert lichens (astrobiology-relevant).",
      pubs: [
        { cite: "Unraveling hydration-shell dynamics around cyanamide probes via 2D-IR — J. Am. Chem. Soc. (2025)" },
        { cite: "Synthesis of 5-cyano-tryptophan as a 2D-IR reporter of structure — Angew. Chem. Int. Ed. (2018)" },
        { cite: "Nonequilibrium dynamics of helix reorganization by transient 2D-IR — PNAS (2013)" },
        { cite: "Bombolitin antimicrobial peptides: structural diversity on membrane binding — Biophys. J. (2019)" },
      ],
      links: [
        { label: "UNR profile", url: "https://www.unr.edu/chemistry/matthew-tucker" },
        { label: "Lab website", url: "https://www.tuckergroupunr.org" },
        { label: "Lab news / blog", url: "https://www.tuckergroupunr.org/news" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=tGVMyocAAAAJ&hl=en" },
      ],
    },
    tree: [
      { name: "Joshua P. Martin", role: "Postdoc", beforeUNR: "PhD (prior)", after: "Associate Professor, Metropolitan State University of Denver", ownLab: true, ownLabWhere: "MSU Denver", ownLabUrl: "http://webapp.msudenver.edu/directory/profile.php?uName=jmart490",
        photo: "https://www.msudenver.edu/wp-content/uploads/2021/08/Martin-Joshua-scaled-e1628807577792-278x300.jpeg",
        story: "Did his postdoc at UNR, then became an Associate Professor at MSU Denver, where he leads his own lab.",
        links: [ { label: "Their lab ↗", url: "http://webapp.msudenver.edu/directory/profile.php?uName=jmart490" }, { label: "LinkedIn", url: "https://www.linkedin.com/in/joshua-martin-43974544/" } ] },
      { name: "Natalie R. Fetto", role: "PhD", years: "2020", beforeUNR: null, after: "Teaching faculty, University of Tampa → now UNR Chemistry", ownLab: false, photo: null,
        links: [ { label: "UNR page", url: "https://www.unr.edu/chemistry/people" } ] },
      { name: "Matthew G. Roberson", role: "PhD", years: "2022", beforeUNR: null, after: "Postdoc, Boston University", ownLab: false, photo: null, links: [] },
      { name: "Farzaneh Chalyavi", role: "PhD", years: "2019", beforeUNR: null, after: "Postdoc, University of Wisconsin–Madison", ownLab: false, photo: null,
        links: [ { label: "Scholar", url: "https://scholar.google.com/citations?user=Z2OHhNMAAAAJ&hl=en" } ] },
      { name: "David G. Hogle", role: "PhD", years: "2019", beforeUNR: null, after: "Postdoc, University of Toronto", ownLab: false, photo: null,
        links: [ { label: "ResearchGate", url: "https://www.researchgate.net/scientific-contributions/David-G-Hogle-2113802672" } ] },
      { name: "Andrew J. Schmitz", role: "PhD", years: "2021", beforeUNR: null, after: "Field Application Scientist, Thermo Fisher", ownLab: false, photo: null,
        links: [ { label: "UNR page", url: "https://www.unr.edu/chemistry/graduate/phd-in-chemical-physics/meet-our-graduate-students/andrew-schmitz" } ] },
      { name: "Christopher J. Mallon", role: "PhD", beforeUNR: null, after: "Scientist, Horiba", ownLab: false, photo: null,
        links: [ { label: "UNR page", url: "https://www.unr.edu/chemistry/graduate/phd-in-chemical-physics/people/christopher-mallon" } ] },
    ],
    current: [
      { name: "Derek Moore", role: "Graduate student", detail: "BS Chemistry & Physics, UNR", photo: "https://images.squarespace-cdn.com/content/v1/5b117a105b409b1e0dd26975/d6858ef9-6527-438e-a0c4-8fcb75d331fa/20230901_102159.jpg", links: [] },
      { name: "Yingshi Feng", role: "Graduate student", detail: "BS Chemical Engineering, UNR", photo: "https://images.squarespace-cdn.com/content/v1/5b117a105b409b1e0dd26975/2abe7150-a3b4-42ac-a8d5-4af10759587f/20230901_102210.jpg", links: [] },
      { name: "Anna Stein", role: "Graduate student", detail: "BS Physics & Chemistry, University of Delaware", photo: "https://images.squarespace-cdn.com/content/v1/5b117a105b409b1e0dd26975/cfab7be5-e1c1-439f-a24b-c0896df9320f/20230901_102220.jpg", links: [] },
      { name: "Taylor Rice", role: "Graduate student", detail: "BS Chemistry, UNR", photo: "https://images.squarespace-cdn.com/content/v1/5b117a105b409b1e0dd26975/c27746a6-43af-4e92-9f4b-3e28c36bc18a/2182A648-184B-49F5-8698-9B69B6195302.jpeg", links: [] },
    ],
    note:
      "One alumnus (Joshua Martin) now runs his own academic lab; most PhDs went on to postdocs at Boston University, UW–Madison, and Toronto, or into instrumentation industry. Undergraduate origins are published only for current students.",
  },

  {
    slug: "borotto",
    focus: "Bioanalytical mass spectrometry · protein structure & PTMs",
    undergrads: "The lab advertises an open undergraduate research spot — literally labeled “This could be you!”",
    faculty: {
      name: "Nicholas Borotto",
      title: "Assistant Professor of Chemistry",
      photo: "https://static.wixstatic.com/media/b7f14d_8c124677167e4bbb97f686ce97d79319~mv2_d_1362_1815_s_2.jpg",
      interests:
        "The Borotto lab builds mass-spectrometry methods to read out protein three-dimensional structure and post-translational modifications, combining MS with chemical derivatization, photon irradiation, ion mobility, and radical chemistry (FRIPS). It is a strong home for students who want analytical / physical rigor pointed at biological molecules — the toolkit is directly transferable to proteomics in disease, including cancer.",
      pubs: [
        { cite: "Publication list maintained on the group’s Google Scholar profile (linked)." },
      ],
      links: [
        { label: "UNR profile", url: "https://www.unr.edu/chemistry/nicholas-borotto" },
        { label: "Lab website", url: "https://nborotto.wixsite.com/borottolab" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=kZkglFEAAAAJ&hl=en" },
        { label: "ORCID", url: "https://orcid.org/0000-0003-2793-1481" },
      ],
    },
    tree: [],
    current: [
      { name: "Talitha Richards", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_4163edc6d5ab48d1b5b5a1405312f2c6~mv2.jpg", links: [] },
      { name: "Keshari Kunwor", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_6d4af9047b0f4c6cb429f58e6a4a0eff~mv2.jpg", links: [] },
      { name: "Olakunle Akinola", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_dc48a384b7f449e790819e8700b9410e~mv2.png", links: [] },
      { name: "Supadach Prertprawnon", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_9a9311a4eb8e4b6790a45c883c3abece~mv2.jpg", links: [] },
      { name: "Kismat Nepal", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_0ec2cdc3ccf449a5b0bbb2204171ff20~mv2.jpg", links: [] },
      { name: "Musfiq Al Noman Ahmed", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_671af4cce740487b88728a5097e92680~mv2.jpg", links: [] },
      { name: "Hannaneh Chogan", role: "Graduate student", photo: "https://static.wixstatic.com/media/b7f14d_6e26c409aa3c4bdbb685c1e9f374f1de~mv2.jpeg", links: [] },
    ],
    note:
      "A younger lab (PI trained at UMass and Michigan), so it has a full current cohort but no published alumni destinations yet.",
  },

  {
    slug: "jeffrey",
    focus: "Natural products · synthetic methodology & chemical ecology",
    faculty: {
      name: "Christopher S. Jeffrey",
      title: "Professor of Chemistry; Director, Hitchcock Center for Chemical Ecology",
      photo: null,
      interests:
        "The Jeffrey lab studies the chemistry of biological interactions — isolating new natural products (neolignans, meroterpenoids) from plants, inventing synthetic methodology, and connecting molecules to ecology. For a student interested in drug-like natural-product scaffolds and total synthesis, this is the department’s natural-products home.",
      pubs: [
        { cite: "Isolation of new neolignans and an unusual meroterpenoid from Piper cabagranum — Frontiers in Natural Products (2024)" },
        { cite: "Structure revision of scytonemin imine — Scientific Reports (2025)" },
        { cite: "Phytochemical diversity drives plant–insect community diversity — PNAS (2015)" },
      ],
      links: [
        { label: "UNR profile", url: "https://www.unr.edu/chemistry/christopher-jeffrey" },
        { label: "Hitchcock Center for Chemical Ecology", url: "https://www.unr.edu/chemical-ecology" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=7FR3xNgAAAAJ&hl=en" },
      ],
    },
    tree: [],
    current: [],
    note: "Lab members and alumni are not published on the department page; see the Hitchcock Center for group activity.",
  },

  {
    slug: "debettencourt-dias",
    focus: "Inorganic / photomedicine · lanthanide photodynamic-therapy agents",
    faculty: {
      name: "Ana de Bettencourt-Dias",
      title: "Professor & Department Chair",
      photo: null,
      interests:
        "This group designs luminescent lanthanide complexes for light emission, sensing, and therapy. Through targeted ligand design, some complexes generate singlet oxygen for photodynamic cancer therapy, and others act as intracellular optical sensors of disease markers — a route into photomedicine for students who like inorganic and materials chemistry. As department chair, she is also a useful person for prospective students to know.",
      pubs: [
        { cite: "Photocytotoxicity of thiophene- and bithiophene-dipicolinato luminescent lanthanide complexes — J. Med. Chem. (2021)" },
        { cite: "Photocytotoxicity of oligothienyl chelates that sensitize Ln(III) luminescence and generate ¹O₂ — Chem. Eur. J. (2020)" },
        { cite: "¹O₂-generating luminescent lanthanide complexes with naphthalimide sensitizers — Inorg. Chem. (2019)" },
      ],
      links: [
        { label: "UNR profile", url: "https://www.unr.edu/chemistry/ana-de-bettencourt-dias" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=T1CfOpUAAAAJ&hl=en" },
        { label: "ORCID", url: "https://orcid.org/0000-0001-5162-2393" },
      ],
    },
    tree: [],
    current: [],
    note: "Individual group members are not published on the department page.",
  },
];

/** Blogs, features, and media a prospective student can read for the human side. */
const MEDIA = [
  { title: "A Decade of Discovery — UNR ↔ Lafayette peptide collaboration (features UNR students)", url: "https://americanpeptidesociety.org/news/decade-of-discovery/", lab: "Tal-Gan" },
  { title: "Silencing Strep Signals — Tal-Gan Lab research highlight", url: "https://americanpeptidesociety.org/research/silencing-strep-signals/", lab: "Tal-Gan" },
  { title: "Yftah Tal-Gan — American Peptide Society Spotlight (PDF)", url: "https://www.americanpeptidesociety.org/wp-content/uploads/2021/12/YftahTalGan-spotlight-final.pdf", lab: "Tal-Gan" },
  { title: "Alumnus Dominic McBrayer’s independent research (SUNY New Paltz News)", url: "https://sites.newpaltz.edu/news/2024/03/assistant-professor-dominic-mcbrayer-prediction-model/", lab: "Tal-Gan" },
  { title: "Undergraduate research with the Tal-Gan lab (UNR PREP)", url: "https://www.unr.edu/undergradresearch/opportunities/prep/tal-gan-f25", lab: "Tal-Gan" },
  { title: "Moving closer to “one protein, one drug” (Nevada Today)", url: "https://www.unr.edu/nevada-today/news/2024/disease-inhibitors-bell-group", lab: "Bell" },
  { title: "Tucker Group news / blog (grants, milestones, astrobiology)", url: "https://www.tuckergroupunr.org/news", lab: "Tucker" },
];

if (typeof window !== "undefined") {
  window.PROGRAM = PROGRAM;
  window.LABS = LABS;
  window.MEDIA = MEDIA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROGRAM, LABS, MEDIA };
}

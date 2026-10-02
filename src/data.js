import media from "./media.json";

export const studio = {
  name: "Allistar Technologies",
  shortName: "Allistar",
  tagline: "Architectural design and built environment consultancy",
  email: "allistartechnologies@gmail.com",
  directorEmails: ["philemonaheebwa@gmail.com", "7358emma@gmail.com"],
  phones: [
    { display: "+256 774 821 865", href: "tel:+256774821865" },
    { display: "+256 787 698 034", href: "tel:+256787698034" },
    { display: "+256 784 480 464", href: "tel:+256784480464" },
  ],
  address: [
    "2nd Floor, Ntinda Shopping Centre",
    "Plot 1, Kimera Road, Ntinda",
    "Suite 16C",
    "P.O. Box 184535, Kampala",
  ],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ntinda+Shopping+Centre+Kimera+Road+Kampala",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=32.600%2C0.338%2C32.632%2C0.362&layer=mapnik&marker=0.3500%2C32.6160",
  cover: "/media/studio/cover.jpg",
};

export const categories = [
  "Residential",
  "Commercial",
  "Mixed use",
  "Civic",
  "Industrial",
  "Interior",
];

const images = (slug) => media.projects[slug] ?? [];

function project(slug, body) {
  return { slug, images: images(slug), ...body };
}

export const projects = [
  project("buddo", {
    name: "Mixed-use block, Buddo",
    place: "Buddo, Kyengera, Wakiso District",
    category: "Mixed use",
    status: "Proposed",
    scale: "Five levels, podium type",
    year: "On the boards",
    summary:
      "A five-level mixed-use building that stacks shops, a lobby and parking below apartments, built to make the most of one plot on a busy part of the Kyengera road.",
    body: [
      "A 5-level mixed-use building is a mid-rise urban structure that vertically integrates several distinct and complementary functions — residential, commercial and office — into one cohesive development. The aim is a live-work-play environment: a vibrant public ground floor with private, secure living above.",
      "The basement and ground floors carry the high-traffic public part of the building: retail, cafés and restaurants opening onto the street, a lobby, and integrated parking. The typical floors above hold higher-density apartment units.",
      "The structure uses a podium composition, where a one to two level concrete base holds the commercial space and the construction above rises from it. Residents and the public are kept apart by separate entrances, stairs and a dedicated fire exit.",
      "Amenities include basement parking, garbage chutes and a mechanical room. The design puts weight on energy efficiency, natural light and green space, and takes the maximum land use available in a densely populated area.",
    ],
    facts: [
      ["Structure", "Reinforced concrete podium"],
      ["Ground and basement", "Retail, café, lobby, parking"],
      ["Upper floors", "One to four: apartment units"],
      ["Amenities", "Two-level landscaped garden"],
    ],
  }),
  project("roxxana", {
    name: "Roxxana Logistics warehouse",
    place: "Old Kampala, Kampala Central",
    category: "Industrial",
    status: "Proposed",
    scale: "Bottled and canned drinks storage",
    year: "On the boards",
    summary:
      "A storage solution designed around soft drinks in bottles and cans, organised for quick access, correct temperature, and stock that moves without crossing itself.",
    body: [
      "The commission was to design a customised storage solution for soft drinks, in bottles and cans, using several strategies to keep storage and distribution efficient.",
      "The warehouse layout is designed so space is used fully, with product within reach and quick access, so goods move through the building without crossing their own paths.",
      "Temperature control protects the quality of the product. Technology and automation are introduced to streamline operations and reduce errors, and inventory management is treated as critical, because the cost of a shortage or an overstock is the client's.",
      "Safety and compliance are handled in the layout itself, so the environment of the store preserves the product and satisfies the regulations that apply to it.",
    ],
    facts: [
      ["Storage type", "Bottles and cans"],
      ["Focus", "Access, temperature, stock movement"],
      ["Systems", "Automation and inventory management"],
      ["Standards", "Food storage safety and compliance"],
    ],
  }),
  project("kazwe", {
    name: "Kazwe industry and logistics warehouse",
    place: "Kamengo, Mpigi District",
    category: "Industrial",
    status: "Proposed",
    scale: "Factory linked to warehouse",
    year: "On the boards",
    summary:
      "A scheme that links a factory closely to its warehouse, so production, storage and despatch happen in one flow rather than across a yard.",
    body: [
      "The proposal links a factory closely to a warehouse, focusing on optimising space and efficiency in manufacturing and storage.",
      "The warehouse layout is arranged for better storage and work productivity, and the logistics design incorporates technology to improve safety, flexibility and productivity.",
      "Systems are introduced to streamline operations and reduce errors, and the structural design is resolved on load-bearing capacity, material selection and environmental considerations.",
    ],
    facts: [
      ["Brief", "Factory and warehouse as one system"],
      ["Focus", "Space, flow, productivity"],
      ["Structure", "Load capacity and material selection"],
    ],
  }),
  project("batching-plant", {
    name: "Concrete batching plant and site camp",
    place: "Ngwedo, Buliisa District",
    category: "Industrial",
    status: "Proposed",
    scale: "Industrial plant with site accommodation",
    year: "On the boards",
    summary:
      "A semi-enclosed plant laid out in one direction, from raw material storage through the mixing tower to truck loading, with traffic kept to a single counterclockwise loop.",
    body: [
      "The batching camp is designed for industrial efficiency, safety and environmental compliance. It is a functional, semi-enclosed layout that gives a streamlined production flow from raw material storage to finished product loading, while managing high traffic volumes, dust and water recycling.",
      "The plant is arranged in a linear sequence so nothing moves unnecessarily: raw material storage, conveyors, the batching tower for weighing and mixing, then truck loading. A central, elevated mixing tower acts as the core, with aggregate bins, cement silos and water tanks arranged immediately around it.",
      "Separate entrance and exit gates create a counterclockwise, one-way traffic pattern, which improves safety and reduces congestion. Offices, laboratories and break areas sit upwind, away from dust and noise.",
      "Aggregate is kept in open, partitioned bays so sand, gravel and stone do not contaminate each other. Cement is held in tall, sealed vertical silos, with screw conveyors to the mixing tower. The mixing tower and platform are steel frames built for gravity-fed operation, and belt and screw conveyors form the veins of the plant, often covered to limit dust.",
    ],
    facts: [
      ["Workflow", "Linear, materials in and trucks out"],
      ["Core", "Elevated mixing and weighing tower"],
      ["Aggregate", "Partitioned bays, two to four sections"],
      ["Cement", "Sealed silos with screw conveyors"],
      ["Traffic", "Separate gates, one-way, counterclockwise"],
      ["Water", "Recycling built into the layout"],
    ],
  }),
  project("vacker", {
    name: "Vacker Company Limited premises",
    place: "Mbogo Road, Kiwatule, Kampala",
    category: "Industrial",
    status: "On site",
    scale: "Branded warehouse with showroom",
    year: "Construction",
    summary:
      "A warehouse that also has to carry a brand. Showrooms, client spaces and branded logistics areas turn a functional store into a physical version of the company story.",
    body: [
      "The project transforms a functional storage space into a physical representation of a company's brand story, bridging the gap between industrial utility and brand communication.",
      "The exterior is bold and recognisable, built for brand awareness, and the space includes showrooms, client interaction zones and open-view areas using materials and colours that match the brand image.",
      "The layout is a spatial narrative: it guides visitors through a curated journey, from a welcoming entrance to functional, branded spaces. Even the logistics areas — loading bays, storage racks — reflect a commitment to efficiency, innovation or sustainability.",
      "A single high-profile building acts as an iconic beacon. Interior design and structural elements are tailored to the brand's attributes, using natural materials where sustainability is the message, or sleek minimalist and industrial materials where that is the message. Where an existing structure is involved, it is adapted rather than replaced, so the brand's history stays visible.",
    ],
    facts: [
      ["Type", "Warehouse, showroom and offices"],
      ["Approach", "Brand identity built into the elevation"],
      ["Experience", "Showroom and client zones inside"],
      ["Logistics", "Branded loading and storage areas"],
    ],
  }),
  project("ibanda", {
    name: "Mixed-use commercial block, Ibanda",
    place: "High Street and Rutehenda Road, Ibanda",
    category: "Mixed use",
    status: "Proposed",
    scale: "Three levels, shop house type",
    year: "On the boards",
    summary:
      "Three levels on the main town street: glazed retail at the base, small offices and incubator space above, arranged as a mini-town hub.",
    body: [
      "A 3-level commercial building on a major street, designed as a mixed-use structure that maximises land value by stacking different business types, acting as a mini-town hub.",
      "The structure is reinforced concrete. The ground floor is given over to high-traffic retail, boutiques, cafés and service businesses — banking, salons — with large glazed shopfronts, awnings and direct access from the street.",
      "The upper floors hold other lettable spaces, typically small offices or startup incubator space. The building is planned as a shop house or vertical mixed-use development, with central stairs and shared balconies serving the shops. Rear on-site parking and direct accessible entrances keep the front clear.",
      "Its position on the main town street gives it high visibility and steady foot traffic. Spaces can be adapted to different business needs, and security systems and sustainable design elements help attract tenants. For a small town, the building works as an economic anchor, giving local businesses and services a place to trade.",
    ],
    facts: [
      ["Levels", "Three"],
      ["Structure", "Reinforced concrete"],
      ["Ground floor", "Retail and services, glazed frontage"],
      ["Upper floors", "Small offices and incubator space"],
      ["Access", "Rear on-site parking, separate entrances"],
    ],
  }),
  project("ishanyu", {
    name: "Mini commercial hub, Ishanyu",
    place: "Ishanyu, Ibanda Road, Mbarara District",
    category: "Commercial",
    status: "Proposed",
    scale: "Single storey, roadside",
    year: "On the boards",
    summary:
      "A single-storey commercial building at the Ishanyu interchange, balancing low-cost construction with a welcoming, traditional roadside character.",
    body: [
      "The design is a single-floor commercial building at the Ishanyu roundabout interchange on the road to Bushenyi, balancing functional, low-cost construction with a welcoming, accessible and traditional aesthetic.",
      "The structure is designed to sit harmoniously within a smaller streetscape, using durable materials and making the most of its visibility from the road.",
    ],
    facts: [
      ["Levels", "Single storey"],
      ["Setting", "Ishanyu interchange, Mbarara"],
      ["Priority", "Low cost, durability, road visibility"],
    ],
  }),
  project("nyakisharara", {
    name: "Apartments at Nyakisharara",
    place: "Nyakisharara, Ibanda Road, Mbarara District",
    category: "Residential",
    status: "Proposed",
    scale: "Three levels, two-bedroom units",
    year: "On the boards",
    summary:
      "A symmetrical three-level block of two-bedroom apartments, with a central stair dividing the front into two mirrored halves and parking in the setback.",
    body: [
      "A 3-level symmetrical two-bedroom, high-density apartment block, cost-effective and suited to rental or urban living.",
      "The building is rectangular, with a central entrance and staircase that divides the facade into two equal, mirrored sides, which gives it a modern, clean-lined character.",
      "Externally it uses modern, low-maintenance materials: strong coloured render and concrete, with horizontal siding and brick cladding as accents.",
      "Identical windows and balconies stack up the facade, with the balconies projecting to emphasise the symmetrical pattern. A lean-to roof keeps the composition simple. Parking is taken at the ground floor or front setback, which adds to the rental value.",
    ],
    facts: [
      ["Levels", "Three"],
      ["Units", "Two-bedroom"],
      ["Facade", "Mirrored, central stair"],
      ["Materials", "Coloured render, concrete, brick"],
      ["Parking", "Ground floor or front setback"],
    ],
  }),
  project("mbalwa", {
    name: "One-bedroom apartments, Mbalwa",
    place: "Mbalwa, Kira, Wakiso District",
    category: "Residential",
    status: "Proposed",
    scale: "22 one-bedroom units around a court",
    year: "On the boards",
    summary:
      "A symmetrical U-shaped block of 22 one-bedroom homes around a shared courtyard, with a modern Mediterranean character and units facing inward.",
    body: [
      "A symmetrical U-shaped one-bedroom apartment block that arranges living units around three sides of a central shared outdoor courtyard. The layout maximises natural light, improves privacy, and provides a secure, sheltered and visually appealing shared space.",
      "Three identical wings house the one-bedroom units, connected by a shared base in the middle of the U. The courtyard is the heart of the design: a private outdoor retreat shielded from street noise, and used mainly for parking.",
      "Units face inward, giving residents views of the courtyard rather than the road. The facade and form use a modern Mediterranean aesthetic — clean geometric lines and large openings — to connect the interior to the courtyard.",
      "Inside, the apartments are open-concept, with a kitchen, dining and living area arranged to feel larger than it is, and a separate, well-defined bedroom towards the back of the wing for privacy. Each wing has a central staircase, upper-level units have balconies over the courtyard, and the configuration is intended to maximise the number of units, 22, while keeping the environment amenity-rich.",
    ],
    facts: [
      ["Form", "U-shaped, three identical wings"],
      ["Units", "22 one-bedroom apartments"],
      ["Central space", "Shared courtyard, mainly parking"],
      ["Units face", "Inward to the courtyard"],
      ["Style", "Modern Mediterranean"],
    ],
  }),
  project("kitagobwa", {
    name: "One- and two-bedroom apartments, Kitagobwa",
    place: "Kitagobwa, Kasangati, Wakiso District",
    category: "Residential",
    status: "Proposed",
    scale: "Three levels, mixed unit types",
    year: "On the boards",
    summary:
      "One-bedroom homes at ground level for people who would rather avoid stairs, and a mix of one- and two-bedroom homes on the two floors above.",
    body: [
      "The development has a multi-level layout, with ground-floor one-bedroom units and a mix of one- and two-bedroom apartments across two upper levels, offering a blend of compact, accessible living and more spacious homes above.",
      "The ground-floor units are designed for easy access, for individuals, couples, or anyone who prefers to avoid stairs. They have an open-plan kitchen, living and dining area to maximise space, a fully functional kitchen with built-in cupboards, a private enclosed bathroom, compact wardrobe storage in the bedroom, and direct access to a veranda.",
      "The upper levels mirror the footprint of the ground-floor unit, but hold a mixture of two-bedroom and one-bedroom apartments. The two-bedroom homes have extended corners for better light and more space: a master suite with an attached bathroom and private balcony, a second bedroom for guests, children or a home office, a larger open-plan living and dining area with its own balcony, and a separate second bathroom.",
      "The building as a whole is planned with 24/7 security, CCTV and a gated approach, water backup and parking for residents.",
    ],
    facts: [
      ["Levels", "Three"],
      ["Ground floor", "One-bedroom units with verandas"],
      ["Upper levels", "Mix of one- and two-bedroom"],
      ["Amenities", "24/7 security, water backup, parking"],
    ],
  }),
  project("kisenyi", {
    name: "Primary school, Kisenyi",
    place: "Kisenyi, Kakoba, Mbarara District",
    category: "Civic",
    status: "On site",
    scale: "L-shaped block around a courtyard",
    year: "Construction",
    summary:
      "A single compact school building in an L around a courtyard, consolidating academic, social and administrative functions into one structure.",
    body: [
      "A single-building school design, with a compact multi-storey structure focused on vertical, efficient circulation and social connection. It maximises space with specialised wings for different age groups, flexible learning zones, and materials chosen to be safe, integrated and sustainable.",
      "The plan is L-shaped around a central courtyard, which maximises natural light and ventilation, improving focus and reducing energy use. The courtyard is the heart of the building: a large open space for assemblies, performances and social gathering.",
      "The ground floor carries the high-traffic areas, with verandahs continuing from the courtyard and the administrative offices. The upper floors are the quiet zones — classrooms, library and laboratories — kept away from noise.",
      "Wide, well-lit balconies improve security and, with clear sightlines, let staff monitor students easily. Contemporary materials such as glass and steel in the balconies give a welcoming institutional feel. Classrooms are flexible enough for different teaching methods, with ergonomic movable furniture. Consolidating academic, social and administrative functions into one structure keeps the school manageable and secure.",
    ],
    facts: [
      ["Form", "L-shaped around a courtyard"],
      ["Ground floor", "Verandahs and administration"],
      ["Upper floors", "Classrooms, library, laboratories"],
      ["Circulation", "Wide balconies, clear sightlines"],
    ],
  }),
  project("sowing-hope", {
    name: "Sowing Hope nursery and primary school",
    place: "Isingiro",
    category: "Civic",
    status: "On site",
    scale: "Semi-rural, phased",
    year: "Construction, in phases",
    summary:
      "A semi-rural school built around courtyards, with wide verandas, high ceilings and locally sourced materials, designed to be added to a piece at a time.",
    body: [
      "The architectural design of this semi-rural school is characterised by a focus on sustainability, low maintenance, integration with the natural landscape and locally sourced materials.",
      "Passive cooling is prioritised over mechanical air conditioning. Natural light and ventilation are used to create a conducive learning environment, with high ceilings of 3.5 to 4.5 metres and double-roof systems to move air.",
      "Inspired by traditional settlements, the layouts use courtyards that provide shaded, secure, open space for socialising and play. Classroom blocks are arranged linearly and in U-shaped, open-courtyard configurations to maximise light and air, with classroom dimensions that allow the school to expand as it grows. Wide covered verandas are a staple, serving as extended learning space, circulation, and protection from heavy rain.",
      "Ventilation blocks — perforated walls or gaps in brickwork — improve cross-ventilation, and large windows reduce the need for electricity. Corrugated metal sheets are used for roofing for durability, insulated against heat with ceilings below.",
      "Beyond classrooms, the school includes libraries, dining areas and administrative offices in separate, smaller single-storey structures, with landscaped educational gardens and outdoor play areas at the centre of the layout. On sloped terrain, buildings sit on or step along different platforms to reduce excavation and settle into the landscape. Ramps are used in place of stairs so the school is accessible.",
      "The architecture blends with the surrounding rural landscape rather than imposing an urban look, using neutral and natural base materials with bright, bold colours on doors, windows and accent walls to create a stimulating environment for children. The approach also allows local residents to build or expand the school using traditional skills.",
    ],
    facts: [
      ["Cooling", "Passive, 3.5 to 4.5 m ceilings"],
      ["Layout", "Courtyards, linear and U-shaped blocks"],
      ["Materials", "Locally sourced, corrugated roof"],
      ["Access", "Ramps in place of stairs"],
      ["Growth", "Modular, built in phases"],
    ],
  }),
  project("laura", {
    name: "Laura Ministries",
    place: "Bwaise, Kawempe, Kampala",
    category: "Civic",
    status: "Proposed",
    scale: "Residential facility for vulnerable mothers",
    year: "On the boards",
    summary:
      "A home rather than an institution: private rooms for mothers recovering from trauma, a shared heart of dining and kitchen, and a garden that supports independence.",
    body: [
      "The facility is designed as a home away from home rather than a clinical or institutional environment.",
      "The design is trauma-informed. It reduces anxiety by removing harsh triggers, uses calm colour schemes and ensures acoustic comfort. It uses layers of space, so residents choose how much social interaction they have.",
      "Safety and security come from a secure, inward-looking or gated layout that provides a protective envelope, with clear sightlines and well-lit, non-confusing layouts that reduce fear. Privacy and agency are protected through individual living blocks and private rooms rather than large dormitories, so dignity is restored. The building blends discreetly into a residential neighbourhood.",
      "Spatially, it works as a small village: larger volumes are broken into smaller ones, which fosters a sense of community and reduces the feeling of being in an institution. The heart of the plan — the communal areas, shared dining and communal kitchen — is the focal point where bonding and shared learning happen.",
      "Passive design does a lot of the work, with large roof overhangs for shade, natural ventilation and optimised orientation to reduce energy costs. An urban community garden is part of the plan, so mothers can gain skills and reach economic independence.",
    ],
    facts: [
      ["Approach", "Trauma-informed design"],
      ["Rooms", "Private rooms and living blocks"],
      ["Heart", "Shared dining and communal kitchen"],
      ["Landscape", "Community garden"],
      ["Context", "Discreet within a residential street"],
    ],
  }),
  project("buloba", {
    name: "Buloba Nabukalu Church School",
    place: "Buloba, Wakiso District",
    category: "Civic",
    status: "Proposed",
    scale: "Campus, classroom blocks and courts",
    year: "On the boards",
    summary:
      "A school campus in woodland: classroom blocks, a playing field and courts set around open ground, arranged so the school can grow in phases.",
    body: [
      "The scheme sets teaching blocks, a pitch and play courts into a wooded site. Buildings sit around open ground so the campus can grow in phases without losing the courts, or the trees between them.",
    ],
    facts: [
      ["Setting", "Wooded site at Buloba"],
      ["Programme", "Classroom blocks, pitch, courts"],
      ["Growth", "Phased around open ground"],
    ],
  }),
  project("buruhwari", {
    name: "Buruhwari Plaza",
    place: "Buruhwari, Wakiso District",
    category: "Commercial",
    status: "Proposed",
    scale: "Retail mall with lettable upper floors",
    year: "On the boards",
    summary:
      "A corner retail building where shops open to the street and the upper floors step back behind deep balconies.",
    body: [
      "Buruhwari Plaza is planned as a mall you meet from the road. The ground floor is glazed shopfront, and the floors above step back behind balconies so the street stays open while upper tenants keep shade and a view of the corner. Parking and the approach follow the slope of the site.",
    ],
    facts: [
      ["Ground floor", "Glazed retail to the street"],
      ["Upper floors", "Lettable rooms with balconies"],
      ["Site", "Corner plot, sloped"],
    ],
  }),
  project("pearl-marina", {
    name: "Pearl Marina",
    place: "Wakiso District",
    category: "Residential",
    status: "Proposed",
    scale: "Multi-unit residential block",
    year: "On the boards",
    summary:
      "A residential block broken into bays, so each home has a balcony and a share of shade, with stone, render and planted edges across the facade.",
    body: [
      "Pearl Marina is a multi-unit residential design. The elevation is broken into bays so each home has a balcony and a share of shade. Stone, render and planted edges keep the block from reading as one flat wall.",
    ],
    facts: [
      ["Type", "Multi-unit residential block"],
      ["Facade", "Bays with balconies and planting"],
    ],
  }),
  project("mwiri", {
    name: "Mwiri Country House",
    place: "Mwiri, Wakiso District",
    category: "Residential",
    status: "Proposed",
    scale: "Two storeys",
    year: "On the boards",
    summary:
      "A long, low country house set behind a forecourt: tiled roof, brick piers, arched openings and a planted terrace along the front.",
    body: [
      "Mwiri Country House is drawn as a long, low house set behind a forecourt. The ground floor opens through arches, and the upper floor is a planted terrace under a clay-tile roof.",
      "The materials stay simple — render, brick and tile — so the house reads clearly from the drive.",
    ],
    facts: [
      ["Levels", "Two"],
      ["Ground floor", "Arched openings"],
      ["Upper floor", "Planted terrace"],
      ["Roof", "Clay tile"],
    ],
  }),
  project("bungalow", {
    name: "Residential bungalow",
    place: "Kampala",
    category: "Residential",
    status: "Proposed",
    scale: "Single storey",
    year: "On the boards",
    summary:
      "A single-storey house keeping daily life on one level, planned around a clear front and a private outdoor side.",
    body: [
      "This bungalow keeps daily life on one level. The views study the approach, the main facade, and how the rooms meet the compound.",
    ],
    facts: [
      ["Levels", "Single storey"],
      ["Planning", "Clear front, private outdoor side"],
    ],
  }),
  project("byakatonda", {
    name: "Byakatonda residence",
    place: "Kampala",
    category: "Residential",
    status: "Proposed",
    scale: "Single-family house",
    year: "On the boards",
    summary:
      "A private house drawn as a complete residence, with the approach, the main rooms and the outdoor edges of the plot considered together.",
    body: [
      "A single-family house, drawn as a complete residence: the approach, the main rooms, and the outdoor edges of the plot considered together.",
    ],
    facts: [
      ["Type", "Single-family house"],
      ["Scope", "Approach, rooms and plot edges"],
    ],
  }),
  project("residences", {
    name: "Private residences",
    place: "Kampala",
    category: "Residential",
    status: "Proposed",
    scale: "Houses",
    year: "On the boards",
    summary:
      "A group of private house studies: the approach, the rooms and the edges of the plot drawn together as one design.",
    body: [
      "A group of private house studies from the office. Each is drawn as a complete residence, where the approach, the main rooms and the outdoor edges of the plot are resolved together rather than separately.",
    ],
    facts: [
      ["Type", "Private houses"],
      ["Scope", "Approach, rooms and plot edges"],
    ],
  }),
  project("lux-life", {
    name: "Lux-Life Gym",
    place: "Kampala",
    category: "Interior",
    status: "Proposed",
    scale: "Interior fit-out",
    year: "On the boards",
    summary:
      "A gym interior treated as a sequence: a dark reception, a brick arch, then the training floor, with lighting and route doing the explaining.",
    body: [
      "The Lux-Life interior treats the gym as a sequence. You arrive at a dark reception, pass through a brick arch, and reach the training floor.",
      "Lighting, materials and the route are drawn together so the room explains itself without a signboard.",
    ],
    facts: [
      ["Type", "Interior fit-out"],
      ["Sequence", "Reception, brick arch, training floor"],
    ],
  }),
];

export const featuredSlugs = ["buddo", "sowing-hope", "vacker", "mwiri", "lux-life"];

export const homeSlugs = [
  "buddo",
  "vacker",
  "mwiri",
  "buruhwari",
  "sowing-hope",
  "laura",
];

export const services = [
  {
    title: "Architectural design",
    text: "Buildings drawn for the plot, the climate, and the way the client will actually use them.",
  },
  {
    title: "Interior design",
    text: "Rooms, materials and lighting resolved with the architecture, not after it.",
  },
  {
    title: "Landscape design",
    text: "Courts, gardens and the edges of the site, so the building has a proper setting.",
  },
  {
    title: "Engineering design",
    text: "Structure and building services coordinated with the drawings, in the same office.",
  },
  {
    title: "Urban and regional planning",
    text: "Advice where a single building has to answer to the street, the neighbourhood or a larger plan.",
  },
  {
    title: "Pre-investment advisory services",
    text: "A clear look at a site and a brief before money is committed to construction.",
  },
  {
    title: "Project planning and management",
    text: "Programme, coordination and decisions kept in one place from design into construction.",
  },
  {
    title: "Supervision",
    text: "The office stays on the project while it is being built, so the drawing and the site still match.",
  },
];

export const process = [
  {
    title: "Advise",
    text: "Look at the site and the brief before the client commits to building. Pre-investment advice sits here.",
  },
  {
    title: "Draw",
    text: "Architecture, interiors and landscape, developed as one design rather than three separate packages.",
  },
  {
    title: "Resolve",
    text: "Engineering and planning coordinated with the drawings, so structure and services belong to the building.",
  },
  {
    title: "Stay",
    text: "Project management and supervision through construction, until what is built still matches what was drawn.",
  },
];

export const values = [
  {
    title: "Confidence",
    text: "Earned through innovative design and sound business decisions grounded in collaboration and experience.",
  },
  {
    title: "One team",
    text: "Dynamic design teams brought together to develop exceptional projects, rather than a client handed from desk to desk.",
  },
  {
    title: "Detail",
    text: "Attention to detail, because that is foundational to the successful completion of a project.",
  },
  {
    title: "Honesty",
    text: "High, respectful, knowledgeable and honest service — the reason clients choose to come back.",
  },
];

export const directors = [
  {
    slug: "muhumuza",
    role: "Principal architect",
    name: "Arch. Muhumuza Emmanuel",
    qualifications: [
      "Project Management Professional (PMP), 2025",
      "MSc Construction Management, Makerere University, 2021",
      "B.Arch (Hons), Makerere University, 2016",
    ],
    registration: [
      "Registered Architect, Uganda Architects Registration Board, Reg. No. 311",
      "Corporate Member, Uganda Society of Architects",
    ],
    experience: [
      {
        period: "August 2022 to date",
        role: "Project Architect",
        place: "Uganda Investment Authority",
        detail: "Kampala Industrial and Business Park, Namanve infrastructure project.",
      },
      {
        period: "2021 – 2023",
        role: "Assistant Lecturer",
        place: "Makerere University",
        detail: "",
      },
      {
        period: "2021 – 2022",
        role: "Project Architect",
        place: "Newplan Limited",
        detail: "",
      },
      {
        period: "2016 – 2021",
        role: "Architect",
        place: "Ssentoogo and Partners",
        detail: "",
      },
    ],
  },
  {
    slug: "aheebwa",
    role: "Design architect",
    name: "Arch. Aheebwa Philemon",
    qualifications: [
      "B.Arch (Hons), Makerere University, 2016",
    ],
    registration: [
      "Registered Architect, Uganda Architects Registration Board, Reg. No. 330",
      "Corporate Member, Uganda Society of Architects",
    ],
    experience: [
      {
        period: "2020 – 2022",
        role: "Design Architect",
        place: "Skyline Consultants",
        detail: "",
      },
      {
        period: "2019 – 2020",
        role: "Project Architect",
        place: "Impact Associates",
        detail: "",
      },
      {
        period: "2016 – 2019",
        role: "Architect",
        place: "Skyline Consultants",
        detail: "",
      },
    ],
  },
];

export const directorPortraits = Object.fromEntries(
  (media.directors ?? []).map((entry, index) => [
    directors[index]?.slug ?? index,
    entry,
  ])
);

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function projectsBySlugs(slugs) {
  return slugs.map((slug) => getProject(slug)).filter(Boolean);
}

export function projectsByCategory(category) {
  return category === "All" ? projects : projects.filter((p) => p.category === category);
}

export function relatedProjects(project, limit = 3) {
  const sameCategory = projects.filter(
    (item) => item.slug !== project.slug && item.category === project.category
  );
  const others = projects.filter(
    (item) => item.slug !== project.slug && item.category !== project.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
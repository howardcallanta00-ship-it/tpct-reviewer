import type { QuestionNotes } from '../../types';

const nftNotes: QuestionNotes = {
  t: 'biz-tech',
  e: 'An **NFT (Non-Fungible Token)** is a blockchain token that is **unique**: no two are interchangeable, and each can have a different value. It proves ownership of a digital asset. CryptoPunks are a famous early example. "Fungible" things, like coins or bitcoins, are interchangeable and equal in value.',
  w: [
    'True: CryptoPunks are classic NFTs.',
    'True: NFTs prove ownership of digital assets.',
    'This is the false statement: NFTs are unique and do not share the same value.',
    'Marked as the answer, but "cannot be replaced by another token" is exactly what non-fungible means.',
  ],
  k: {
    likely: 2,
    note: '"Cannot be replaced with other tokens" is the **definition** of non-fungible, so option 4 is true. The false statement is option 3: "tokens of the same type have the same value" describes **fungible** tokens (like cryptocurrency coins). Every NFT is unique.',
  },
  r: 'Fungible = swappable like money. Non-fungible = one of a kind.',
};

const digitalTransformation: QuestionNotes = {
  t: 'biz-strategy',
  e: '**Digital transformation** means rebuilding a business around digital technology: selling directly online (D2C), reorganizing channels, agile ways of working, and using AI, IoT and cloud across the value chain. **Servitization** is different: a product company starts selling **services** around its product (e.g. selling "engine hours" instead of engines).',
  w: [
    'D2C, online channels, agile culture and AI/IoT/cloud ecosystems are digital transformation.',
    'Disruptive innovation is a cheaper, simpler product that overturns a market.',
    'Open innovation brings in ideas from outside partners.',
    'Marked as the answer, but nothing here turns products into services.',
  ],
  k: {
    likely: 0,
    note: 'Every recovery step is about going **digital**: direct-to-consumer online sales, online channel reorganization, enterprise-wide agile, and AI/IoT/cloud ecosystems. That is **digital transformation**. Servitization would mean adding services to a product (like subscriptions or maintenance contracts), which does not appear here.',
  },
  r: 'Digital everything = digital transformation. Product → service = servitization.',
};

const erpNotes = (t: string): QuestionNotes => ({
  t,
  e: '**ERP (Enterprise Resource Planning)** combines all core business functions (purchasing, production, finance, accounting, logistics, HR) into **one integrated system with one shared database**, so data is consistent and processes connect.',
  w: [
    'CRM manages customer relationships (sales, marketing, service).',
    'Correct. Integrates all management resources into one system.',
    'KMS stores and shares organizational knowledge.',
    'SCM manages the flow from suppliers to customers.',
  ],
  r: 'ERP = one system for the whole company.',
});

export const businessNotes: Record<string, QuestionNotes> = {
  'business-01': {
    t: 'biz-strategy',
    e: '**PEST** scans the outside environment: **Political** (laws, regulations), **Economic** (growth, inflation, interest, labor cost), **Social** (demographics, culture, lifestyle trends), **Technological** (new technology, R&D). Pollution of air, water and soil is an **environmental** factor, which appears in the extended PESTEL version.',
    w: [
      'Correct pair: regulations are political.',
      'Correct pair: market growth and inflation are economic.',
      'Incorrect pair: pollution is environmental, not social.',
      'Correct pair: new technology and R&D are technological.',
    ],
    r: 'PEST = Politics, Economy, Society, Technology. Environment is the E in PESTEL.',
  },
  'business-02': {
    t: 'biz-law',
    e: 'Professional ethics include avoiding **conflicts of interest**: you should not secretly work for other companies (especially competitors) using knowledge from your employer. Training colleagues, following regulations and reporting weaknesses to the client are all good, ethical behavior.',
    w: [
      'Correct. Outside work for other companies is a conflict of interest.',
      'Ethical: helping a colleague grow.',
      'Ethical: complying with regulations.',
      'Ethical: honestly reporting problems.',
    ],
    r: 'Side jobs that compete with your employer = ethics problem.',
  },
  'business-03': {
    t: 'biz-law',
    e: '**Discovery** is a pre-trial procedure (mainly in US law) that forces **both parties** in a lawsuit to disclose relevant evidence to each other, important in patent disputes.',
    w: [
      'Correct. Forced pre-trial disclosure of evidence by both sides.',
      'Compulsory license: the government lets others use a patent without permission.',
      'Trade dress: protection of a product’s look and packaging.',
      'Right of publicity: control over commercial use of your name and image.',
    ],
    r: 'Discovery = show your evidence before trial.',
  },
  'business-04': {
    t: 'biz-process',
    e: 'IT procurement runs: plan the order → prepare the **RFP** → **evaluate proposals and sign the contract** → monitor the supplier → acceptance and close. An **RFI** (Request for Information) gathers basic information about possible suppliers **early**, before the RFP, so it does not belong in the evaluation and contract phase.',
    w: [
      'Belongs here: announce the tender.',
      'Belongs here: choose the supplier.',
      'Belongs here: negotiate the contract.',
      'Correct. RFI happens early, during planning.',
    ],
    r: 'RFI (learn about vendors) → RFP (ask for proposals) → contract.',
  },
  'business-05': {
    t: 'biz-law',
    e: '**Copyright** protects the **expression**: source code, programs, documentation. It does **not** protect **ideas**, so programming languages, protocols (rules) and algorithms are not covered by copyright. Algorithms may be protected by patents instead.',
    w: [
      'True: open-source licenses rely on copyright.',
      'True: programs and their specifications are covered.',
      'True: the author controls use, copying, distribution and modification.',
      'Correct. Languages, protocols and algorithms are ideas, not copyrightable expression.',
    ],
    r: 'Copyright protects code you wrote, not the idea behind it.',
  },
  'business-06': {
    t: 'biz-law',
    e: 'The principle "intuitive and consistent" checks whether users **understand** the UI (clear words, helpful cues) and whether it behaves **the same everywhere** (terms, styles, layout). Whether a task needs **repeated operations** is about **efficiency**, a different principle.',
    w: [
      'Fits: understandable language is intuitive.',
      'Correct. Repeated steps is an efficiency question, not intuitiveness or consistency.',
      'Fits: timely cues make the UI intuitive.',
      'Fits: consistent terms and layout.',
    ],
    r: 'Intuitive = easy to understand. Consistent = same everywhere. Fewer steps = efficient.',
  },
  'business-07': {
    t: 'biz-tech',
    e: 'A **smart factory** connects machines with IoT sensors, analyzes data with big data and AI for **predictive maintenance**, and integrates production through **CPPS** (cyber-physical production systems) so it can optimize itself. **IEEE 802.11p / ITS** is vehicle-to-vehicle communication for **intelligent transport**, not factories.',
    w: [
      'Correct. ITS and 802.11p belong to connected vehicles, not smart factories.',
      'True: IoT and intelligence give self-optimization.',
      'True: sensors and big data enable predictive maintenance.',
      'True: CPPS integrates the whole process.',
    ],
    r: '802.11p = cars talking to cars.',
  },
  'business-08': {
    t: 'biz-tech',
    e: '**TensorFlow** is Google’s open-source machine learning framework (successor to its first-generation DistBelief). Computations are drawn as a **data flow graph**: nodes are operations and edges are the data (tensors) flowing between them.',
    w: [
      'Keras is a high-level API that runs on top of TensorFlow.',
      'Theano came from the University of Montreal.',
      'Correct. Google’s data-flow-graph ML framework.',
      'PyTorch comes from Meta (Facebook).',
    ],
    r: 'Google + data flow graph = TensorFlow. Meta = PyTorch.',
  },
  'business-09': {
    t: 'biz-process',
    e: '**SERVQUAL** measures service quality as the **gap** between what customers **expect** and what they **perceive**, across five dimensions: **Tangibles, Reliability, Responsiveness, Assurance, Empathy**.',
    w: [
      'Six Sigma reduces defects using statistics.',
      'BPR radically redesigns processes.',
      'Correct. Expectation-vs-perception gap across 5 dimensions.',
      'TRIZ is an inventive problem-solving method.',
    ],
    r: 'SERVQUAL dimensions = "RATER": Reliability, Assurance, Tangibles, Empathy, Responsiveness.',
  },
  'business-10': {
    t: 'biz-strategy',
    e: 'A **platform business** connects two or more groups (buyers and sellers, drivers and riders) and benefits from **cross-side network effects**: more users on one side attract more on the other, making transactions more efficient.',
    w: [
      'Built around AI services.',
      'Rents computing resources.',
      'Correct. Connects groups and grows through network effects.',
      'Pursues a social mission.',
    ],
    r: 'Network effects connecting groups = platform (e.g. Grab, Airbnb).',
  },
  'business-11': {
    t: 'biz-law',
    e: 'A patent gives exclusive rights to **commercial** use: making, selling, distributing or offering to sell. Purely **personal, non-commercial use at home** is generally not infringement.',
    w: [
      'Selling is a commercial act, so it infringes.',
      'Correct. Personal home use is not a business act.',
      'Distributing infringes.',
      'Transferring to someone who will sell it infringes.',
    ],
    r: 'Patents block business use, not private use.',
  },
  'business-12': {
    t: 'biz-systems',
    e: 'Choosing how to get a system. **In-house development** fits when you have time, budget, skilled people, and need lots of customization. **Package/SaaS** fits when a ready product works with little change. **Outsourcing** fits when you lack internal skills.',
    w: [
      'SaaS gives little room for customization.',
      'Outsourcing makes sense when skills are missing, and here they are not.',
      'Correct. Time, budget, experts and heavy customization point to building it yourself.',
      'The package reviews found too many issues to modify.',
    ],
    r: 'Have the people + need custom = build in-house.',
  },
  'business-13': {
    t: 'biz-strategy',
    e: 'The **Balanced Scorecard (BSC)** measures performance from four perspectives. **Financial**: profit, cost ratios. **Customer**: satisfaction, market share. **Internal process**: efficiency, quality, development progress. **Learning and growth**: people and capability, like talent hiring and retention.',
    w: [
      'Mixes customer and internal process with financial KPIs.',
      'Development progress and patents are internal / growth, not financial.',
      'Sales cost and ordinary profit are financial KPIs.',
      'Correct. Talent acquisition and retirement rate measure learning and growth.',
    ],
    r: 'BSC = Financial, Customer, Internal process, Learning and growth.',
  },
  'business-14': {
    t: 'biz-systems',
    e: 'An **ISP (Information Strategy Planning)** moves from analysis to plan. **Environment analysis**: industry plus **information/IT environment**. **Current state**: **business process analysis** plus information systems, then **define requirements and improvements** (with benchmarking). **Strategy**: gap analysis → **target business and informatization plans** → action plan.',
    w: [
      'Starts with requirements before analyzing anything.',
      'Starts with requirements before analyzing anything.',
      'Puts "define requirements" after the plans are made.',
      'Environment → process analysis → requirements → plans. Matches the diagram positions.',
    ],
    k: {
      likely: 3,
      note: 'Match each blank to its column. (a) sits in **Environment analysis** next to industry analysis = information environment analysis. (b) sits in **Status analysis** next to information systems analysis = business process analysis. (c) combines with **benchmarking** = define requirements and improvements. (d) comes after gap analysis and before the action plan = establish target procedures and informatization plans. That order is option 4. Option 1 starts with requirements before any analysis, which does not fit the diagram.',
    },
    r: 'Analyze outside → analyze inside → find gaps → plan.',
  },
  'business-15': {
    t: 'biz-systems',
    e: '**ISP** sets the high-level IT strategy. **ISMP (Information System Master Plan)** goes further for a specific project: it details functions, inputs and outputs down to the level where **Function Points** can be counted, and writes measurable non-functional requirements, so a precise RFP can be written.',
    w: [
      'BPR redesigns business processes.',
      'EA maps the whole enterprise’s business and IT architecture.',
      'Detailed down to function points for a specific project’s proposal: ISMP.',
      'Marked as the answer, but ISP stays at the strategic level.',
    ],
    k: {
      likely: 2,
      note: 'The clues "for a specific software development project", "detail level that enables Function Points" and "measurable non-functional requirements" are the signature of an **ISMP**. An ISP sets organization-wide IT strategy and does not go down to function point detail.',
    },
    r: 'ISP = strategy. ISMP = detailed plan you can write an RFP from.',
  },
  'business-16': erpNotes('biz-systems'),
  'business-17': {
    t: 'biz-law',
    e: 'The **IEEE/ACM Software Engineering Code of Ethics** has eight principles: Public, Client and employer, Product (meet the **highest professional standards**), **Judgment (keep integrity and independence)**, Management, Profession, Colleagues (be fair) and Self. Decisions should rest on **independent** professional judgment, not on keeping particular stakeholders happy.',
    w: [
      'In the code: be fair to colleagues.',
      'In the code: act in the public interest.',
      'Not in the code: judgment must stay independent, not stakeholder-driven.',
      'Marked as the answer, but "highest professional standards" is the Product principle.',
    ],
    k: {
      likely: 2,
      note: 'Option 4 is almost word-for-word the **Product** principle ("ensure products meet the highest professional standards possible"), so it is a correct code item. Option 3 conflicts with the **Judgment** principle: engineers must keep **independence** in professional judgment instead of focusing on stakeholders’ perspectives.',
    },
    r: 'Ethics code: Public first, independent judgment, highest standards.',
  },
  'business-18': {
    t: 'biz-process',
    e: 'A **Pareto diagram** sorts causes from most to least frequent (bars) with a cumulative % line. It shows the **80/20 rule**: a few causes (A and D) produce most of the defects, so fix those first.',
    w: [
      'An affinity diagram groups ideas by similarity.',
      'Correct. Sorted bars and the 80/20 rule.',
      'A scatter diagram shows the relationship between two variables.',
      'A cause-and-effect (fishbone) diagram maps possible causes.',
    ],
    r: '80/20 = Pareto.',
  },
  'business-19': nftNotes,
  'business-20': {
    t: 'biz-process',
    e: 'In **ITIL**, **incident management** restores normal service **as quickly as possible** after a disruption: record, classify, use known solutions, resolve. (Problem management finds the root cause, change management controls changes.)',
    w: [
      'Change management controls changes safely.',
      'Correct. Record, classify and resolve service disruptions fast.',
      'Availability management plans uptime.',
      'Configuration management tracks IT assets and their relationships.',
    ],
    r: 'Incident = get service back now. Problem = find out why.',
  },
  'business-21': {
    t: 'biz-tech',
    e: '**Mobile Edge Computing (MEC)** processes data on servers **near the base station**, close to the user, instead of sending everything to a central cloud. That gives the low latency needed for real-time face recognition at an entrance, which is why it is central to 5G.',
    w: [
      'Correct. Processing near the user for fast response.',
      'Blockchain is a distributed ledger.',
      'IoT is connected devices, but the key here is where processing happens.',
      'Server virtualization runs many virtual servers on one machine.',
    ],
    r: 'Process at the edge, near the user = edge computing.',
  },
  'business-22': {
    t: 'biz-systems',
    e: 'Separate systems for purchasing, logistics, production, accounting and sales cause **inconsistent data** and **no end-to-end view**. The fix is an **ERP**, which puts all of them in one integrated system with one database.',
    w: [
      'SCM covers the supply chain only.',
      'MES runs the factory floor only.',
      'Correct. Integrates all functions on one database.',
      'PLM manages a product from design to retirement.',
    ],
    r: 'Many disconnected systems → ERP.',
  },
  'business-23': nftNotes,
  'business-24': {
    t: 'biz-tech',
    e: 'A **data lake** stores **all kinds of raw data** (structured and unstructured, from inside and outside) in one place, in its original form, for later analytics and machine learning. A small repository built for **one department’s specific tasks** is a **data mart**.',
    w: [
      'Marked as the answer, but a single store for all internal and external data is a data lake.',
      'This describes a data mart, so it is the incorrect statement.',
      'True: data lakes feed mining and machine learning.',
      'True: keeps diverse raw source data.',
    ],
    k: {
      likely: 1,
      note: '"A single repository of data collected inside or outside the organization" is a correct description of a **data lake**. "A repository used by field workers for specific tasks" describes a **data mart**, so option 2 is the incorrect one. (The question says "Data Take", which is a typo for "Data Lake".)',
    },
    fix: { stem: 'Which of the following is NOT correct about the Data Lake?' },
    r: 'Data lake = everything raw. Data warehouse = cleaned. Data mart = one team’s slice.',
  },
  'business-25': erpNotes('biz-systems'),
  'business-26': {
    t: 'biz-strategy',
    e: 'Porter’s **value chain** has **primary activities** (directly create value: procurement, production, logistics, sales, service) and **support activities** (help the primary ones: infrastructure, IT platform, HR and training, partner management).',
    w: [
      'Not a value chain category.',
      'Not the standard name.',
      'Not a value chain category.',
      'Correct. Infrastructure, platforms, HR and partner management support the primary activities.',
    ],
    r: 'Value chain = Primary (make and sell) + Support (help).',
  },
  'business-27': {
    t: 'biz-process',
    e: 'The ordering process runs in logical order: **plan** what to buy → write the **RFP** → **evaluate proposals and sign** → **monitor** the supplier while they deliver → **accept and close**. You can only monitor a supplier after signing with one.',
    w: [
      'Signs a contract before writing the RFP.',
      'Monitors suppliers before choosing one.',
      'Monitors suppliers before signing.',
      'Correct. Plan → RFP → contract → monitor → close.',
    ],
    r: 'You cannot monitor a supplier you have not hired yet.',
  },
  'business-28': {
    t: 'biz-law',
    e: 'Under Korea’s personal information rules, after a breach the company must **notify the affected people** without delay with the details and circumstances, by writing, email or SMS. **Reporting to authorities** is only required for larger breaches (e.g. 1,000+ people) or sensitive data, not for every single incident.',
    w: [
      'True for the guideline at the time (notify without delay).',
      'True: details, time and circumstances must be shared.',
      'True: writing, email or SMS.',
      'Correct. Not every breach must be reported to the authorities.',
    ],
    r: 'Always notify the person. Report to authorities above a threshold.',
  },
  'business-29': {
    t: 'biz-process',
    e: 'Business process improvement methods: **BPR** (radical redesign), **PI** (process innovation), **TQM** (company-wide quality), **Six Sigma**. **Critical Chain Method (CCM)** is a **project scheduling** technique that manages buffers and resource constraints. It is not a process improvement method.',
    w: [
      'A process improvement method.',
      'Not a process improvement method: CCM is a schedule management technique.',
      'Marked as the answer, but Process Innovation is a process improvement method.',
      'A process improvement method.',
    ],
    k: {
      likely: 1,
      note: '**Process Innovation (PI)** is one of the classic business process improvement approaches, together with BPR, TQM and Six Sigma. **Critical Chain Method** comes from **project schedule management** (it manages buffers along the resource-constrained critical chain), so it is the one that does not belong.',
    },
    r: 'Critical chain = project schedule tool.',
  },
  'business-30': {
    t: 'biz-tech',
    e: '**Responsive web** design uses one source and flexible layouts (CSS media queries) so the same site adapts its layout and style to phone, tablet or desktop screens.',
    w: [
      'The dark web is the hidden part of the internet.',
      'Correct. One source that adapts to every screen.',
      'The social web is about user-generated content and networks.',
      'The semantic web gives data machine-readable meaning.',
    ],
    r: 'Adapts to the screen = responsive.',
  },
  'business-31': {
    t: 'biz-systems',
    e: '**ILM (Information Lifecycle Management)** moves data to different storage tiers based on how often and how recently it is used: hot data on fast expensive storage, old cold data on cheap archives. This cuts cost while keeping important data fast.',
    w: [
      'BAM watches business activities in real time.',
      'BRE manages business rules separately from code.',
      'Correct. Storage tier depends on access frequency and age.',
      'IRM manages information as a resource in general.',
    ],
    r: 'Hot data fast, cold data cheap = ILM.',
  },
  'business-32': {
    t: 'biz-strategy',
    e: '**InnerSource** applies open-source practices (shared repositories, open contribution, code review) **inside** one company. Code is shared freely between internal teams but never published outside.',
    w: [
      'Correct. Open-source style collaboration kept inside the company.',
      'Crowdsourcing gets work or ideas from the public.',
      'Open innovation brings in outside ideas and partners.',
      'Disruptive innovation overturns a market with a simpler, cheaper offer.',
    ],
    r: 'Open source, but only inside = InnerSource.',
  },
  'business-33': {
    t: 'biz-strategy',
    e: 'SWOT strategies pair an internal factor with an external one. **SO**: use strengths to seize opportunities. **WO**: fix weaknesses to seize opportunities. **ST**: use strengths to block threats. **WT**: minimize weaknesses and avoid threats. Training AI researchers and funding AI schools directly fixes the **weakness** "shortage of AI experts and investment", while the global AI market is still early (an **opportunity**).',
    w: [
      'SO would build on existing strengths, like strong ICT infrastructure.',
      'Fixes the weakness (too few experts, low investment) to catch the early-stage opportunity.',
      'Marked as the answer. ST uses strengths against threats, but these actions target weaknesses.',
      'WT is defensive: shrink weaknesses and avoid threats.',
    ],
    k: {
      likely: 1,
      note: 'Every action (train R&D people, found AI graduate schools, fund research centers) addresses the **weaknesses**: shortage of AI experts and insufficient investment. The aim is to catch up while global AI is "at an early stage", which is listed as an **opportunity**. Weakness + Opportunity = **WO strategy**. An ST strategy would use strengths (like the strong ICT infrastructure) against threats.',
    },
    r: 'Fixing a W to grab an O = WO.',
  },
  'business-34': {
    t: 'biz-tech',
    e: 'Cloud service models. **IaaS**: you rent servers, storage and network and manage the OS yourself. **PaaS**: the provider also runs the OS, middleware, database and container platform, so you just build and run apps. **SaaS**: you simply use finished software.',
    w: [
      'DaaS provides data on demand.',
      'IaaS gives raw infrastructure, and you would still manage middleware and DB.',
      'Correct. Middleware, managed DB, containers and Kubernetes: a platform.',
      'SaaS is finished software (the S stands for Software).',
    ],
    r: 'IaaS = rent the computer. PaaS = rent the workshop. SaaS = rent the finished product.',
  },
  'business-35': {
    t: 'biz-process',
    e: '**AHP (Analytic Hierarchy Process)** is a **decision-making** method: it compares options pairwise against weighted criteria to choose the best one. It does not improve processes. BPR, PI and Six Sigma do.',
    w: [
      'Correct. AHP is a decision-making method.',
      'A process improvement technique.',
      'A process improvement technique.',
      'A process improvement technique.',
    ],
    r: 'AHP = choose between options.',
  },
  'business-36': {
    t: 'biz-strategy',
    e: 'Geoffrey Moore’s **technology adoption lifecycle**: innovators → early adopters → **the chasm** → early majority → late majority → laggards. The **chasm** is the gap between the enthusiastic early market and the practical mainstream market, where many products fail. The figure shades exactly that gap.',
    w: [
      'Main Street is the later stage of steady mainstream growth.',
      'Bowling Alley is winning niche after niche right after crossing the chasm.',
      'Marked as the answer, but the Tornado is a sudden demand surge inside the mainstream market.',
      'The shaded gap between early adopters and the early majority is the chasm.',
    ],
    k: {
      likely: 3,
      note: 'The shaded band sits **between the early market (early adopters) and the mainstream market (early majority)**. That gap is the **Chasm**, the most famous idea in Moore’s model. The Tornado happens later, when the mainstream market suddenly takes off.',
    },
    r: 'Between early adopters and early majority = the chasm.',
  },
  'business-37': {
    t: 'biz-process',
    e: 'An **SLA (Service Level Agreement)** is a contract between the IT provider and the customer with **measurable service targets** (availability, processing rate) and **penalties** if targets are missed. Internal reports to the provider’s own management are not part of the customer agreement.',
    w: [
      'An SLA item: availability target.',
      'An SLA item: service request processing rate.',
      'An SLA item: penalty for failures.',
      'Correct. Internal reporting is not a customer service level.',
    ],
    r: 'SLA = promised levels + penalties.',
  },
  'business-38': {
    t: 'biz-process',
    e: 'In **IT Service Management**, the **SLA** is the agreement between the provider and the customer that sets the service levels. **SLM** manages those levels. **SLOs** are the specific targets inside an SLA, **SLIs** are the measurements, and an **OLA** is an internal agreement between teams of the provider.',
    w: [
      'An OLA is an internal agreement between provider teams.',
      'Correct. The provider-customer agreement on service levels.',
      'SLIs are the metrics being measured.',
      'SLOs are the target values inside the SLA.',
    ],
    r: 'SLI = measure, SLO = target, SLA = contract.',
  },
  'business-39': {
    t: 'biz-tech',
    e: 'A **digital twin** is a virtual copy of a real object or system (a factory, an engine, a city), fed with live data, used to simulate, monitor and predict before acting in the real world.',
    w: [
      'Blockchain is a distributed ledger.',
      'Cloud computing provides computing over the internet.',
      'Correct. A virtual replica synced with the real thing.',
      'A smart grid is an intelligent power network.',
    ],
    r: 'Virtual copy of a real thing = digital twin.',
  },
  'business-40': digitalTransformation,
  'business-41': {
    t: 'biz-process',
    e: 'A **control chart** plots a process measure over time with a center line and upper/lower **control limits**. Points outside the limits (or unusual patterns) show the process is out of control.',
    w: [
      'Correct. Values over time against control limits.',
      'A scatter plot shows two variables against each other.',
      'A fishbone diagram maps causes.',
      'A histogram shows the distribution of values.',
    ],
    r: 'Center line + upper/lower limits over time = control chart.',
  },
  'business-42': {
    t: 'biz-strategy',
    e: 'The **IT ecosystem** is often described as **C-P-N-D**: **Contents**, **Platform**, **Network**, **Device**. The **platform** is the framework (often cloud or AI) that connects many suppliers and consumers in both directions and grows with network effects.',
    w: [
      'Contents are the services and media themselves.',
      'Correct. The two-sided connector with network effects.',
      'The network is the communication infrastructure.',
      'Devices are the hardware people use.',
    ],
    r: 'C-P-N-D: the Platform is the marketplace in the middle.',
  },
  'business-43': {
    t: 'biz-systems',
    e: 'Architect roles. **Technical architect**: the whole IT infrastructure (network, servers, software), redundancy, backup, disaster recovery, migration and solving technical issues. **Data architect**: data models and standards. **Application architect**: application structure. **Security architect**: security design.',
    w: [
      'Designs data structures and standards.',
      'Correct. Infrastructure, DR, migration and technical issues.',
      'Designs security controls.',
      'Designs application structure.',
    ],
    r: 'Servers, networks, backup and DR = technical architect.',
  },
  'business-44': digitalTransformation,
  'business-45': {
    t: 'biz-strategy',
    e: 'The **IT Balanced Scorecard** adapts the four BSC perspectives to the IT department: Financial → **Corporate contribution**, Customer → **User orientation**, Internal process → **Operational excellence**, Learning and growth → **Future orientation**.',
    w: [
      'Marked as the answer, but Customer → User orientation is the correct mapping.',
      'Incorrect pair: internal process maps to operational excellence, not "information technology".',
      'Correct pair: financial → corporate contribution.',
      'Correct pair: learning and growth → future orientation.',
    ],
    k: {
      likely: 1,
      note: 'In the IT-BSC (Van Grembergen), the IT department’s customers are the **users**, so Customer → **User orientation** is correct. Internal process maps to **Operational excellence**, not to an "information technology perspective", so option 2 is the inappropriate pair.',
    },
    r: 'IT-BSC: Corporate contribution, User orientation, Operational excellence, Future orientation.',
  },
  'business-46': {
    t: 'biz-systems',
    e: 'An ISP for a security management system runs from analysis to plan. First **analyze** the current state and threats (d). Then **design**: assign organization and tasks (a) and design the required infrastructure (b). Last, set the **implementation order and schedule** (c).',
    w: [
      'Starts with organization before analyzing the current state.',
      'Starts with organization before analyzing the current state.',
      'Analyze (d) → organization (a) → infrastructure (b) → schedule (c).',
      'Marked as the answer, but it schedules implementation before designing the infrastructure.',
    ],
    k: {
      likely: 2,
      note: 'You cannot set the implementation order and schedule (c) until you know what infrastructure you are building (b). The logical flow is analyze (d) → organization (a) → infrastructure (b) → implementation schedule (c), which is option 3.',
    },
    r: 'Analyze → design → schedule.',
  },
  'business-47': {
    t: 'biz-strategy',
    e: 'Gartner’s **Hype Cycle** shows how expectations for a technology change over time: Innovation Trigger → **Peak of Inflated Expectations** → **Trough of Disillusionment** → Slope of Enlightenment → Plateau of Productivity. The **Magic Quadrant** instead ranks **vendors** in a 2×2 grid (Leaders, Challengers, Visionaries, Niche players).',
    w: [
      'A curve of expectations for technologies over time: the hype cycle.',
      'The S-curve shows a technology’s performance growth.',
      'Marked as the answer, but the Magic Quadrant is a 2×2 grid of vendors.',
      'The adoption lifecycle shows adopter groups, not hype.',
    ],
    k: {
      likely: 0,
      note: 'The graph has "Expectations" on the vertical axis and technologies placed along a rising peak and falling trough. That is Gartner’s **Hype Cycle**. The Magic Quadrant is a square grid that compares **vendors** by vision and ability to execute.',
    },
    r: 'Peak, trough, plateau = hype cycle. 2×2 vendor grid = Magic Quadrant.',
  },
};

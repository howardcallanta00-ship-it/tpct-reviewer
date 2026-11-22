import type { Lesson } from '../../types';

export const businessLessons: Lesson[] = [
  {
    id: 'biz-strategy',
    title: 'Strategy frameworks',
    summary: 'PEST, SWOT, BSC, value chain, BCG and the adoption curves. Expect a scenario and a framework to name.',
    blocks: [
      { kind: 'text', md: '**PEST(EL)**: Political, Economic, Social, Technological (+ Environmental, Legal). Pollution is Environmental, not Social.' },
      {
        kind: 'table',
        head: ['SWOT strategy', 'Combines', 'Idea'],
        rows: [
          ['SO', 'Strength + Opportunity', 'Attack: use strengths to grab chances'],
          ['WO', 'Weakness + Opportunity', 'Improve: fix weaknesses to grab chances'],
          ['ST', 'Strength + Threat', 'Defend: use strengths against threats'],
          ['WT', 'Weakness + Threat', 'Retreat: minimize both'],
        ],
      },
      {
        kind: 'table',
        head: ['BSC perspective', 'Sample KPIs', 'IT-BSC version'],
        rows: [
          ['Financial', 'Profit, sales cost ratio', 'Corporate contribution'],
          ['Customer', 'Satisfaction, market share', 'User orientation'],
          ['Internal process', 'Efficiency, development progress', 'Operational excellence'],
          ['Learning and growth', 'Talent hiring, retention, training', 'Future orientation'],
        ],
      },
      { kind: 'text', md: '**Value chain**: primary activities (procurement, production, logistics, sales, service) + support activities (infrastructure, IT platform, HR, partner management).' },
      { kind: 'text', md: '**Technology adoption lifecycle**: innovators → early adopters → **chasm** → early majority → late majority → laggards. Moore’s stages after the chasm: bowling alley → tornado → main street.' },
      { kind: 'text', md: '**Gartner Hype Cycle**: trigger → peak of inflated expectations → trough of disillusionment → slope of enlightenment → plateau. **Magic Quadrant** = 2×2 grid of vendors.' },
      {
        kind: 'terms',
        items: [
          { term: 'Digital transformation', def: 'Rebuild the business with digital: D2C, online channels, AI/IoT/cloud.' },
          { term: 'Servitization', def: 'A product company sells services around its product.' },
          { term: 'Open innovation', def: 'Bring in outside ideas and partners.' },
          { term: 'InnerSource', def: 'Open-source practices inside one company only.' },
          { term: 'Platform business', def: 'Connects groups and grows with network effects.' },
          { term: 'C-P-N-D', def: 'IT ecosystem: Contents, Platform, Network, Device.' },
        ],
      },
    ],
  },
  {
    id: 'biz-systems',
    title: 'Enterprise systems and IT planning',
    summary: 'ERP and friends, ISP vs ISMP, sourcing choices and architect roles.',
    blocks: [
      {
        kind: 'table',
        head: ['System', 'Covers'],
        rows: [
          ['ERP', 'All core functions in one integrated system and database'],
          ['SCM', 'Suppliers → production → customers'],
          ['CRM', 'Customer relationships: sales, marketing, service'],
          ['MES', 'The factory floor'],
          ['PLM', 'A product from design to retirement'],
          ['KMS', 'Organizational knowledge'],
        ],
      },
      { kind: 'tip', md: 'Many disconnected systems + inconsistent data + no end-to-end view = **ERP**.' },
      {
        kind: 'terms',
        items: [
          { term: 'ISP', def: 'Information Strategy Planning: company-wide IT strategy (analyze environment → current state → requirements → target plans).' },
          { term: 'ISMP', def: 'Information System Master Plan: detailed plan for one project, down to function points, used to write the RFP.' },
          { term: 'EA', def: 'Enterprise Architecture: maps business, data, application and technology architecture.' },
          { term: 'BPR', def: 'Radical redesign of business processes.' },
          { term: 'ILM', def: 'Information Lifecycle Management: hot data on fast storage, cold data on cheap storage.' },
        ],
      },
      {
        kind: 'table',
        head: ['Sourcing choice', 'Choose when'],
        rows: [
          ['In-house', 'You have time, budget, experts and need heavy customization'],
          ['Package', 'A ready product fits with little change'],
          ['SaaS', 'You want it running fast with no maintenance'],
          ['Outsourcing', 'You lack internal skills'],
        ],
      },
      { kind: 'text', md: '**Architects**: technical (infrastructure, DR, migration), data (models, standards), application (app structure), security (controls).' },
    ],
  },
  {
    id: 'biz-process',
    title: 'Process improvement and IT service management',
    summary: 'Six Sigma, SERVQUAL, ITIL processes, SLAs and the IT procurement process.',
    blocks: [
      {
        kind: 'terms',
        items: [
          { term: 'BPR', def: 'Radical redesign.' },
          { term: 'PI', def: 'Process innovation.' },
          { term: 'Six Sigma', def: 'Cut defects with statistics (DMAIC).' },
          { term: 'TQM', def: 'Company-wide quality culture.' },
          { term: 'SERVQUAL', def: 'Service quality gap across Reliability, Assurance, Tangibles, Empathy, Responsiveness (RATER).' },
          { term: 'TRIZ', def: 'Inventive problem solving.' },
        ],
      },
      { kind: 'trap', md: '**AHP** (decision making) and **Critical Chain** (project scheduling) are NOT process improvement methods.' },
      {
        kind: 'table',
        head: ['ITIL process', 'Goal'],
        rows: [
          ['Incident management', 'Restore normal service fast'],
          ['Problem management', 'Find and remove root causes'],
          ['Change management', 'Control changes safely'],
          ['Configuration management', 'Track IT assets and relationships'],
          ['Service level management', 'Agree and monitor service levels'],
        ],
      },
      { kind: 'text', md: '**SLA** = provider ↔ customer agreement with measurable targets and penalties. **SLO** = the target values. **SLI** = the measurements. **OLA** = internal agreement between provider teams.' },
      { kind: 'steps', title: 'IT procurement order', items: ['Plan the order (RFI to learn about vendors)', 'Prepare the RFP', 'Evaluate proposals and sign the contract', 'Monitor the supplier', 'Acceptance and close'] },
      { kind: 'text', md: '**Quality tools**: Pareto (80/20, sorted bars), control chart (limits over time), fishbone (causes), scatter (two variables), histogram (distribution).' },
    ],
  },
  {
    id: 'biz-tech',
    title: 'Emerging technology',
    summary: 'Cloud models, edge computing, NFTs, digital twins, data lakes and AI frameworks.',
    blocks: [
      {
        kind: 'table',
        head: ['Cloud model', 'You get', 'Example'],
        rows: [
          ['IaaS', 'Servers, storage, network', 'AWS EC2'],
          ['PaaS', 'Platform: OS, middleware, managed DB, Kubernetes', 'Google App Engine'],
          ['SaaS', 'Finished software', 'Gmail, Microsoft 365'],
        ],
      },
      {
        kind: 'terms',
        items: [
          { term: 'Edge computing (MEC)', def: 'Process data near the user / base station for low latency (5G).' },
          { term: 'NFT', def: 'Unique blockchain token; each one is different and not interchangeable.' },
          { term: 'Digital twin', def: 'A live virtual copy of a real thing for simulation.' },
          { term: 'Data lake', def: 'All raw data from everywhere in one store.' },
          { term: 'Data mart', def: 'A small store for one team’s specific tasks.' },
          { term: 'Smart factory', def: 'IoT sensors, big data, AI, CPPS, predictive maintenance.' },
          { term: 'Responsive web', def: 'One source that adapts layout to every screen.' },
          { term: 'TensorFlow', def: 'Google’s ML framework based on data flow graphs.' },
        ],
      },
    ],
  },
  {
    id: 'biz-law',
    title: 'Ethics, intellectual property and privacy',
    summary: 'What copyright and patents protect, professional ethics and UX principles.',
    blocks: [
      {
        kind: 'table',
        head: ['', 'Copyright', 'Patent'],
        rows: [
          ['Protects', 'Expression: code, documents', 'Inventions, can include algorithms in a system'],
          ['Not protected', 'Ideas, languages, protocols, algorithms', '—'],
          ['Infringement', 'Copying without permission', 'Commercial making, selling, distributing (not private home use)'],
        ],
      },
      {
        kind: 'terms',
        items: [
          { term: 'Discovery', def: 'Pre-trial forced disclosure of evidence by both sides.' },
          { term: 'Compulsory license', def: 'Government lets others use a patent.' },
          { term: 'Trade dress', def: 'Protects a product’s look and packaging.' },
        ],
      },
      { kind: 'text', md: '**IEEE/ACM code of ethics** (8 principles): Public, Client and employer, Product (highest standards), Judgment (integrity and independence), Management, Profession, Colleagues (fairness), Self.' },
      { kind: 'trap', md: 'Side work for other companies using your employer’s knowledge = conflict of interest.' },
      { kind: 'text', md: '**UI/UX principles**: intuitive (easy to understand, timely cues), consistent (same terms and layout everywhere), efficient (fewer repeated steps).' },
    ],
  },
];

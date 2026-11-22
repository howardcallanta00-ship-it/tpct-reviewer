import type { Lesson } from '../../types';

export const managementLessons: Lesson[] = [
  {
    id: 'pm-basics',
    title: 'Project basics, scope and key documents',
    summary: 'What makes a project, how scope is broken down, and which document does what.',
    blocks: [
      {
        kind: 'terms',
        items: [
          { term: 'Temporary', def: 'Has a start and an end. Ongoing work is operations.' },
          { term: 'Unique', def: 'Produces something new.' },
          { term: 'Defined objectives', def: 'Each project has a clear purpose.' },
          { term: 'Progressive elaboration', def: 'Details are added as the project goes.' },
        ],
      },
      { kind: 'text', md: '**Scope management** defines what is in and out. Its tool is the **WBS**, broken down to **work packages** (the lowest level). WBS components: work package, planning package, control account, code of accounts, WBS dictionary. A Gantt chart is NOT part of the WBS.' },
      {
        kind: 'table',
        head: ['Document', 'Purpose'],
        rows: [
          ['RFI', 'Learn about possible suppliers (profile, credit, experience)'],
          ['RFP', 'Ask suppliers for a detailed proposal'],
          ['Proposal', 'The supplier’s offer'],
          ['Project charter', 'Officially starts the project and names the PM with authority'],
          ['Baseline', 'Approved snapshot; changes need CCB approval'],
        ],
      },
      { kind: 'tip', md: 'RFI = "Who are you?" RFP = "What will you build and for how much?" Charter = "This project is now official."' },
    ],
  },
  {
    id: 'pm-schedule',
    title: 'Schedule and cost',
    summary: 'Charts, critical path, schedule compression and 3-point estimation.',
    blocks: [
      {
        kind: 'table',
        head: ['Tool', 'Shows'],
        rows: [
          ['Gantt chart', 'Task bars on a timeline; good for progress'],
          ['Network diagram (PERT/CPM)', 'Dependencies between activities'],
          ['Critical path', 'The LONGEST path = minimum project duration'],
          ['Milestone chart', 'Only key milestones and whether they are met'],
        ],
      },
      {
        kind: 'table',
        head: ['Compression', 'How', 'Cost'],
        rows: [
          ['Crashing', 'Add resources (people, overtime)', 'More money'],
          ['Fast tracking', 'Overlap tasks planned in sequence', 'More risk and rework'],
        ],
      },
      { kind: 'formula', md: '3-point (PERT) estimate = (Optimistic + 4 × Most likely + Pessimistic) ÷ 6. Triangular = (O + M + P) ÷ 3.' },
      { kind: 'text', md: 'Example: O = 8, M = 10, P = 18 → PERT = (8 + 40 + 18) ÷ 6 = **11**. Triangular = 12.' },
      { kind: 'text', md: '**Resource leveling** fixes over-allocation by moving dates (can lengthen the project). **Resource smoothing** works within float only.' },
    ],
  },
  {
    id: 'pm-quality',
    title: 'Quality management',
    summary: 'Cost of quality, the seven QC tools, PDCA and reviews.',
    blocks: [
      {
        kind: 'table',
        head: ['Cost of quality', 'When', 'Example'],
        rows: [
          ['Prevention', 'Before, to stop defects', 'Training, documentation'],
          ['Appraisal', 'Checking', 'Inspection, peer review'],
          ['Internal failure', 'Defect found BEFORE delivery', 'Rework, re-test'],
          ['External failure', 'Defect found AFTER delivery', 'Defect fixes, maintenance'],
        ],
      },
      {
        kind: 'terms',
        items: [
          { term: 'Pareto chart', def: 'Causes sorted by frequency, 80/20 rule.' },
          { term: 'Control chart', def: 'Process over time with limits at mean ± 3σ.' },
          { term: 'Cause and effect (fishbone)', def: 'Possible causes of one effect.' },
          { term: 'Scatter diagram', def: 'Relationship between two variables.' },
          { term: 'Histogram', def: 'Distribution of values.' },
          { term: 'Box plot', def: 'Spread, quartiles and outliers.' },
        ],
      },
      { kind: 'steps', title: 'PDCA', items: ['Plan: set goals and approach', 'Do: carry it out', 'Check: measure results against the goal', 'Act: correct, standardize, repeat'] },
      { kind: 'text', md: '**Audit** checks that processes and standards are followed. **Inspection** is a formal defect review. **Walkthrough** is an informal review led by the author.' },
    ],
  },
  {
    id: 'pm-risk',
    title: 'Risk, organization and agile',
    summary: 'Risk responses, EMV, BCG matrix, organization structures and Kanban.',
    blocks: [
      {
        kind: 'table',
        head: ['Risk response', 'Action'],
        rows: [
          ['Avoid', 'Change the plan to remove the risk (cut scope)'],
          ['Transfer', 'Give it to a third party (insurance, outsourcing)'],
          ['Mitigate', 'Reduce probability or impact'],
          ['Accept', 'Live with it (maybe with a contingency reserve)'],
        ],
      },
      { kind: 'formula', md: 'EMV = Σ (probability × monetary outcome). Pick the branch with the best EMV.' },
      {
        kind: 'table',
        head: ['BCG', 'Growth / share', 'Strategy'],
        rows: [
          ['Star', 'High / high', 'Invest'],
          ['Question mark', 'High / low', 'Invest or drop'],
          ['Cash cow', 'Low / high', 'Harvest'],
          ['Dog', 'Low / low', 'Divest'],
        ],
      },
      {
        kind: 'table',
        head: ['Organization', 'Shape'],
        rows: [
          ['Functional', 'Departments only, PM has little power'],
          ['Matrix', 'Staff stay in departments but work on cross-cutting projects'],
          ['Projectized', 'Whole teams belong to projects'],
        ],
      },
      { kind: 'text', md: '**Kanban**: board with status columns, **WIP limits**, no fixed roles, measures lead time. **Scrum**: sprints, Product Owner, Scrum Master, backlogs.' },
    ],
  },
  {
    id: 'pm-comm',
    title: 'Communication and problem solving',
    summary: 'MECE, creative thinking, presentations, documents and the problem-solving process.',
    blocks: [
      { kind: 'text', md: '**MECE**: groups are Mutually Exclusive (no overlaps) and Collectively Exhaustive (no gaps). Test: can one item fall into two groups? Is anything left out?' },
      {
        kind: 'terms',
        items: [
          { term: 'Brainstorming', def: 'Ideas out loud, quantity over quality, no criticism, build on others.' },
          { term: 'Brainwriting', def: 'Ideas written silently and passed around.' },
          { term: 'SCAMPER', def: 'Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.' },
          { term: 'Logic tree', def: 'Break a problem into a branching structure.' },
        ],
      },
      { kind: 'steps', title: 'Problem-solving process', items: ['Define the problem', 'Analyze root causes (structure, find, prioritize causes)', 'Generate and evaluate solutions', 'Implement and gather feedback'] },
      { kind: 'text', md: '**Mehrabian**: when words and nonverbal signals conflict, body language (55%) and voice (38%) outweigh words (7%). It does NOT mean words are unimportant.' },
      { kind: 'text', md: '**Presentations**: rehearse in the real room, check fonts and images, read the audience, and match the content to them (no ERDs for merchandisers).' },
      { kind: 'text', md: '**Business documents** are written for the reader. **Meeting minutes** record date, place, attendees, agenda and decisions.' },
    ],
  },
];

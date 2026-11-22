import type { QuestionNotes } from '../../types';

const pareto: QuestionNotes = {
  t: 'pm-quality',
  e: 'A **Pareto chart** is a bar chart of problem causes sorted **from most to least frequent**, often with a cumulative % line. It applies the **80/20 rule**: about 80% of problems come from 20% of causes, so you fix the biggest bars first.',
  w: [
    'A control chart tracks a process over time against control limits.',
    'A scatter plot shows the relationship between two variables.',
    'A cause-and-effect (fishbone) diagram lists possible causes of one effect.',
    'Correct. Sorted by frequency, 80/20 rule, priorities.',
  ],
  r: 'Sorted bars + 80/20 = Pareto.',
};

export const managementNotes: Record<string, QuestionNotes> = {
  'management-01': {
    t: 'pm-comm',
    e: '**MECE** (Mutually Exclusive, Collectively Exhaustive) means groups do **not overlap** and together **cover everything**. Age bands like 20s or younger, 30s, 40s, 50s, 60s and 70s or older never overlap and include every age.',
    w: [
      '"Employees" can also be single or married, so the groups overlap.',
      'Misses people who are unemployed, students or retired.',
      'Correct. Every age fits exactly one band.',
      'New York etc. overlap with "metropolitan area", and many states are missing.',
    ],
    r: 'MECE = no overlaps, no gaps.',
  },
  'management-02': pareto,
  'management-03': {
    t: 'pm-schedule',
    e: 'A **Gantt chart** lists tasks down the side and time across the top, with a horizontal **bar** for each task showing when it starts and ends. It is easy to read for progress, but it does not show dependencies well.',
    w: [
      'Candle charts show stock prices.',
      'Correct. Task bars on a timeline.',
      'A Pareto chart shows sorted causes.',
      'A PERT chart is a network of activities and dependencies.',
    ],
    r: 'Bars on a calendar = Gantt.',
  },
  'management-04': {
    t: 'pm-basics',
    e: '**Scope management** defines everything the project must do. Its main tool is the **WBS** (Work Breakdown Structure), which breaks the work down level by level until the lowest pieces, called **work packages**, are small enough to estimate, assign and track.',
    w: [
      'Swaps WBS and work package.',
      'Correct. Scope management → WBS → work package.',
      'Puts the order upside down.',
      'Puts the order upside down.',
    ],
    r: 'Scope → WBS → work packages (smallest unit).',
  },
  'management-05': {
    t: 'pm-basics',
    e: 'An **RFP** (Request for Proposal) tells bidders what to propose: overview and target system, requirements and contract conditions, information for bidders (evaluation method), and how to prepare documents (including SLA items). A **BMT** (benchmark test) is a way to verify performance, and it should not quietly replace the technical evaluation.',
    w: [
      'Fits: overview includes the target system configuration.',
      'Fits: contract cancellation conditions.',
      'Correct per your key. Replacing the technical evaluation with a BMT is not appropriate RFP content.',
      'Fits: SLA items in proposal guidelines.',
    ],
    r: 'RFP = what to propose and how it will be judged.',
  },
  'management-06': {
    t: 'pm-basics',
    e: 'A **baseline** is a reviewed and **approved** version of a deliverable that becomes the reference point. After that, any change must go through formal **change control**, approved by the Configuration Control Board (CCB).',
    w: [
      'An output is any produced item, not necessarily approved.',
      'Correct. The approved reference point that changes are controlled against.',
      'A life cycle is the sequence of phases.',
      'A WBS breaks down the work.',
    ],
    r: 'Baseline = approved snapshot. Changes after it need CCB approval.',
  },
  'management-07': {
    t: 'pm-risk',
    e: '**Kanban** visualizes work on a board with columns per status, **limits Work In Progress (WIP)**, has no fixed roles or sprints, and measures **lead time**. It suits continuous flows of work like operations and hotfixes.',
    w: [
      'Lean development eliminates waste in general.',
      'Agile Unified Process is an agile version of RUP with phases.',
      'Correct. WIP limits, status columns, lead time, no fixed roles.',
      'TDD means writing tests before the code.',
    ],
    r: 'WIP limit + board + lead time = Kanban.',
  },
  'management-08': {
    t: 'pm-schedule',
    e: 'Schedule tools. **Network diagram**: shows how activities depend on each other. **Gantt chart**: shows progress of each activity as bars. **Critical path**: the **longest** path, which sets the project’s minimum duration. **Milestone chart**: shows only key milestones and whether they are met.',
    w: [
      'False: showing relationships is exactly what network diagrams do.',
      'False: Gantt charts show progress well.',
      'False: the critical path IS the longest path.',
      'Correct. Milestone charts show only milestones and their status.',
    ],
    r: 'Critical path = longest path = shortest possible project time.',
  },
  'management-09': {
    t: 'pm-quality',
    e: 'The **cost of quality** has four types. **Prevention** (training, documentation, to stop defects). **Appraisal** (inspections, reviews). **Internal failure**: defects found **before** delivery (rework, re-test). **External failure**: defects found **after** delivery (defect fixes, maintenance).',
    w: [
      'Marked as the answer, but (a) happens before delivery, so it is internal failure, not prevention.',
      'Mismatches all three.',
      'Swaps internal and external.',
      'Before delivery = internal, after delivery = external, preventing failure = prevention.',
    ],
    k: {
      likely: 3,
      note: 'Read the concepts in the table. (a) is a quality problem found **before the product was delivered** → **internal failure** cost. (b) is found **after delivery to the customer** → **external failure** cost. (c) is spent **to prevent failure in advance** (training) → **prevention** cost. That is option 4.',
    },
    r: 'Before delivery = internal failure. After delivery = external failure.',
  },
  'management-10': {
    t: 'pm-risk',
    e: 'Organization structures. **Functional**: staff stay in their departments with no real projects. **Projectized**: whole teams belong to the project. **Matrix**: staff stay in functional departments (development, design) but are **assigned to projects** led by project managers, so they report two ways. The figure shows project bands cutting across the departments, which is the classic matrix picture.',
    w: [
      'Functional has no cross-department project teams.',
      'Marked as the answer. "Hybrid" is not a standard name for this structure.',
      'Project managers plus staff loaned from functional departments: matrix.',
      'Projectized would give each project its own permanent team.',
    ],
    k: {
      likely: 2,
      note: 'The diagram shows departments as columns and **projects as rows cutting across them**: project managers come from the business department, and employees are dispatched from the development and design departments, then return. That two-way grid is the textbook **matrix organization**.',
    },
    r: 'Departments × projects grid = matrix.',
  },
  'management-11': {
    t: 'pm-comm',
    e: 'Brainstorming rules: **no criticism**, build on others’ ideas, speak freely, and go for **quantity over quality**. Lots of ideas first, evaluate later.',
    w: [
      'A real rule.',
      'A real rule.',
      'A real rule.',
      'Correct. False: in brainstorming, quantity matters more than quality.',
    ],
    r: 'Brainstorming = many ideas, no judging.',
  },
  'management-12': {
    t: 'pm-basics',
    e: 'A **project** is **temporary** (it has a start and an end), produces a **unique** result, is planned in more detail as it goes (**progressive elaboration**), and works under limits of scope, time and cost. **Ongoing**, repeated work is **operations**, not a project.',
    w: [
      'Correct. Projects are temporary, ongoing work is operations.',
      'True: every project is unique.',
      'True: detail is added progressively.',
      'True: scope, cost and time constraints.',
    ],
    r: 'Project = temporary + unique. Operations = ongoing + repetitive.',
  },
  'management-13': {
    t: 'pm-basics',
    e: 'Project characteristics: **temporary**, **unique**, **defined objectives**, **progressive elaboration**. The examples say *why* each system was built: Company A to manage product data, Company B for faster decisions. Each project has a clear purpose, which is a **defined objective**.',
    w: [
      'Temporary: true of projects, but the examples stress their purpose, not their time limit.',
      'Repeatability belongs to operations, not projects.',
      'Each project states a clear goal, which is a defined objective.',
      'Marked as the answer, but nothing in the examples describes refining details step by step.',
    ],
    k: {
      likely: 2,
      note: 'Both bullets describe **what each project is for**: product data management for A, faster decisions for B. That points to **defined objectives**. Progressive elaboration would need the example to describe plans becoming more detailed over time, which it does not. If the original question had extra context, re-check it.',
    },
    r: 'Project: Temporary, Unique, Defined objectives, Progressive elaboration.',
  },
  'management-14': {
    t: 'pm-basics',
    e: 'A **work package** is the lowest level of the WBS: a piece of work small enough to estimate cost and time, assign to one owner, and track. Activities are then defined inside it for scheduling.',
    w: [
      'Correct. The lowest WBS element used for estimating and assignment.',
      'The WBS dictionary describes each WBS element in detail.',
      'A control code (code of account) numbers each element.',
      'Activities are scheduled tasks inside work packages.',
    ],
    r: 'Bottom of the WBS = work package.',
  },
  'management-15': pareto,
  'management-16': {
    t: 'pm-basics',
    e: '**Scope management** defines and controls **what is and is not included** in the project, so all the required work and only the required work gets done.',
    w: [
      'Quality management makes sure the results meet requirements.',
      'Resource management handles people and equipment.',
      'Schedule management handles timing.',
      'Correct. Defines the boundaries of the work.',
    ],
    r: 'Scope = what is in and what is out.',
  },
  'management-17': {
    t: 'pm-comm',
    e: 'A good presentation is designed for its **audience**. Rehearsing, checking fonts and images in the real room, and watching audience reactions are all good practice. Explaining a technical **ERD** to merchandisers and show hosts is a mismatch, since they care about features and benefits, not database design.',
    w: [
      'Good practice: rehearse in the room.',
      'Good practice: check fonts and images in the room.',
      'Good practice: read the audience.',
      'Correct. Too technical for this audience.',
    ],
    r: 'Know your audience.',
  },
  'management-18': {
    t: 'pm-basics',
    e: 'Buying documents in order. **RFI** (Request for Information) is sent **first**, to learn about possible suppliers: company background, credit, past experience and general technology. **RFP** (Request for Proposal) then asks chosen suppliers for a detailed proposal for the actual project.',
    w: [
      'An acquisition plan plans the purchase internally.',
      'A project plan is the plan for running the project.',
      'Pre-order research on suppliers (profile, credit, experience) is an RFI.',
      'Marked as the answer, but an RFP asks for a detailed project proposal, not a supplier profile.',
    ],
    k: {
      likely: 2,
      note: 'Every clue says "before the project order is initiated" and "prior investigation into subcontractors": company introduction, credit, past performance. That is an **RFI**, the information-gathering step. An RFP comes later and asks suppliers to propose a specific solution.',
    },
    r: 'RFI = who are you? RFP = what will you build and for how much?',
  },
  'management-19': {
    t: 'pm-comm',
    e: '**Brainstorming** is a group technique: say ideas out loud, aim for **many** ideas, **no criticism**, and combine or build on others’ ideas.',
    w: [
      'Correct. Spoken ideas, quantity first, no criticism.',
      'Brainwriting has people write ideas silently and pass them on.',
      'SCAMPER uses a checklist: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.',
      'TRIZ solves problems using inventive principles from patents.',
    ],
    r: 'Out loud = brainstorming. On paper = brainwriting.',
  },
  'management-20': {
    t: 'pm-comm',
    e: 'A **box plot** shows how data is **distributed**: median, quartiles (the box), range (the whiskers) and **outliers** as separate dots. It is perfect for seeing spread and spotting outliers.',
    w: [
      'Marked as the answer, but a bar chart compares quantities between categories.',
      'A dot chart shows individual values.',
      'A pie chart shows parts of a whole.',
      'Distribution shape and outliers is the signature of a box plot.',
    ],
    k: {
      likely: 3,
      note: '"Degree and shape of the data distribution" and "identify outliers that deviate from the center" describe a **box plot** (box = middle 50% of data, whiskers = range, dots = outliers). A bar chart compares amounts between categories and does not show distribution or outliers.',
    },
    r: 'Outliers and spread = box plot.',
  },
  'management-21': {
    t: 'pm-risk',
    e: '**Expected Monetary Value (EMV)** = probability × impact, added up for each choice, usually drawn as a **decision tree**. New system: 0.6 × 8 − 0.4 × 3 = **3.6M**. Renovate: 0.6 × 7 − 0.4 × 1 = **3.8M**. Renovating has the higher EMV.',
    w: [
      'Scenario analysis explores "what if" stories without probability math.',
      'Correct. Probability × money for each branch.',
      'A tornado diagram ranks which variables affect the result most.',
      'Monte Carlo runs thousands of random simulations.',
    ],
    r: 'EMV = Σ probability × outcome.',
  },
  'management-22': {
    t: 'pm-comm',
    e: 'Check each grouping for **overlaps** and **gaps**. Purchase date: "under 2 months" is inside "under 6 months", and "1 year or over" is inside "6 months or over". Those groups overlap, so they are **not MECE**. Administrative districts also mix levels (a suburb sits inside a state), so that is not clean either.',
    w: [
      'Mostly MECE (it skips nothing major).',
      'Overlapping ranges: not mutually exclusive.',
      'Marked as the answer, but the three sales bands do not overlap and cover every value. This is MECE.',
      'Also problematic: mixes different administrative levels.',
    ],
    k: {
      likely: 1,
      note: 'Monthly sales bands (under $10,000, $10,000–$50,000, $50,000 or over) are a clean **MECE** split. The date-of-purchase groups **overlap** ("under 2 months" is also "under 6 months"; "1 year or over" is also "6 months or over"). That makes option 2 the one that is not MECE.',
    },
    r: 'Test MECE: can one item fall in two groups? Is any item left out?',
  },
  'management-23': {
    t: 'pm-quality',
    e: '**PDCA** is a quality improvement loop. **Plan** (set goals), **Do** (carry it out), **Check** (measure results against the goal), **Act** (decide and apply corrective action, then standardize). Measuring the defect rate against the goal is **Check**. Deciding on extra peer reviews in response is **Act**.',
    w: [
      'Plan sets objectives and the approach.',
      'Do is carrying out the plan.',
      'Your key: comparing the defect rate with the goal is Check.',
      'Deciding on corrective action (extra peer review) is Act.',
    ],
    k: {
      likely: -1,
      note: 'The two bullets describe **two** phases: examining the defect rate against the goal is **Check**, while deciding to add peer reviews as a corrective action is **Act**. Your key says Check. If the exam emphasizes the decision to improve, Act is the better answer, so read which activity the question focuses on.',
    },
    r: 'Check = measure vs goal. Act = fix and standardize.',
  },
  'management-24': {
    t: 'pm-comm',
    e: 'The **Mehrabian** study found that when words and nonverbal signals **disagree** about feelings, people trust tone of voice (38%) and body language (55%) more than words (7%). It does **not** mean the content of your words is unimportant. It means your delivery must match your message.',
    w: [
      'Misreads the law: words are not unimportant, they just carry less weight when signals conflict.',
      'Fits: nonverbal cues have great impact.',
      'Fits: delivery affects how likeable the speaker seems.',
      'Marked as the answer, but this fits: mismatched signals distort the message.',
    ],
    k: {
      likely: 0,
      note: 'Option 4 is actually the **core idea** of Mehrabian’s work: if words, tone and gestures do not match, the message gets distorted. Option 1 is the classic **misinterpretation**: the 7% figure does not mean verbal content is unimportant. That makes option 1 the inappropriate explanation.',
    },
    fix: {
      options: {
        3: 'When a specific message is delivered, the contents to be delivered may be distorted if the contents of words, tone of voice, speed of speech, volume of voice, gesture, and manners are different.',
      },
      dropOptions: [4],
    },
    r: '7% words, 38% voice, 55% body, but only when they conflict.',
  },
  'management-25': {
    t: 'pm-risk',
    e: 'Negative risk responses. **Avoid**: change the plan to remove the risk entirely (e.g. cut the risky scope). **Transfer**: shift it to someone else (insurance, outsourcing). **Mitigate**: reduce probability or impact. **Accept**: live with it. Narrowing scope to remove the risky part is **avoid**.',
    w: [
      'Accept would leave the scope as it is.',
      'Correct. Removing the risky scope avoids the risk.',
      'Share is for positive risks (opportunities).',
      'Transfer would give the risk to a third party.',
    ],
    r: 'Cut the risky thing out = avoid.',
  },
  'management-26': {
    t: 'pm-risk',
    e: 'The **BCG matrix** plots market growth against market share. **Star** (high growth, high share: invest), **Question mark** (high growth, low share: decide), **Cash cow** (low growth, high share: milk it), **Dog** (low growth, low share: divest). PC vaccine sits in Quadrant D (low growth, low share), so it is a dog and should be withdrawn.',
    w: [
      'Quadrant B is a question mark: invest or drop, don’t just maintain.',
      'Correct. A dog (Quadrant D) should be withdrawn.',
      'Cloud security is a star: keep investing.',
      'DoS equipment is a cash cow: harvest, not expand.',
    ],
    r: 'Stars, Question marks, Cash cows, Dogs.',
  },
  'management-27': {
    t: 'pm-schedule',
    e: '**3-point estimation (PERT)** weights the most likely value four times: **(Optimistic + 4 × Most likely + Pessimistic) ÷ 6**. Here (8 + 40 + 18) ÷ 6 = 66 ÷ 6 = **11**.',
    w: [
      'Marked as the answer, but 10 is just the most likely value with no formula.',
      'The PERT formula gives exactly 11.',
      'The plain triangular average (8 + 10 + 18) ÷ 3 = 12.',
      'Halfway between optimistic and pessimistic.',
    ],
    k: {
      likely: 1,
      note: 'Using the standard PERT formula: (8 + 4 × 10 + 18) ÷ 6 = 66 ÷ 6 = **11**. US$10 million is only the "most likely" input. Know both versions: PERT (weighted) = 11, simple triangular average = 12.',
    },
    r: '1 – 4 – 1, over 6.',
  },
  'management-28': {
    t: 'pm-quality',
    e: '**Control charts** set the upper and lower **control limits** statistically, usually at the **mean ± 3 standard deviations** of the process, not at the highest and lowest observed values. Points outside the limits (or unusual patterns) signal an unstable process.',
    w: [
      'True: fishbone shows causes → effect.',
      'True: scatter shows relationships.',
      'True: Pareto sorts by impact.',
      'Correct. False: control limits come from ±3σ, not the max and min values.',
    ],
    r: 'Control limits = mean ± 3σ.',
  },
  'management-29': {
    t: 'pm-comm',
    e: 'The company sets a target (**Plan**), sells (**Do**), checks results against daily targets (**Check**), adjusts arrangement and display (**Act**), then repeats. That repeating loop is the **PDCA cycle**.',
    w: [
      'A logic tree breaks a problem into branches.',
      'Six Sigma uses DMAIC and statistics.',
      'Correct. Plan → Do → Check → Act, repeated.',
      'A causal loop diagram maps feedback loops in a system.',
    ],
    r: 'Target, do, check, adjust, repeat = PDCA.',
  },
  'management-30': {
    t: 'pm-schedule',
    e: 'Schedule compression. **Fast tracking**: do tasks **in parallel** that were planned in sequence (more risk of rework). **Crashing**: add **resources** (people, overtime) to finish faster (more cost).',
    w: [
      'Crashing adds resources.',
      'Correct. Running two sequential tasks at the same time.',
      'Resource leveling adjusts dates to fix resource overload (often lengthens the schedule).',
      'Resource smoothing adjusts within float without changing the end date.',
    ],
    r: 'Fast tracking = overlap tasks. Crashing = throw money and people at it.',
  },
  'management-31': {
    t: 'pm-quality',
    e: 'A test result report needs a unique ID, a clear case name, input values and the **expected result**: the specific output the function should produce for that input. Expected values must be concrete and checkable, so a vague description does not work.',
    w: [
      'True: unique ID.',
      'True: identifiable case name.',
      'True: concrete input values.',
      'Correct per your key. Expected values must be specific outputs, not a general description.',
    ],
    r: 'Test case = ID, name, input, expected output (specific).',
  },
  'management-32': {
    t: 'pm-comm',
    e: 'Problem-solving steps: **define the problem** → **analyze root causes** → generate and evaluate solutions → implement and get feedback. Breaking the problem into a structure, finding the main causes with tools, and filtering out minor causes are all **cause analysis**.',
    w: [
      'Defining the problem comes before these activities.',
      'Structuring the problem, finding principal causes and prioritizing them is cause analysis.',
      'Creating solutions comes after the causes are known.',
      'Marked as the answer, but nothing here implements a solution.',
    ],
    k: {
      likely: 1,
      note: 'Every bullet is about **causes**: decompose the problem, identify the principal causes bottom-up, filter out insignificant causes by priority. That is the **Analyze underlying causes** phase. Implementation would involve carrying out a solution and collecting feedback, which the bullets never mention.',
    },
    r: 'Find and rank causes = analysis phase.',
  },
  'management-33': {
    t: 'pm-comm',
    e: 'Good meeting minutes record the **date, place, attendees and affiliations**, a clear title, and the specific agenda, discussion and decisions. Hiding the date, location and attendees would make the minutes useless as a record.',
    w: [
      'Good: list attendees and affiliations.',
      'Correct. Minutes must record date, place and attendees.',
      'Good: be specific about the agenda.',
      'Good: a clear heading.',
    ],
    r: 'Minutes = who, when, where, what was decided.',
  },
  'management-34': {
    t: 'pm-comm',
    e: 'Business documents are written for the **reader**: the purpose and the target audience decide the content and structure. Key messages come first, visuals make them quick to grasp, and supporting material goes into attachments.',
    w: [
      'Correct. Wrong: content should follow the reader’s needs, not the author’s preferences.',
      'Good practice.',
      'Good practice.',
      'Good practice.',
    ],
    r: 'Write for the reader.',
  },
  'management-35': {
    t: 'pm-basics',
    e: 'The **project charter** formally **authorizes** the project. It names the project manager, gives them authority to use resources, and records high-level objectives, success criteria, assumptions and constraints.',
    w: [
      'A proposal offers a solution to win the work.',
      'Correct. Officially starts the project and authorizes the PM.',
      'The scope management plan explains how scope will be managed.',
      'A requirements definition lists detailed requirements.',
    ],
    r: 'Charter = birth certificate of the project.',
  },
  'management-36': {
    t: 'pm-schedule',
    e: '**Fast tracking** overlaps activities that were planned in sequence. It adds risk and rework but no new resources. Adding resources to shorten the schedule is **crashing**.',
    w: [
      'True: overlapping increases risk and rework.',
      'True: works when activities can overlap.',
      'True: sequential work done in parallel.',
      'Correct. Adding resources is crashing, not fast tracking.',
    ],
    r: 'Fast tracking adds risk. Crashing adds cost.',
  },
  'management-37': {
    t: 'pm-basics',
    e: 'WBS components include **work packages** (lowest level), **planning packages** (future work not yet detailed), **control accounts** and the **code of accounts** (numbering system), plus the WBS dictionary. A **Gantt chart** is a **schedule** tool, not part of the WBS.',
    w: [
      'Not a WBS component: a Gantt chart is a scheduling tool.',
      'A WBS component: future work not yet broken down.',
      'Marked as the answer, but the code of accounts (numbering) is a WBS component.',
      'A WBS component: lowest level of work.',
    ],
    k: {
      likely: 0,
      note: 'The **code of accounts** is the numbering system that identifies each WBS element (1.1, 1.2.3...), so it **is** part of the WBS. A **Gantt chart** comes from schedule management and is not a WBS component.',
    },
    r: 'WBS parts: work package, planning package, code of accounts, dictionary.',
  },
  'management-38': {
    t: 'pm-quality',
    e: 'A quality **audit** is an independent, structured review checking whether project activities follow the organization’s **processes, policies and standards**. Walkthroughs and inspections review specific work products instead.',
    w: [
      'Correct. Independent check that processes and standards are followed.',
      'A walkthrough is an informal review led by the author.',
      'An inspection is a formal defect-finding review of a work product.',
      'Compliance is the goal, not the activity.',
    ],
    r: 'Audit = are we following the process?',
  },
};

import type { Lesson } from '../../types';

export const dataLessons: Lesson[] = [
  {
    id: 'db-sql',
    title: 'SQL you must recognize',
    summary: 'Statement families, joins, GROUP BY vs HAVING, relational division and cursors.',
    blocks: [
      {
        kind: 'table',
        head: ['Family', 'Commands', 'Purpose'],
        rows: [
          ['DDL (Definition)', 'CREATE, ALTER, DROP, TRUNCATE, RENAME', 'Shape of tables'],
          ['DML (Manipulation)', 'SELECT, INSERT, UPDATE, DELETE', 'The rows of data'],
          ['DCL (Control)', 'GRANT, REVOKE', 'Permissions'],
          ['TCL (Transaction)', 'COMMIT, ROLLBACK, SAVEPOINT', 'Save or undo work'],
        ],
      },
      { kind: 'text', md: '`TRUNCATE` deletes all rows but keeps the table. `DROP` deletes the table itself. `ALTER TABLE ... ADD` adds a column, `MODIFY` changes an existing one.' },
      {
        kind: 'table',
        head: ['Join', 'Keeps'],
        rows: [
          ['INNER', 'Only matching rows'],
          ['LEFT OUTER', 'All left rows + matches (NULL if none)'],
          ['RIGHT OUTER', 'All right rows + matches'],
          ['FULL OUTER', 'All rows from both sides'],
        ],
      },
      { kind: 'tip', md: 'Read the result table: NULLs on the right side → unmatched left rows kept. NULLs on the left side → unmatched right rows kept. Both → FULL.' },
      { kind: 'steps', title: 'Order a query runs in', items: ['FROM', 'WHERE (filter rows)', 'GROUP BY (make groups)', 'HAVING (filter groups)', 'SELECT', 'ORDER BY'] },
      { kind: 'trap', md: 'If you SELECT a plain column together with SUM()/COUNT(), you **need** GROUP BY that column. HAVING without GROUP BY plus a plain column is an error.' },
      { kind: 'text', md: '**Division A ÷ B**: which values in A are paired with **every** value in B? ("Students who took ALL the courses.")' },
      { kind: 'text', md: '**Embedded SQL cursor**: DECLARE → OPEN → FETCH (inside the loop) → CLOSE.' },
    ],
  },
  {
    id: 'db-normal',
    title: 'Normalization, keys and integrity',
    summary: 'Find the dependency, name the normal form, and know which integrity a constraint protects.',
    blocks: [
      {
        kind: 'table',
        head: ['Normal form', 'Removes', 'Quick test'],
        rows: [
          ['1NF', 'Repeating groups / multi-valued cells', 'Every cell holds one value'],
          ['2NF', 'Partial dependency', 'Does a column depend on only PART of a composite key?'],
          ['3NF', 'Transitive dependency', 'Does a non-key column depend on another non-key column?'],
          ['BCNF', 'Determinants that are not candidate keys', 'Every determinant is a candidate key'],
        ],
      },
      { kind: 'tip', md: '"The key (1NF), the whole key (2NF), and nothing but the key (3NF)."' },
      {
        kind: 'terms',
        items: [
          { term: 'Full dependency', def: 'Needs the whole composite key (Score needs Student + Subject).' },
          { term: 'Partial dependency', def: 'Needs only part of the key (Name needs only Student No.).' },
          { term: 'Transitive dependency', def: 'Key → A → B (ProfessorNumber → ProfessorName).' },
          { term: 'Candidate key', def: 'Any column(s) that uniquely identify a row.' },
          { term: 'Primary key', def: 'The candidate key you choose.' },
          { term: 'Alternate key', def: 'Candidate keys not chosen.' },
          { term: 'Composite key', def: 'A key made of two or more columns.' },
          { term: 'Foreign key', def: 'Points to another table’s primary key.' },
        ],
      },
      {
        kind: 'table',
        head: ['Integrity', 'Rule', 'Enforced by'],
        rows: [
          ['Entity', 'PK unique and not NULL', 'PRIMARY KEY'],
          ['Referential', 'FK must point to an existing row (or NULL)', 'FOREIGN KEY'],
          ['Domain', 'Values must be valid for the column', 'Data type, CHECK, NOT NULL'],
        ],
      },
      { kind: 'text', md: '**Denormalization** adds redundancy for speed, at three levels: **table** (split/merge, e.g. by month), **column** (derived or duplicate columns), **relationship** (shortcut relationships).' },
    ],
  },
  {
    id: 'db-model',
    title: 'Data modeling and ERD',
    summary: 'The three modeling stages and how to read crow’s foot and Barker notation.',
    blocks: [
      {
        kind: 'table',
        head: ['Stage', 'Main work'],
        rows: [
          ['Conceptual', 'Subject areas, core entities, relationships (high-level ERD)'],
          ['Logical', 'All attributes, identifiers, normalization'],
          ['Physical', 'Tables, columns, data types, indexes for a specific DBMS'],
        ],
      },
      {
        kind: 'terms',
        items: [
          { term: 'Entity', def: 'A thing, event or person the business keeps data about (customer, order).' },
          { term: 'Attribute', def: 'A property of an entity. One meaning, one value, clear standard name.' },
          { term: 'Identifier', def: 'Attribute(s) that uniquely identify each instance.' },
          { term: 'Relationship', def: 'How entities are connected (1:1, 1:N, M:N).' },
        ],
      },
      { kind: 'text', md: '**Crow’s foot**: `|` = one (mandatory), `O` = zero (optional), fork = many. Read the symbol **at the far end** of the line: "each A has (symbol near B) of B".' },
      { kind: 'text', md: '**Barker**: each half of the line belongs to the entity next to it. **Solid** = must, **dashed** = may, crow’s foot = one or more.' },
      { kind: 'trap', md: 'If the sentence says "X can exist without Y", the Y end must be **optional** (circle in crow’s foot, dashed in Barker).' },
    ],
  },
  {
    id: 'db-ops',
    title: 'Database architecture and operations',
    summary: 'ANSI-SPARC levels, transactions and locking, backup types, distributed DBs and who does what.',
    blocks: [
      {
        kind: 'table',
        head: ['ANSI-SPARC level', 'Describes'],
        rows: [
          ['External', 'What each user / app sees (views)'],
          ['Conceptual', 'The whole logical structure of the organization’s data'],
          ['Internal', 'Physical storage: record sizes, indexes, files'],
        ],
      },
      { kind: 'text', md: '**ACID**: Atomicity (all or nothing), Consistency (rules hold), Isolation (transactions don’t interfere), Durability (committed = permanent).' },
      { kind: 'text', md: '**Two-phase locking**: a growing phase (only lock) then a shrinking phase (only unlock). After the first unlock, no new locks.' },
      {
        kind: 'table',
        head: ['Backup', 'Copies'],
        rows: [
          ['Full', 'Everything'],
          ['Differential', 'Everything changed since the last FULL backup'],
          ['Incremental', 'Changes since the last backup of ANY kind'],
          ['Archive log', 'Every transaction, so you can recover to a precise point in time'],
          ['Cold / Hot', 'Taken with the DB shut down / while running'],
        ],
      },
      { kind: 'text', md: '**Distributed DB** goal = **transparency**: users don’t need to know location, replication or failures. Replication costs storage but raises availability.' },
      { kind: 'steps', title: 'Index design order', items: ['Collect current access paths', 'Choose candidate columns by value distribution', 'Decide access paths', 'Decide column combination and order', 'Test'] },
      {
        kind: 'terms',
        items: [
          { term: 'DBA', def: 'Runs the DB: physical design, backup, recovery, tuning, monitoring.' },
          { term: 'DA', def: 'Sets data policies and standards for the business.' },
          { term: 'Data standardization', def: 'Standard terms → standard domains → one data type each.' },
        ],
      },
    ],
  },
  {
    id: 'db-nosql',
    title: 'NoSQL, CAP and data warehouses',
    summary: 'How big-data databases trade consistency for scale, and how warehouses are modeled.',
    blocks: [
      { kind: 'text', md: '**NoSQL**: flexible schema, no foreign keys, scales out, follows **BASE** (Basically Available, Soft state, Eventually consistent) instead of strict ACID.' },
      {
        kind: 'table',
        head: ['NoSQL type', 'Examples'],
        rows: [
          ['Key-value', 'Redis, DynamoDB'],
          ['Document', 'MongoDB, CouchDB'],
          ['Column-family', 'Cassandra, HBase, BigTable'],
          ['Graph', 'Neo4j'],
        ],
      },
      {
        kind: 'table',
        head: ['CAP pair', 'Gives up', 'Examples'],
        rows: [
          ['C + A', 'Partition tolerance', 'Single-site RDBMS'],
          ['C + P', 'Availability', 'MongoDB, HBase, BigTable'],
          ['A + P', 'Consistency', 'Cassandra, Dynamo'],
        ],
      },
      { kind: 'tip', md: 'CAP: you can only pick **two**. Any option saying one system satisfies all pairs is false.' },
      { kind: 'text', md: '**Data warehouse**: a fact table (numbers) + dimension tables (descriptions). **Star schema** = denormalized, fast, more space. **Snowflake** = normalized dimensions in hierarchies.' },
      { kind: 'text', md: '**Column-oriented DB**: great for analyzing or updating one column across many rows, weak at inserting whole rows.' },
      { kind: 'text', md: '**ORDB**: relational + objects (nested tables, inheritance, LOBs, references). **LOB**: BLOB (binary), CLOB (text), BFILE (pointer to an OS file).' },
    ],
  },
  {
    id: 'db-ml',
    title: 'Machine learning and data mining',
    summary: 'Supervised vs unsupervised vs reinforcement, and the common algorithms.',
    blocks: [
      {
        kind: 'table',
        head: ['Type', 'Learns from', 'Algorithms'],
        rows: [
          ['Supervised', 'Labeled data (right answers)', 'Decision tree, KNN, neural network, regression, SVM'],
          ['Unsupervised', 'Unlabeled data', 'K-means clustering, association rules'],
          ['Reinforcement', 'Rewards from an environment', 'AlphaGo, robots, self-driving'],
          ['Semi-supervised', 'A little labeled + lots unlabeled', '—'],
        ],
      },
      { kind: 'tip', md: '"Groups similar data" = clustering = **unsupervised**. "Classifies into known categories" = **supervised**. "Reward" = **reinforcement**.' },
      {
        kind: 'terms',
        items: [
          { term: 'Decision tree', def: 'A flowchart of yes/no questions ending in a class.' },
          { term: 'KNN', def: 'Classify by the k nearest labeled neighbors.' },
          { term: 'K-means', def: 'Split unlabeled data into k clusters around centers.' },
          { term: 'CNN', def: 'Neural network for images.' },
        ],
      },
    ],
  },
];

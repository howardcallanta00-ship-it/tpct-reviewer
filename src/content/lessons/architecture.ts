import type { Lesson } from '../../types';

export const architectureLessons: Lesson[] = [
  {
    id: 'arch-net',
    title: 'Networking and protocols',
    summary: 'The biggest Architecture topic: TCP vs UDP, subnetting, error control and common protocols.',
    blocks: [
      {
        kind: 'table',
        head: ['', 'TCP', 'UDP'],
        rows: [
          ['Connection', 'Connection-oriented (3-way handshake)', 'Connectionless'],
          ['Reliability', 'ACKs, retransmit, in-order', 'None'],
          ['Flow / congestion control', 'Yes (sliding window, slow start)', 'No'],
          ['Used for', 'Web, email, files', 'Streaming, VoIP, DNS, games'],
        ],
      },
      {
        kind: 'terms',
        items: [
          { term: 'Slow start', def: 'Window starts small and DOUBLES every round trip (exponential).' },
          { term: 'Congestion avoidance', def: 'After the threshold, grow by 1 per round trip (linear).' },
          { term: 'Fast retransmit', def: '3 duplicate ACKs → resend now, no waiting for timeout.' },
          { term: 'Fast recovery', def: 'After fast retransmit, continue with congestion avoidance (skip slow start).' },
        ],
      },
      { kind: 'formula', md: 'Subnetting a Class C: borrow **n** bits → **2ⁿ subnets**, each with **2^(8−n) − 2 hosts**.' },
      {
        kind: 'table',
        head: ['Mask', 'Borrowed bits', 'Subnets', 'Hosts each'],
        rows: [
          ['255.255.255.192 (/26)', '2', '4', '62'],
          ['255.255.255.224 (/27)', '3', '8', '30'],
          ['255.255.255.240 (/28)', '4', '16', '14'],
          ['255.255.255.248 (/29)', '5', '32', '6'],
        ],
      },
      { kind: 'tip', md: 'For subnet questions, check BOTH numbers: enough subnets AND enough hosts.' },
      {
        kind: 'terms',
        items: [
          { term: 'Parity check', def: 'One extra bit makes the count of 1s even/odd. Detects only.' },
          { term: 'CRC', def: 'Polynomial check. Detects burst errors.' },
          { term: 'Hamming code', def: 'Detects AND corrects single-bit errors.' },
          { term: 'FEC', def: 'Receiver fixes errors itself (no resend).' },
          { term: 'ARQ / BEC', def: 'Receiver asks for a resend: stop-and-wait, go-back-N, selective repeat.' },
        ],
      },
      {
        kind: 'table',
        head: ['Protocol', 'Job'],
        rows: [
          ['ARP', 'IP → MAC (`arp -s` sets a static entry)'],
          ['DNS', 'Name ↔ IP (one name can have many IPs)'],
          ['FTP', 'Files; control port 21 + data port 20; active/passive modes'],
          ['SMTP', 'Send email'],
          ['RTP / RTCP / RTSP', 'Media data / quality reports / play-pause control'],
          ['HTTP headers', 'Host, Accept, User-Agent, Referer (the page you came FROM)'],
        ],
      },
    ],
  },
  {
    id: 'arch-os',
    title: 'Operating systems and memory',
    summary: 'Paging vs segmentation, page replacement, thrashing and file systems.',
    blocks: [
      {
        kind: 'table',
        head: ['', 'Paging', 'Segmentation'],
        rows: [
          ['Block size', 'Fixed (pages / frames)', 'Variable (logical units)'],
          ['Fragmentation', 'Internal only', 'External'],
          ['Address', 'Page number + offset', 'Segment number + offset'],
          ['Translation', 'Page table', 'Segment table'],
        ],
      },
      { kind: 'text', md: 'The **MMU** (Memory Management Unit) is the hardware that translates virtual → physical addresses.' },
      {
        kind: 'table',
        head: ['Page replacement', 'Evicts'],
        rows: [
          ['FIFO', 'The page loaded earliest'],
          ['LRU', 'The page not USED for the longest time'],
          ['LFU', 'The page used the fewest times'],
          ['Optimal', 'The page not needed for the longest time in the future'],
        ],
      },
      { kind: 'tip', md: 'To tell FIFO from LRU in a table: find a page fault, then ask whether the evicted page was the oldest loaded (FIFO) or the longest unused (LRU).' },
      {
        kind: 'terms',
        items: [
          { term: 'Thrashing', def: 'Too many programs, too few pages each → constant swapping, CPU use collapses.' },
          { term: 'Working set', def: 'The pages a process actively needs. Keeping it in memory prevents thrashing.' },
          { term: 'Deadlock', def: 'Processes wait on each other forever.' },
          { term: 'Starvation', def: 'A process never gets a resource.' },
          { term: 'Convoy effect', def: 'Short jobs stuck behind a long one.' },
        ],
      },
      { kind: 'text', md: '**File systems**: FAT32 has a 4 GB file limit. exFAT handles huge files and works across Windows, macOS and Android. NTFS is Windows-native with journaling and permissions.' },
    ],
  },
  {
    id: 'arch-hw',
    title: 'Computer hardware and CPU',
    summary: 'Buses, memory types, pipelines and Flynn’s taxonomy.',
    blocks: [
      { kind: 'text', md: 'The **system bus** = **control bus** (signals) + **address bus** (where) + **data bus** (what).' },
      {
        kind: 'table',
        head: ['Memory', 'Key fact'],
        rows: [
          ['SRAM', 'Volatile, fast, no refresh, used for cache'],
          ['DRAM', 'Volatile, needs refresh, main memory'],
          ['MRAM', 'Magnetic tunnel junction, non-volatile'],
          ['PRAM', 'Phase change (amorphous ↔ crystalline)'],
          ['FRAM', 'Ferroelectric (polarization)'],
        ],
      },
      { kind: 'steps', title: '6-stage instruction pipeline', items: ['FI: fetch instruction', 'DI: decode instruction', 'CO: calculate operand address', 'FO: fetch operand', 'EI: execute instruction', 'WO: write operand'] },
      {
        kind: 'terms',
        items: [
          { term: 'Pipeline', def: 'Overlap stages like an assembly line.' },
          { term: 'Superscalar', def: 'Several pipelines in parallel.' },
          { term: 'Super-pipeline', def: 'Stages split into finer steps.' },
        ],
      },
      {
        kind: 'table',
        head: ['Flynn', 'Meaning', 'Example'],
        rows: [
          ['SISD', 'One instruction, one data', 'Old single-core CPU'],
          ['SIMD', 'One instruction, many data', 'GPU, vector processor'],
          ['MISD', 'Many instructions, one data', 'Rare'],
          ['MIMD', 'Many instructions, many data', 'Multi-core CPU, clusters'],
        ],
      },
      { kind: 'text', md: '**Open libraries**: OpenMP (shared-memory parallel C/C++/Fortran), OpenCL (GPU compute), OpenGL (graphics), OpenCV (computer vision).' },
    ],
  },
  {
    id: 'arch-infra',
    title: 'Web, cloud, storage and big data',
    summary: 'Web tiers, containers, deployment strategies, RAID, Hadoop and provisioning.',
    blocks: [
      { kind: 'text', md: '**Web tiers**: Browser → **Web server** (static files) → **WAS** (dynamic logic) → Database. A **CDN** caches static, shared files near users, not personal dynamic pages.' },
      {
        kind: 'table',
        head: ['Deployment', 'How'],
        rows: [
          ['Big bang', 'Replace everything at once'],
          ['Rolling', 'Replace instances one at a time (Kubernetes default)'],
          ['Blue-Green', 'Two full environments, switch all traffic at once'],
          ['Canary', 'Send a small % of users to the new version first'],
        ],
      },
      { kind: 'text', md: '**Containers** (Docker, Kubernetes, Swarm, Mesos) share the OS kernel. **Hypervisors** (Xen, VMware, KVM) run full virtual machines.' },
      {
        kind: 'table',
        head: ['RAID', 'Method', 'Min disks', 'Usable space'],
        rows: [
          ['0', 'Striping', '2', '100%, no redundancy'],
          ['1', 'Mirroring', '2', '50%'],
          ['5', 'Striping + distributed parity', '3', '(n − 1) disks'],
          ['6', 'Double parity', '4', '(n − 2) disks'],
          ['10', 'Mirror + stripe', '4', '50%'],
        ],
      },
      { kind: 'text', md: '**Hadoop** = **HDFS** (NameNode metadata + DataNodes, write-once / read-many) + **MapReduce** (map, shuffle, reduce, results back to HDFS).' },
      { kind: 'text', md: '**Thin provisioning** allocates space as it is used. **Thick provisioning** reserves it upfront (lazy or eager zeroed).' },
      { kind: 'text', md: '**Quantum**: qubit, superposition, entanglement. **Supremacy** = beating classical computers on some task.' },
      { kind: 'text', md: '**Redis** = in-memory key-value store (cache).' },
    ],
  },
];

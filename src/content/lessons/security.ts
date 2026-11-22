import type { Lesson } from '../../types';

export const securityLessons: Lesson[] = [
  {
    id: 'sec-crypto',
    title: 'Cryptography and digital signatures',
    summary: 'Symmetric vs public key, hashes, signatures and which key does what. Asked in almost every exam.',
    blocks: [
      {
        kind: 'table',
        head: ['', 'Symmetric', 'Public key (asymmetric)'],
        rows: [
          ['Keys', 'One shared key', 'Public + private key pair'],
          ['Speed', 'Fast', 'Slow'],
          ['Good for', 'Bulk data', 'Key exchange, signatures, talking to strangers'],
          ['Examples', 'AES, DES, SEED, ARIA', 'RSA, ECC, Diffie-Hellman'],
        ],
      },
      { kind: 'text', md: '**Hash** (SHA-256): one-way fingerprint, proves integrity. Passwords are stored as **salted hashes**, never with reversible encryption.' },
      { kind: 'text', md: '**Block cipher** (AES, DES) encrypts fixed blocks and needs a **mode** (ECB, CBC, CTR) for long data. **Stream cipher** encrypts bit by bit and is usually faster.' },
      {
        kind: 'steps',
        title: 'Digital signature',
        items: [
          'Sender hashes the message (message digest).',
          'Sender encrypts the digest with the SENDER’S PRIVATE key = signature.',
          'Receiver decrypts the signature with the SENDER’S PUBLIC key.',
          'Receiver hashes the message too. Same digest = authentic and unaltered.',
        ],
      },
      { kind: 'tip', md: 'Signature = **I**ntegrity, **A**uthentication, **N**on-repudiation. It does **not** give confidentiality. For secrecy, encrypt with the **receiver’s public** key.' },
      { kind: 'trap', md: '"Can we infer the document was not leaked?" No. Signing never hides the content.' },
      {
        kind: 'terms',
        items: [
          { term: 'Quantum cryptography', def: 'Uses no-cloning and measurement disturbance to detect eavesdropping on keys.' },
          { term: 'Steganography', def: 'Hides data inside other data, like an image.' },
          { term: 'Key management', def: 'Secure random generation, never plain-text storage, regular rotation, separation of duties.' },
        ],
      },
    ],
  },
  {
    id: 'sec-system',
    title: 'System and network security',
    summary: 'Linux permissions, Windows hardening, attacks, IDS, firewalls and Wi-Fi security.',
    blocks: [
      { kind: 'formula', md: 'Permission digit = r(4) + w(2) + x(1). `rw-r--r--` = 6-4-4 = **644**. `rwxr-xr-x` = **755**.' },
      {
        kind: 'terms',
        items: [
          { term: 'chmod', def: 'Change permissions now.' },
          { term: 'chown', def: 'Change the owner.' },
          { term: 'umask', def: 'Default permissions for files created from now on.' },
          { term: '/etc/hosts.allow / deny', def: 'TCP Wrappers: which HOSTS (IPs) may connect.' },
          { term: 'iptables', def: 'Linux firewall (not Windows).' },
        ],
      },
      { kind: 'text', md: '**Windows hardening**: remove Guest and unused accounts, block shared folders and remote registry, stop unneeded services (Telnet, anonymous FTP, SNMP).' },
      {
        kind: 'table',
        head: ['Attack', 'What it is'],
        rows: [
          ['Spoofing', 'Faking an identity (IP, MAC, email)'],
          ['Sniffing', 'Eavesdropping on traffic'],
          ['Smishing / Phishing', 'Tricking users by SMS / email'],
          ['DoS / DDoS', 'Flooding a service'],
          ['XSS', 'Script injected into a page, runs in other users’ browsers'],
          ['SQL injection', 'Malicious SQL through input fields'],
        ],
      },
      { kind: 'text', md: '**IDS**: misuse / signature / rule based = known attacks only. **Anomaly / behavior based** (statistics, ML) = can catch unknown attacks.' },
      { kind: 'text', md: '**Wi-Fi**: WEP is broken. **802.11i / WPA2** = 802.1X authentication + 4-way handshake + CCMP (AES).' },
      { kind: 'text', md: '**SSL/TLS** runs above TCP (not the network layer). HTTPS = HTTP over SSL/TLS. Network-layer security is **IPsec**.' },
      { kind: 'tip', md: 'Firewall forms: source = who starts the connection, destination + port = the server being reached.' },
    ],
  },
  {
    id: 'sec-access',
    title: 'Access control and authentication',
    summary: 'DAC, MAC and RBAC, plus how users prove who they are.',
    blocks: [
      {
        kind: 'table',
        head: ['Model', 'Who decides', 'Clue'],
        rows: [
          ['DAC (Discretionary)', 'The data owner, per user', 'Access control matrix with user names, ACLs'],
          ['MAC (Mandatory)', 'The system, by labels and clearance', 'Top secret / secret, military'],
          ['RBAC (Role-Based)', 'Rights attached to roles', 'Job functions, DBA / developer, staff change often'],
        ],
      },
      { kind: 'tip', md: 'Rows are **people** → DAC. Rows are **roles** → RBAC. **Labels** and levels → MAC.' },
      {
        kind: 'terms',
        items: [
          { term: 'Authentication', def: 'Prove who you are (password, OTP, biometrics, certificates).' },
          { term: 'Authorization', def: 'What you are allowed to do.' },
          { term: 'OAuth', def: '"Sign in with Google": an existing account grants an app limited access.' },
          { term: 'OTP', def: 'One-time password, often a second factor.' },
          { term: 'PKI', def: 'Certificates and CAs that vouch for public keys.' },
          { term: 'Least privilege', def: 'Give only the rights needed for the job.' },
        ],
      },
      { kind: 'text', md: 'Database access control needs: identify sensitive data and who may see it, authenticate users, define access methods and times. Redundancy (duplexing) is availability, not access control.' },
    ],
  },
  {
    id: 'sec-app',
    title: 'Application and cloud security',
    summary: 'Secure SDLC phases, web weaknesses, mobile app rules, cloud threats and Log4Shell.',
    blocks: [
      {
        kind: 'table',
        head: ['Secure SDLC phase', 'Security activity'],
        rows: [
          ['Requirements', 'Identify security requirements'],
          ['Design', 'Threat modeling, design changes to remove threats'],
          ['Implementation', 'Secure coding, source code review / static analysis'],
          ['Testing', 'Dynamic analysis, penetration testing'],
          ['Maintenance', 'Patching, monitoring'],
        ],
      },
      { kind: 'text', md: '**Mobile apps**: only needed functions, encrypt stored and transmitted data, obfuscate code, and **refuse to run on rooted / jailbroken** devices.' },
      {
        kind: 'table',
        head: ['Cloud threat', 'Meaning'],
        rows: [
          ['Virtualization vulnerability', 'Hypervisor or hardware flaw affects every VM'],
          ['Insecure API', 'Badly protected management interfaces'],
          ['Insufficient key management', 'Encryption keys poorly protected'],
          ['Weak identity and access management', 'Poor login and permission controls'],
        ],
      },
      { kind: 'text', md: '**Log4Shell** (Log4j, CVSS 10): a logged string like `${jndi:ldap://...}` makes Log4j load remote code. Fix: upgrade to a patched version for your Java version.' },
      { kind: 'tip', md: 'XSS runs in the **victim’s browser**. SQL injection runs in the **database**. A web shell runs on the **server**.' },
    ],
  },
  {
    id: 'sec-manage',
    title: 'Security management and privacy',
    summary: 'The CIA triad, certifications and de-identification.',
    blocks: [
      {
        kind: 'terms',
        items: [
          { term: 'Confidentiality', def: 'Only authorized people can read the data.' },
          { term: 'Integrity', def: 'Data is not altered without permission.' },
          { term: 'Availability', def: 'The service works when needed (redundancy, failover).' },
        ],
      },
      { kind: 'text', md: '**ISMS**: certification of information security management, valid **3 years** with yearly checks. No certification guarantees 100% safety. **ISMS-P** = ISMS + personal information protection.' },
      {
        kind: 'terms',
        items: [
          { term: 'De-identification', def: 'Remove or mask identifiers (pseudonymization, generalization, masking).' },
          { term: 'Re-identification', def: 'Identifying a person again by combining de-identified data with other data.' },
          { term: 'Breach response', def: 'Notify affected people quickly with details. Report to authorities above a size threshold.' },
        ],
      },
    ],
  },
];

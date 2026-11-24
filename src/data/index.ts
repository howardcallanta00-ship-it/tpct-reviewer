import type { DomainId, DomainInfo, Lesson, Question, QuestionNotes, RawQuestion } from '../types';
import rawSoftware from './raw/software.json';
import rawData from './raw/data.json';
import rawArchitecture from './raw/architecture.json';
import rawSecurity from './raw/security.json';
import rawBusiness from './raw/business.json';
import rawManagement from './raw/management.json';
import { softwareNotes } from '../content/notes/software';
import { dataNotes } from '../content/notes/data';
import { architectureNotes } from '../content/notes/architecture';
import { securityNotes, securityExtra } from '../content/notes/security';
import { businessNotes } from '../content/notes/business';
import { managementNotes } from '../content/notes/management';
import { softwareLessons } from '../content/lessons/software';
import { dataLessons } from '../content/lessons/data';
import { architectureLessons } from '../content/lessons/architecture';
import { securityLessons } from '../content/lessons/security';
import { businessLessons } from '../content/lessons/business';
import { managementLessons } from '../content/lessons/management';
import { fixTypos } from './typos';

export const ICONS = {
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  cpu: 'M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  biz: 'M3 8h18v12H3zM8 8V5h8v3M3 13h18',
  pm: 'M4 5h16v15H4zM4 10h16M8 3v4M16 3v4M8 14h3M8 17h6',
};

export const DOMAINS: DomainInfo[] = [
  { id: 'software', name: 'Software', short: 'Software', color: '#7C9CFF', icon: ICONS.code, blurb: 'Design, testing, algorithms and code reading' },
  { id: 'data', name: 'Data', short: 'Data', color: '#3DDBB4', icon: ICONS.db, blurb: 'Modeling, SQL, normalization, NoSQL and ML' },
  { id: 'architecture', name: 'System Architecture', short: 'Architecture', color: '#FFB547', icon: ICONS.cpu, blurb: 'OS, networking, hardware and infrastructure' },
  { id: 'security', name: 'Information Security', short: 'Security', color: '#FF7A6B', icon: ICONS.shield, blurb: 'Crypto, access control, attacks and secure SDLC' },
  { id: 'business', name: 'IT Business and Ethics', short: 'Business', color: '#C792EA', icon: ICONS.biz, blurb: 'Strategy, enterprise systems, IP law and ethics' },
  { id: 'management', name: 'Communication and Project Management', short: 'Project mgmt', color: '#FF8CC6', icon: ICONS.pm, blurb: 'Scope, schedule, quality, risk and communication' },
];

export const domainById = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<DomainId, DomainInfo>;

const RAW: Record<DomainId, RawQuestion[]> = {
  software: rawSoftware as RawQuestion[],
  data: rawData as RawQuestion[],
  architecture: rawArchitecture as RawQuestion[],
  security: [...(rawSecurity as RawQuestion[]), ...securityExtra],
  business: rawBusiness as RawQuestion[],
  management: rawManagement as RawQuestion[],
};

const NOTES: Record<DomainId, Record<string, QuestionNotes>> = {
  software: softwareNotes,
  data: dataNotes,
  architecture: architectureNotes,
  security: securityNotes,
  business: businessNotes,
  management: managementNotes,
};

export const LESSONS: Record<DomainId, Lesson[]> = {
  software: softwareLessons,
  data: dataLessons,
  architecture: architectureLessons,
  security: securityLessons,
  business: businessLessons,
  management: managementLessons,
};

function build(domain: DomainId, raw: RawQuestion, num: number): Question {
  const notes = NOTES[domain][raw.id];
  if (!notes) throw new Error('Missing notes for ' + raw.id);
  const fix = notes.fix ?? {};
  let context = raw.context.map((c, i) => (fix.context?.[i] !== undefined ? { ...c, text: fix.context[i] } : c));
  if (fix.dropContext) context = context.filter((_, i) => !fix.dropContext!.includes(i));
  let options = raw.options.map((o, i) => (fix.options?.[i] !== undefined ? { ...o, text: fix.options[i] } : o));
  if (fix.dropOptions) options = options.filter((_, i) => !fix.dropOptions!.includes(i));
  let key = fix.key ?? raw.keyIndex;
  let keySource: Question['keySource'] = 'reviewer';
  if (key < 0) {
    if (!notes.m) throw new Error('No key and no answer for ' + raw.id);
    key = notes.m.answer;
    keySource = 'claude';
  }
  context = context.map((c) => ('text' in c && c.text ? { ...c, text: fixTypos(c.text) } : c));
  options = options.map((o) => (o.text ? { ...o, text: fixTypos(o.text) } : o));
  return { id: raw.id, domain, num, stem: fixTypos(fix.stem ?? raw.stem), context, options, key, keySource, notes };
}

export const QUESTIONS: Question[] = DOMAINS.flatMap((d) => RAW[d.id].map((r, i) => build(d.id, r, i + 1)));
export const questionById = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<string, Question>;

export const ALL_LESSONS: (Lesson & { domain: DomainId; questionIds: string[] })[] = DOMAINS.flatMap((d) =>
  LESSONS[d.id].map((l) => ({ ...l, domain: d.id, questionIds: QUESTIONS.filter((q) => q.notes.t === l.id).map((q) => q.id) })),
);
export const lessonById = Object.fromEntries(ALL_LESSONS.map((l) => [l.id, l]));

/** Lessons for a domain, most-tested first. */
export function lessonsFor(domain: DomainId) {
  return ALL_LESSONS.filter((l) => l.domain === domain).sort((a, b) => b.questionIds.length - a.questionIds.length);
}

export const KEY_CHECKS = QUESTIONS.filter((q) => q.notes.k || q.keySource === 'claude');

// Every question must point at a real lesson.
for (const q of QUESTIONS) if (!lessonById[q.notes.t]) throw new Error(`Unknown topic ${q.notes.t} on ${q.id}`);

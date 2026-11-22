export type DomainId = 'software' | 'data' | 'architecture' | 'security' | 'business' | 'management';

export interface RawContext {
  type: 'p' | 'li' | 'img';
  text?: string;
  src?: string;
}

export interface RawOption {
  text: string;
  img: string | null;
}

export interface RawQuestion {
  id: string;
  stem: string;
  context: RawContext[];
  options: RawOption[];
  keyIndex: number;
}

/** Hand-written study notes for one question. */
export interface QuestionNotes {
  /** Topic id (see lessons). */
  t: string;
  /** Explanation of the idea behind the answer. Supports **bold** and `code`. */
  e: string;
  /** One short line per option: why it is right or wrong. */
  w: string[];
  /** Memory hook. */
  r?: string;
  /** The reviewer's key looks wrong: the option that is more likely right, and why. */
  k?: { likely: number; note: string };
  /** The reviewer marks no answer: my answer, and why. */
  m?: { answer: number; note: string };
  /** Text fixes for extraction damage (stem or option text). */
  fix?: {
    stem?: string;
    options?: Record<number, string>;
    context?: Record<number, string>;
    dropContext?: number[];
    dropOptions?: number[];
    /** Reviewer key written as a letter ("- D") instead of red text. */
    key?: number;
  };
}

export interface Question {
  id: string;
  domain: DomainId;
  num: number;
  stem: string;
  context: RawContext[];
  options: RawOption[];
  /** The answer that is scored: the reviewer's red answer, or mine when none is marked. */
  key: number;
  keySource: 'reviewer' | 'claude';
  notes: QuestionNotes;
}

export type LessonBlock =
  | { kind: 'text'; md: string }
  | { kind: 'terms'; items: { term: string; def: string; cue?: string }[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'steps'; title?: string; items: string[] }
  | { kind: 'tip'; md: string }
  | { kind: 'trap'; md: string }
  | { kind: 'formula'; md: string };

export interface Lesson {
  id: string;
  title: string;
  /** One-sentence "why this matters". */
  summary: string;
  blocks: LessonBlock[];
}

export interface DomainInfo {
  id: DomainId;
  name: string;
  short: string;
  color: string;
  icon: string;
  blurb: string;
}

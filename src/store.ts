import { useSyncExternalStore } from 'react';
import type { DomainId, Question } from './types';
import { ALL_LESSONS, DOMAINS, QUESTIONS, lessonsFor } from './data';

export type Confidence = 'guessed' | 'unsure' | 'knew';

export interface QState {
  attempts: number;
  correct: number;
  lastCorrect: boolean;
  /** Spaced-repetition box 0..5. 0 = needs work. */
  box: number;
  due: number;
  lastAt: number;
  /** The latest correct answer was marked "Guessed". */
  guessed?: boolean;
}

export interface Progress {
  v: 1;
  q: Record<string, QState>;
  days: Record<string, number>;
  saved: string[];
  lessons: Record<string, 'got' | 'again'>;
  xp: number;
  examDate: string | null;
  shuffle: boolean;
  bestStreak: number;
  exams: { at: number; total: number; correct: number; minutes: number }[];
  /** Interface zoom, 1 = default. */
  uiScale: number;
}

export const UI_SCALES = [
  { value: 0.8, label: 'Smallest' },
  { value: 0.88, label: 'Small' },
  { value: 0.94, label: 'Compact' },
  { value: 1, label: 'Default' },
  { value: 1.08, label: 'Large' },
];

/** Scales the whole interface. CSS zoom keeps layout, fixed bars and tap targets in proportion. */
export function applyUiScale(scale: number) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('zoom', scale === 1 ? '' : String(scale));
}

const KEY = 'tpct-reviewer-progress';
const DAY = 86_400_000;

const empty = (): Progress => ({ v: 1, q: {}, days: {}, saved: [], lessons: {}, xp: 0, examDate: null, shuffle: true, bestStreak: 0, exams: [], uiScale: 1 });

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...empty(), ...JSON.parse(raw) };
  } catch {
    /* private mode or corrupt data: start fresh */
  }
  return empty();
}

let state: Progress = load();
applyUiScale(state.uiScale);
const listeners = new Set<() => void>();

function commit(next: Progress) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep in memory */
  }
  listeners.forEach((l) => l());
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}

export const today = (t = Date.now()) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function bumpDay(p: Progress): Progress {
  const k = today();
  const days = { ...p.days, [k]: (p.days[k] ?? 0) + 1 };
  const s = streakOf(days);
  return { ...p, days, bestStreak: Math.max(p.bestStreak, s) };
}

/** Record an answer. Wrong answers reset the box; confidence decides the next review. */
export function recordAnswer(id: string, correct: boolean, confidence: Confidence | null) {
  const prev = state.q[id] ?? { attempts: 0, correct: 0, lastCorrect: false, box: 0, due: 0, lastAt: 0 };
  const now = Date.now();
  let box = prev.box;
  let due = now;
  if (!correct) {
    box = 0;
    due = now;
  } else if (confidence === 'guessed') {
    box = Math.max(1, Math.min(prev.box, 1));
    due = now + DAY;
  } else if (confidence === 'knew') {
    box = Math.min(5, prev.box + 2);
    due = now + 14 * DAY;
  } else {
    box = Math.min(5, prev.box + 1);
    due = now + 3 * DAY;
  }
  const q = { ...state.q, [id]: { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0), lastCorrect: correct, box, due, lastAt: now, guessed: correct && confidence === 'guessed' } };
  commit(bumpDay({ ...state, q, xp: state.xp + (correct ? 10 : 2) }));
}

/** Update only the confidence of an answer already recorded (used after reveal). */
export function setConfidence(id: string, confidence: Confidence) {
  const prev = state.q[id];
  if (!prev || !prev.lastCorrect) return;
  const now = Date.now();
  const base = Math.max(0, prev.box - 1);
  const box = confidence === 'guessed' ? 1 : confidence === 'knew' ? Math.min(5, base + 2) : Math.min(5, base + 1);
  const due = now + (confidence === 'guessed' ? DAY : confidence === 'knew' ? 14 * DAY : 3 * DAY);
  commit({ ...state, q: { ...state.q, [id]: { ...prev, box, due, guessed: confidence === 'guessed' } } });
}

export function toggleSaved(id: string) {
  const saved = state.saved.includes(id) ? state.saved.filter((x) => x !== id) : [...state.saved, id];
  commit({ ...state, saved });
}

export function markLesson(id: string, result: 'got' | 'again') {
  commit(bumpDay({ ...state, lessons: { ...state.lessons, [id]: result }, xp: state.xp + (result === 'got' ? 15 : 5) }));
}

export function setExamDate(date: string | null) {
  commit({ ...state, examDate: date });
}

export function setShuffle(shuffle: boolean) {
  commit({ ...state, shuffle });
}

export function setUiScale(uiScale: number) {
  applyUiScale(uiScale);
  commit({ ...state, uiScale });
}

export function recordExam(total: number, correct: number, minutes: number) {
  commit({ ...state, exams: [...state.exams, { at: Date.now(), total, correct, minutes }].slice(-20) });
}

export function exportProgress() {
  return JSON.stringify(state, null, 1);
}

export function importProgress(json: string) {
  const data = JSON.parse(json);
  if (!data || data.v !== 1 || typeof data.q !== 'object') throw new Error('This file is not a TOPCIT Sprint progress file.');
  commit({ ...empty(), ...data });
  applyUiScale(state.uiScale);
}

export function resetProgress() {
  // Keep display preferences; reset study data only.
  commit({ ...empty(), uiScale: state.uiScale, shuffle: state.shuffle });
}

// ---------- Derived numbers ----------

export function streakOf(days: Record<string, number>) {
  let n = 0;
  let t = Date.now();
  if (!days[today(t)]) t -= DAY; // today not studied yet: streak still counts up to yesterday
  while (days[today(t)]) {
    n++;
    t -= DAY;
  }
  return n;
}

/**
 * 0..1 mastery for one question: 1 if the latest answer was right, 0.5 if it was right but marked "Guessed",
 * 0 if wrong or unseen. The review schedule (box) is separate and does not affect this number.
 */
export function mastery(p: Progress, id: string) {
  const s = p.q[id];
  if (!s || !s.lastCorrect) return 0;
  // Older saves have no `guessed` flag: a "Guessed" rating set the next review one day out.
  const guessed = s.guessed ?? (s.box === 1 && s.due - s.lastAt < 2 * DAY);
  return guessed ? 0.5 : 1;
}

/** Next readiness milestone above the current value. */
export function nextMilestone(value: number) {
  return [0.1, 0.25, 0.5, 0.7, 0.85, 1].find((m) => m > value + 0.0001) ?? 1;
}

export function domainMastery(p: Progress, domain: DomainId) {
  const qs = QUESTIONS.filter((q) => q.domain === domain);
  return qs.reduce((a, q) => a + mastery(p, q.id), 0) / qs.length;
}

export function readiness(p: Progress) {
  return QUESTIONS.reduce((a, q) => a + mastery(p, q.id), 0) / QUESTIONS.length;
}

/** Correct answers needed to reach a target readiness (each new correct answer adds one question's worth). */
export function answersToTarget(p: Progress, target: number) {
  const gap = target * QUESTIONS.length - readiness(p) * QUESTIONS.length;
  return Math.max(0, Math.ceil(gap - 0.0001));
}

export function lessonAccuracy(p: Progress, lessonId: string) {
  const l = ALL_LESSONS.find((x) => x.id === lessonId);
  if (!l || !l.questionIds.length) return null;
  const tried = l.questionIds.filter((id) => p.q[id]);
  if (!tried.length) return null;
  return tried.filter((id) => p.q[id].lastCorrect).length / tried.length;
}

/** Topics with the lowest accuracy among those attempted. */
export function weakTopics(p: Progress, n = 4) {
  return ALL_LESSONS.map((l) => ({ l, acc: lessonAccuracy(p, l.id) }))
    .filter((x): x is { l: (typeof ALL_LESSONS)[number]; acc: number } => x.acc !== null && x.acc < 1)
    .sort((a, b) => a.acc - b.acc)
    .slice(0, n);
}

export function isDue(p: Progress, q: Question, now = Date.now()) {
  const s = p.q[q.id];
  return !!s && s.due <= now;
}

export function mistakes(p: Progress) {
  return QUESTIONS.filter((q) => p.q[q.id] && !p.q[q.id].lastCorrect);
}

/** The weakest domain, preferring ones with unseen questions. */
export function weakestDomain(p: Progress): DomainId {
  return [...DOMAINS].sort((a, b) => domainMastery(p, a.id) - domainMastery(p, b.id))[0].id;
}

/** Tonight's plan: a lesson, a question set and the mistakes deck. */
export function tonightsPlan(p: Progress) {
  const dom = weakestDomain(p);
  const weak = weakTopics(p, 1)[0]?.l ?? lessonsFor(dom).find((l) => !p.lessons[l.id]) ?? lessonsFor(dom)[0];
  const m = mistakes(p).length;
  const todayKey = today();
  const todayCount = p.days[todayKey] ?? 0;
  return { lesson: weak, domain: dom, mistakes: m, todayCount };
}

export function lastNDays(p: Progress, n: number) {
  const out: { key: string; label: string; count: number; isToday: boolean }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const t = Date.now() - i * DAY;
    const k = today(t);
    out.push({ key: k, label: new Date(t).toLocaleDateString('en', { weekday: 'short' }), count: p.days[k] ?? 0, isToday: i === 0 });
  }
  return out;
}

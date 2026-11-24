import type { QuestionNotes } from '../types';

/**
 * In "Which is NOT correct?" questions the word "correct" is ambiguous: it can mean
 * "a true statement" (not the answer) or "the right answer" (a false statement).
 * These rewrites make the notes say "true / good practice" for statements that are fine,
 * and "the answer" for the option to pick. They never change which option is the answer.
 */
const NEGATIVE = /\b(NOT|INCORRECT|FALSE|EXCEPT|incorrect|false|wrong|not correct|not true|not appropriate|inappropriate)\b/;

const RULES: [RegExp, string][] = [
  [/^Correct per your key\.\s*/, 'Your key’s answer. '],
  [/^Correct\. (False|Wrong[^:.]*):/, 'This is the answer. $1:'],
  [/^Correct\.\s*/, 'This is the answer: '],
  [/^Correct practice/, 'Good practice'],
  [/^Correct notation:/, 'Valid notation:'],
  [/^Correct definition/, 'True definition'],
  [/^Correct output:/, 'True output:'],
  [/^Correct pair:/, 'Valid pair:'],
  [/\bthe correct (definition|description)\b/g, 'a true $1'],
  [/\ba correct practice\b/g, 'a good practice'],
];

const apply = (t: string) => RULES.reduce((s, [re, to]) => s.replace(re, to), t);

export function clarifyNotes(stem: string, notes: QuestionNotes): QuestionNotes {
  if (!NEGATIVE.test(stem)) return notes;
  return {
    ...notes,
    e: apply(notes.e),
    r: notes.r && apply(notes.r),
    w: notes.w.map(apply),
    k: notes.k && { ...notes.k, note: apply(notes.k.note) },
    m: notes.m && { ...notes.m, note: apply(notes.m.note) },
  };
}

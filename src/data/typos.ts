/**
 * Spelling and scanning (OCR) slips in the reviewer text, fixed at load time.
 * Each fix only corrects how a word is written. None of them changes a question's meaning or its answer.
 * Applied to stems, context lines and option text. Kept separate so re-running the extractor keeps them.
 */
export const TYPOS: [RegExp, string][] = [
  [/\bNOI\b/g, 'NOT'],
  [/\bINCORRECI\b/g, 'INCORRECT'],
  [/\bcorect\b/g, 'correct'],
  [/\bcornect\b/g, 'correct'],
  [/\bartiele\b/g, 'article'],
  [/ '000\* that /g, ' that '],
  [/\bCoose\b/g, 'Choose'],
  [/\bSuoer scalar\b/g, 'Super scalar'],
  [/\bEsample\b/g, 'example'],
  [/\bStragety\b/g, 'Strategy'],
  [/\bDijsktra\b/g, 'Dijkstra'],
  [/\bKruscal\b/g, 'Kruskal'],
  [/\bAlfero\b/g, 'Affero'],
  [/\blaaS\b/g, 'IaaS'],
  [/\bSaas\b/g, 'SaaS'],
  [/\bloT\b/g, 'IoT'],
  [/\bAl\b/g, 'AI'],
  [/\bUL\/UX\b/g, 'UI/UX'],
  [/\bUI\?UX intuitive and consistent\.\*/g, 'UI/UX intuitive and consistent."'],
  [/\bReal0time\b/g, 'Real-time'],
  [/, \(Os or older\)/g, ', 70s or older)'],
  [/\bCustumerNumber\b/g, 'CustomerNumber'],
  [/ON \|OrderCustomerNumber =/g, 'ON Customer.CustomerNumber ='],
];

export function fixTypos(text: string): string;
export function fixTypos(text: string | undefined): string | undefined;
export function fixTypos(text: string | undefined) {
  if (!text) return text;
  return TYPOS.reduce((t, [re, to]) => t.replace(re, to), text);
}

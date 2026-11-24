import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Question } from '../types';
import { domainById, lessonById } from '../data';
import { Icon, Md, PATHS, ZoomImg, ink } from './ui';
import { toggleSaved, useProgress } from '../store';
import { Burst, haptic } from './fx';

const LETTERS = 'abcdefgh';

/** Options keep their original order when they refer to each other or are images. */
export function canShuffle(q: Question) {
  if (q.options.some((o) => o.img)) return false;
  const text = q.options.map((o) => o.text).join(' ');
  if (/\([a-e]\)|all of the above|none of the above|→|->|\(1\)/i.test(text)) return false;
  return true;
}

export function Context({ q }: { q: Question }) {
  const lettered = /\([a-e]\)|ⓐ|\(a\)/i.test(q.stem + q.options.map((o) => o.text).join(' '));
  const blocks: JSX.Element[] = [];
  let list: { text: string }[] = [];
  let liIndex = 0;
  const flush = () => {
    if (!list.length) return;
    const items = list;
    blocks.push(
      <ul key={'ul' + blocks.length}>
        {items.map((it, i) => (
          <li key={i}>
            <b>{lettered ? `(${LETTERS[liIndex - items.length + i]})` : '•'}</b>
            <span>{it.text}</span>
          </li>
        ))}
      </ul>,
    );
    list = [];
  };
  q.context.forEach((c, i) => {
    if (c.type === 'li' && c.text) {
      list.push({ text: c.text });
      liIndex++;
      return;
    }
    flush();
    if (c.type === 'img' && c.src) blocks.push(<ZoomImg key={i} src={c.src} alt={`Figure for question ${q.num}`} />);
    else if (c.text && c.text.trim() !== '\\') blocks.push(<p key={i}>{c.text}</p>);
  });
  flush();
  if (!blocks.length) return null;
  return <div className="q-ctx">{blocks}</div>;
}

interface Props {
  q: Question;
  order: number[];
  picked: number | null;
  revealed: boolean;
  onPick?: (originalIndex: number) => void;
  index?: number;
  total?: number;
  /** Play answer animations (off for passive review lists). */
  fx?: boolean;
}

export function QuestionView({ q, order, picked, revealed, onPick, index, total, fx = false }: Props) {
  const p = useProgress();
  const d = domainById[q.domain];
  const saved = p.saved.includes(q.id);
  const likely = q.notes.k && q.notes.k.likely >= 0 && q.notes.k.likely !== q.key ? q.notes.k.likely : -1;
  const lesson = lessonById[q.notes.t];

  return (
    <div className="card" style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 20, background: 'radial-gradient(80% 60% at 100% 0%, var(--q-glow) 0%, var(--surface) 60%)' }}>
      <div className="row wrap between">
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="chip" style={{ background: d.color + '22', color: ink(d.color) }}>{d.short}</span>
          {lesson && <span className="chip plain">{lesson.title}</span>}
          {revealed && q.notes.k && <span className="chip warn">Key check</span>}
          {revealed && q.keySource === 'claude' && <span className="chip warn">No key in reviewer</span>}
        </div>
        <div className="row" style={{ gap: 8 }}>
          {index !== undefined && total !== undefined && <span className="sub n">{index + 1} / {total}</span>}
          <button type="button" className={'icon-btn' + (saved ? ' on' : '')} onClick={() => { toggleSaved(q.id); haptic('tap'); }} aria-label={saved ? 'Remove from saved' : 'Save question'} title="Save (B)">
            <Icon d={PATHS.bookmark} size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      <h1 className="q-stem">{q.stem}</h1>
      <Context q={q} />
      <div className="opts" role="list">
        {order.map((oi, pos) => {
          const o = q.options[oi];
          let cls = 'opt';
          let tag = '';
          if (revealed) {
            if (oi === q.key) {
              cls += ' key';
              tag = q.keySource === 'claude' ? 'Answer' : picked === oi ? 'Correct per your key' : 'Your key’s answer';
            } else if (oi === likely) {
              cls += ' likely';
              tag = oi === picked ? 'Your answer, likely correct' : 'Likely correct';
            } else if (oi === picked) {
              cls += ' wrong';
              tag = 'Your answer';
            } else cls += ' dim';
          } else if (picked === oi) cls += ' picked';
          const animate = fx && revealed && picked !== null && picked >= 0;
          if (animate && (oi === q.key || oi === picked || oi === likely)) cls += ' fx';
          const won = animate && oi === q.key && picked === q.key;
          return (
            <button key={oi} type="button" role="listitem" className={cls} disabled={revealed || !onPick} onClick={() => onPick?.(oi)}>
              {won && <Burst />}
              {won && <span className="xp-float">+10 XP</span>}
              <span className="k">
                {revealed && oi === q.key ? (
                  <svg className={animate ? 'check-draw' : ''} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-label={`Option ${pos + 1}`}><path d="M5 12l5 5L20 7" /></svg>
                ) : revealed && oi === picked && oi !== likely ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" aria-label={`Option ${pos + 1}`}><path d="M6 6l12 12M18 6 6 18" /></svg>
                ) : (
                  pos + 1
                )}
              </span>
              <span className="grow" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {o.text && <span>{o.text}</span>}
                {o.img && <img src={import.meta.env.BASE_URL + o.img} alt={`Option ${pos + 1}`} />}
              </span>
              {tag && <span className="tag">{tag}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Notes are written against the reviewer's original option numbers. When options are shuffled,
 * rewrite "option 3" / "Options 2 and 3" to the numbers shown on screen.
 */
export function remapOptionRefs(text: string, order?: number[]) {
  if (!order) return text;
  const posOf = new Map(order.map((oi, pos) => [oi, pos]));
  const fix = (d: string) => {
    const pos = posOf.get(Number(d) - 1);
    return pos === undefined ? d : String(pos + 1);
  };
  return text.replace(/\b([Oo]ptions?) (\d)\b((?:\s*(?:,|and|or)\s*\d\b)*)/g, (_m, word: string, first: string, rest: string) =>
    `${word} ${fix(first)}${rest.replace(/\d/g, fix)}`,
  );
}

export function KeyCheck({ q, order }: { q: Question; order?: number[] }) {
  const fx = (t: string) => remapOptionRefs(t, order);
  if (q.keySource === 'claude' && q.notes.m) {
    return (
      <div className="card warn row" style={{ alignItems: 'flex-start', gap: 16 }}>
        <span className="tile" style={{ width: 42, height: 42, background: 'var(--warn)' }}><Icon d={PATHS.alert} stroke="#241D12" /></span>
        <div className="stack" style={{ gap: 8 }}>
          <h2 className="d" style={{ fontSize: 19, color: 'var(--warn-text)' }}>Your reviewer has no answer for this one</h2>
          <p style={{ margin: 0, color: 'var(--warn-body)' }}><Md text={fx(q.notes.m.note)} /></p>
        </div>
      </div>
    );
  }
  if (!q.notes.k) return null;
  return (
    <div className="card warn row" style={{ alignItems: 'flex-start', gap: 16 }}>
      <span className="tile" style={{ width: 42, height: 42, background: 'var(--warn)' }}><Icon d={PATHS.alert} stroke="#241D12" /></span>
      <div className="stack" style={{ gap: 8 }}>
        <h2 className="d" style={{ fontSize: 19, color: 'var(--warn-text)' }}>Your answer key may be wrong here</h2>
        <p style={{ margin: 0, color: 'var(--warn-body)' }}>
          You are scored on your reviewer’s answer.{' '}
          {q.notes.k.likely >= 0 ? (
            <>The option that is more likely correct is marked <b style={{ color: 'var(--warn-text)' }}>Likely correct</b>.</>
          ) : (
            <>This question is ambiguous, so read the note carefully.</>
          )}
        </p>
        <p style={{ margin: 0, color: 'var(--warn-body)' }}><Md text={fx(q.notes.k.note)} /></p>
      </div>
    </div>
  );
}

export function Explanation({ q, order }: { q: Question; order: number[] }) {
  const [tab, setTab] = useState<'why' | 'options'>('why');
  const lesson = lessonById[q.notes.t];
  const fx = (t: string) => remapOptionRefs(t, order);
  return (
    <div className="card stack" style={{ gap: 16 }}>
      <div className="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'why'} className={tab === 'why' ? 'on' : ''} onClick={() => setTab('why')}>Explanation</button>
        <button type="button" role="tab" aria-selected={tab === 'options'} className={tab === 'options' ? 'on' : ''} onClick={() => setTab('options')}>Every option, explained</button>
      </div>
      {tab === 'why' ? (
        <p key="why" className="tab-panel" style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, maxWidth: 720 }}><Md text={fx(q.notes.e)} /></p>
      ) : (
        <div key="opts" className="why tab-panel">
          {order.map((oi, pos) => (
            <div key={oi}>
              <span className={'k' + (oi === q.key ? ' ok' : '')}>{pos + 1}</span>
              <span style={{ color: 'var(--text-2)' }}><Md text={fx(q.notes.w[oi] ?? '')} /></span>
            </div>
          ))}
        </div>
      )}
      {q.notes.r && (
        <div className="callout tip">
          <span className="tile" style={{ width: 34, height: 34, background: 'var(--pink)', borderRadius: 10 }}><Icon d={PATHS.bulb} size={18} stroke="#241B2E" /></span>
          <span><b style={{ color: 'var(--pink-text)' }}>Remember: </b><Md text={fx(q.notes.r)} /></span>
        </div>
      )}
      {lesson && (
        <Link to={`/learn/${lesson.id}`} className="row" style={{ textDecoration: 'none', color: 'var(--text)', gap: 12 }}>
          <span className="tile" style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 11 }}><Icon d={PATHS.layers} size={18} stroke="#0B0D1C" /></span>
          <span className="stack">
            <span className="sub small">Learn the concept</span>
            <b>{lesson.title}</b>
          </span>
        </Link>
      )}
    </div>
  );
}

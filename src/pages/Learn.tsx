import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { DomainId, LessonBlock } from '../types';
import { DOMAINS, domainById, lessonById, lessonsFor, questionById } from '../data';
import { lessonAccuracy, markLesson, recordAnswer, useProgress } from '../store';
import { Explanation, KeyCheck, QuestionView, canShuffle } from '../components/QuestionView';
import { DomainTile, Empty, Icon, Md, PATHS, shuffle } from '../components/ui';
import { ReadProgress, celebrate, haptic, toast } from '../components/fx';

export function LearnIndex() {
  const p = useProgress();
  const [params, setParams] = useSearchParams();
  const d = (params.get('d') as DomainId) || 'software';
  const dom = domainById[d] ?? DOMAINS[0];
  const lessons = lessonsFor(dom.id);
  const max = Math.max(...lessons.map((l) => l.questionIds.length));
  const doneCount = lessons.filter((l) => p.lessons[l.id] === 'got').length;
  const firstOpen = lessons.find((l) => p.lessons[l.id] !== 'got') ?? lessons[0];

  return (
    <div className="page">
      <div>
        <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Learn concepts</h1>
        <p className="sub" style={{ margin: '4px 0 0', maxWidth: 640 }}>
          Short lessons built from every concept in your reviewers. Topics are sorted by how often they appear in your questions, so the most useful ones come first.
        </p>
      </div>
      <div className="row wrap" style={{ gap: 8 }}>
        {DOMAINS.map((x) => (
          <button key={x.id} type="button" className="btn small" onClick={() => setParams({ d: x.id })}
            style={x.id === dom.id ? { background: x.color, borderColor: x.color, color: '#0B0D1C' } : undefined}>
            {x.short}
          </button>
        ))}
      </div>

      <div className="card glow row wrap" style={{ gap: 20 }}>
        <DomainTile d={dom} size={56} />
        <div className="stack grow" style={{ gap: 4 }}>
          <h2 className="d" style={{ fontSize: 26, fontWeight: 800 }}>{dom.name}</h2>
          <span className="sub">{lessons.length} lessons, {doneCount} learned. {dom.blurb}.</span>
        </div>
        <Link to={`/learn/${firstOpen.id}`} className="btn primary"><Icon d={PATHS.play} size={16} fill="currentColor" /> {doneCount ? 'Continue' : 'Start'}: {firstOpen.title}</Link>
      </div>

      <div className="grid stagger">
        {lessons.map((l, i) => {
          const st = p.lessons[l.id];
          const acc = lessonAccuracy(p, l.id);
          const yieldLevel = Math.max(1, Math.round((l.questionIds.length / max) * 3));
          return (
            <Link key={l.id} to={`/learn/${l.id}`} className="card stack card-link" style={{ gap: 12, textDecoration: 'none', color: 'var(--text)' }}>
              <div className="row between">
                <span className="row" style={{ gap: 4 }} aria-label={`Importance ${yieldLevel} of 3`}>
                  {[1, 2, 3].map((k) => <span key={k} style={{ width: 7, height: 16, borderRadius: 2, background: k <= yieldLevel ? 'var(--accent)' : '#2A2F52' }} />)}
                </span>
                {st === 'got' ? <span className="chip ok">Learned</span> : st === 'again' ? <span className="chip bad">Review again</span> : <span className="chip plain">#{i + 1}</span>}
              </div>
              <h3 className="d" style={{ fontSize: 19, fontWeight: 700 }}>{l.title}</h3>
              <span className="sub" style={{ flex: '1 1 auto' }}>{l.summary}</span>
              <span className="sub small">
                {l.questionIds.length} question{l.questionIds.length === 1 ? '' : 's'}
                {acc !== null && <> · {Math.round(acc * 100)}% right so far</>}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Block({ b }: { b: LessonBlock }) {
  switch (b.kind) {
    case 'text':
      return <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: 'var(--text-2)' }}><Md text={b.md} /></p>;
    case 'terms':
      return (
        <div className="terms">
          {b.items.map((t, i) => (
            <div className="term" key={i}>
              <b>{t.term}</b>
              <span><Md text={t.def} /></span>
              {t.cue && <em>Clue in questions: {t.cue}</em>}
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="table-wrap">
          <table className="t">
            <thead><tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Md text={c} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case 'steps':
      return (
        <div className="stack" style={{ gap: 8 }}>
          {b.title && <b className="d" style={{ fontSize: 16 }}>{b.title}</b>}
          <ol className="steps">{b.items.map((s, i) => <li key={i}><Md text={s} /></li>)}</ol>
        </div>
      );
    case 'tip':
      return (
        <div className="callout tip">
          <span className="tile" style={{ width: 34, height: 34, background: 'var(--pink)', borderRadius: 10 }}><Icon d={PATHS.bulb} size={18} stroke="#241B2E" /></span>
          <span><b style={{ color: '#FFB3DB' }}>Memory trick: </b><Md text={b.md} /></span>
        </div>
      );
    case 'trap':
      return (
        <div className="callout trap">
          <span className="tile" style={{ width: 34, height: 34, background: 'var(--warn)', borderRadius: 10 }}><Icon d={PATHS.alert} size={18} stroke="#241D12" /></span>
          <span style={{ color: '#E4DCCB' }}><b style={{ color: 'var(--warn-text)' }}>Common trap: </b><Md text={b.md} /></span>
        </div>
      );
    case 'formula':
      return (
        <div className="callout formula">
          <span className="tile" style={{ width: 34, height: 34, background: '#7C9CFF', borderRadius: 10, fontWeight: 800, color: '#0B0D1C' }}>ƒ</span>
          <span style={{ fontSize: 16 }}><Md text={b.md} /></span>
        </div>
      );
  }
}

function QuickCheck({ ids }: { ids: string[] }) {
  const p = useProgress();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = questionById[ids[i]];
  const order = useMemo(() => {
    const idx = q.options.map((_, k) => k);
    return p.shuffle && canShuffle(q) ? shuffle(idx) : idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id]);
  const pick = (oi: number) => {
    if (picked !== null) return;
    setPicked(oi);
    recordAnswer(q.id, oi === q.key, null);
    haptic(oi === q.key ? 'ok' : 'bad');
  };
  return (
    <section className="stack" style={{ gap: 16 }}>
      <div className="row between wrap">
        <h2 className="d" style={{ fontSize: 22, fontWeight: 800 }}>Check yourself</h2>
        <span className="sub">From your reviewer · {i + 1} of {ids.length}</span>
      </div>
      <QuestionView key={q.id} q={q} order={order} picked={picked} revealed={picked !== null} onPick={pick} fx />
      {picked !== null && (
        <>
          <div className="reveal"><KeyCheck q={q} /></div>
          <div className="reveal-2"><Explanation q={q} order={order} /></div>
          {i + 1 < ids.length && (
            <button type="button" className="btn" style={{ alignSelf: 'flex-start' }} onClick={() => { setPicked(null); setI(i + 1); }}>
              Next check <Icon d={PATHS.next} size={18} />
            </button>
          )}
        </>
      )}
    </section>
  );
}

export function LessonPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const p = useProgress();
  const l = id ? lessonById[id] : undefined;
  if (!l) return <div className="page"><Empty title="Lesson not found"><Link to="/learn">Back to lessons</Link></Empty></div>;
  const d = domainById[l.domain];
  const list = lessonsFor(l.domain);
  const pos = list.findIndex((x) => x.id === l.id);
  const prev = list[pos - 1];
  const nextL = list[pos + 1];
  const finish = (r: 'got' | 'again') => {
    markLesson(l.id, r);
    if (r === 'got') {
      haptic('ok');
      const learned = list.filter((x) => x.id === l.id || p.lessons[x.id] === 'got').length;
      if (learned === list.length) {
        celebrate(150);
        toast(`${d.short} complete`, { body: `All ${list.length} lessons learned. +15 XP`, icon: PATHS.check, color: d.color });
      } else {
        toast('Lesson learned', { body: `${l.title}. +15 XP`, icon: PATHS.check });
      }
    } else {
      toast('Saved for later', { body: 'This lesson stays marked for review.', icon: PATHS.undo, color: '#FF9A8E' });
    }
    nav(nextL ? `/learn/${nextL.id}` : `/learn?d=${l.domain}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page" style={{ maxWidth: 940 }}>
      <ReadProgress />
      <div className="row wrap" style={{ gap: 14 }}>
        <Link to={`/learn?d=${l.domain}`} className="icon-btn" aria-label="All lessons"><Icon d={PATHS.back} /></Link>
        <div className="stack">
          <span className="sub small" style={{ color: d.color, fontWeight: 700 }}>{d.name}</span>
          <span className="d" style={{ fontSize: 18, fontWeight: 700 }}>Lesson {pos + 1} of {list.length}</span>
        </div>
        <div className="grow" style={{ display: 'grid', gridTemplateColumns: `repeat(${list.length}, minmax(0, 1fr))`, gap: 5, minWidth: 140 }}>
          {list.map((x, k) => (
            <span key={x.id} style={{ height: 8, borderRadius: 4, background: k === pos ? d.color : p.lessons[x.id] === 'got' ? 'var(--accent)' : '#262B55' }} />
          ))}
        </div>
      </div>

      <article className="card stack" style={{ gap: 22, padding: 32, background: 'radial-gradient(100% 80% at 100% 0%, #1F2550 0%, #151931 60%)' }}>
        <div className="stack" style={{ gap: 10 }}>
          <div className="row wrap" style={{ gap: 8 }}>
            {l.questionIds.length >= 5 && <span className="chip accent">Often tested</span>}
            <span className="chip plain">In {l.questionIds.length} of your questions</span>
          </div>
          <h1 className="d" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.08 }}>{l.title}</h1>
          <p style={{ margin: 0, color: '#B9BDD8', fontSize: 17 }}>{l.summary}</p>
        </div>
        {l.blocks.map((b, i) => (
          <div key={i} className="lesson-block"><Block b={b} /></div>
        ))}
      </article>

      {l.questionIds.length > 0 && <QuickCheck key={l.id} ids={l.questionIds} />}

      <div className="row wrap between">
        {prev ? <Link to={`/learn/${prev.id}`} className="btn">Previous: {prev.title}</Link> : <span />}
        <div className="row wrap">
          <button type="button" className="btn danger" onClick={() => finish('again')}>Show this again later</button>
          <button type="button" className="btn primary" onClick={() => finish('got')}>
            <Icon d={PATHS.check} size={18} width={3} /> {nextL ? `Got it, next: ${nextL.title}` : 'Got it, finish domain'}
          </button>
        </div>
      </div>
    </div>
  );
}

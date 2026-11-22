import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { DomainId, Question } from '../types';
import { ALL_LESSONS, DOMAINS, KEY_CHECKS, QUESTIONS, domainById, lessonById, lessonsFor } from '../data';
import { type Confidence, type Progress, isDue, mistakes, recordAnswer, setConfidence, toggleSaved, useProgress } from '../store';
import { Explanation, KeyCheck, QuestionView, canShuffle } from '../components/QuestionView';
import { Empty, Icon, PATHS, shuffle } from '../components/ui';

export type Mode = 'smart' | 'new' | 'all' | 'mistakes' | 'keychecks' | 'saved';

const MODES: { id: Mode; title: string; desc: string }[] = [
  { id: 'smart', title: 'Smart mix', desc: 'Mistakes and due reviews first, then new questions' },
  { id: 'new', title: 'New only', desc: 'Questions you have never answered' },
  { id: 'all', title: 'Everything in order', desc: 'Go through the reviewer from the top' },
  { id: 'mistakes', title: 'Mistakes', desc: 'Only questions you got wrong last time' },
  { id: 'keychecks', title: 'Key checks', desc: 'Questions where your key may be wrong or is missing' },
  { id: 'saved', title: 'Saved', desc: 'Questions you bookmarked' },
];

export function pickQuestions(p: Progress, opts: { d?: string | null; t?: string | null; mode: Mode; n: number; first?: string | null }) {
  let pool: Question[] = QUESTIONS;
  if (opts.d && opts.d !== 'all') pool = pool.filter((q) => q.domain === opts.d);
  if (opts.t) pool = pool.filter((q) => q.notes.t === opts.t);
  const now = Date.now();
  let list: Question[];
  switch (opts.mode) {
    case 'new':
      list = shuffle(pool.filter((q) => !p.q[q.id]));
      break;
    case 'all':
      list = pool;
      break;
    case 'mistakes': {
      const m = new Set(mistakes(p).map((q) => q.id));
      list = shuffle(pool.filter((q) => m.has(q.id)));
      break;
    }
    case 'keychecks': {
      const k = new Set(KEY_CHECKS.map((q) => q.id));
      list = pool.filter((q) => k.has(q.id));
      break;
    }
    case 'saved':
      list = pool.filter((q) => p.saved.includes(q.id));
      break;
    default: {
      const wrong = shuffle(pool.filter((q) => p.q[q.id] && !p.q[q.id].lastCorrect));
      const due = shuffle(pool.filter((q) => p.q[q.id]?.lastCorrect && isDue(p, q, now)));
      const fresh = shuffle(pool.filter((q) => !p.q[q.id]));
      const rest = [...pool.filter((q) => p.q[q.id]?.lastCorrect && !isDue(p, q, now))].sort((a, b) => p.q[a.id].due - p.q[b.id].due);
      list = [...wrong, ...due, ...fresh, ...rest];
    }
  }
  if (opts.first) {
    const f = QUESTIONS.find((q) => q.id === opts.first);
    if (f) list = [f, ...list.filter((q) => q.id !== f.id)];
  }
  return opts.n > 0 ? list.slice(0, opts.n) : list;
}

export function PracticeSetup() {
  const nav = useNavigate();
  const p = useProgress();
  const [params] = useSearchParams();
  const [d, setD] = useState<string>(params.get('d') ?? 'all');
  const [t, setT] = useState<string>('');
  const [mode, setMode] = useState<Mode>('smart');
  const [n, setN] = useState(10);
  const preview = pickQuestions(p, { d, t: t || null, mode, n: 0 });
  const topics = d === 'all' ? [] : lessonsFor(d as DomainId);

  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <div>
        <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Practice</h1>
        <p className="sub" style={{ margin: '4px 0 0' }}>Every answer shows a full explanation. Questions you miss come back until you get them right.</p>
      </div>

      <section className="card stack" style={{ gap: 14 }}>
        <h2 className="d" style={{ fontSize: 19 }}>Domain</h2>
        <div className="row wrap" style={{ gap: 8 }}>
          <button type="button" className={'btn small' + (d === 'all' ? ' primary' : '')} onClick={() => { setD('all'); setT(''); }}>All domains</button>
          {DOMAINS.map((x) => (
            <button key={x.id} type="button" className="btn small" onClick={() => { setD(x.id); setT(''); }}
              style={d === x.id ? { background: x.color, borderColor: x.color, color: '#0B0D1C' } : undefined}>
              {x.short}
            </button>
          ))}
        </div>
        {topics.length > 0 && (
          <label className="stack" style={{ gap: 6 }}>
            <span className="sub">Topic (optional)</span>
            <select className="select" value={t} onChange={(e) => setT(e.target.value)}>
              <option value="">All topics</option>
              {topics.map((l) => <option key={l.id} value={l.id}>{l.title} ({l.questionIds.length})</option>)}
            </select>
          </label>
        )}
      </section>

      <section className="card stack" style={{ gap: 14 }}>
        <h2 className="d" style={{ fontSize: 19 }}>What to practice</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: 10 }}>
          {MODES.map((m) => (
            <button key={m.id} type="button" onClick={() => setMode(m.id)} className="opt" style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 2, ...(mode === m.id ? { borderColor: 'var(--accent)', background: '#23281A' } : {}) }}>
              <b>{m.title}</b>
              <span className="sub small" style={{ fontWeight: 500 }}>{m.desc}</span>
            </button>
          ))}
        </div>
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="sub">Questions per set</span>
          {[5, 10, 20, 0].map((x) => (
            <button key={x} type="button" className={'btn small' + (n === x ? ' primary' : '')} onClick={() => setN(x)}>{x === 0 ? 'All' : x}</button>
          ))}
        </div>
      </section>

      <div className="row wrap between">
        <span className="sub">{preview.length} question{preview.length === 1 ? '' : 's'} match.</span>
        <button type="button" className="btn primary" disabled={!preview.length}
          onClick={() => nav(`/practice/go?d=${d}&mode=${mode}&n=${n}${t ? `&t=${t}` : ''}`)}>
          <Icon d={PATHS.play} size={16} fill="currentColor" /> Start practicing
        </button>
      </div>
    </div>
  );
}

export function PracticeRun() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const p = useProgress();
  const [list] = useState(() =>
    pickQuestions(p, { d: params.get('d'), t: params.get('t'), mode: (params.get('mode') as Mode) ?? 'smart', n: Number(params.get('n') ?? 10), first: params.get('first') }),
  );
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [conf, setConf] = useState<Confidence | null>(null);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const q = list[i];
  const order = useMemo(() => {
    if (!q) return [];
    const idx = q.options.map((_, k) => k);
    return p.shuffle && canShuffle(q) ? shuffle(idx) : idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);
  const revealed = picked !== null;
  const done = i >= list.length;

  const pick = (oi: number) => {
    if (revealed || !q) return;
    const ok = oi === q.key;
    setPicked(oi);
    setResults((r) => [...r, ok]);
    recordAnswer(q.id, ok, null);
    const c = ok ? combo + 1 : 0;
    setCombo(c);
    setBestCombo((b) => Math.max(b, c));
  };
  const next = () => {
    setPicked(null);
    setConf(null);
    setI((x) => x + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const chooseConf = (c: Confidence) => {
    if (!q) return;
    setConf(c);
    setConfidence(q.id, c);
  };

  // An answer tapped on the dashboard's "Up next" card counts as the first pick.
  useEffect(() => {
    const a = params.get('a');
    if (a !== null && i === 0 && picked === null && list[0]?.id === params.get('first')) pick(Number(a));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.metaKey || e.ctrlKey) return;
      if (!q) return;
      const n = Number(e.key);
      if (!revealed && n >= 1 && n <= order.length) pick(order[n - 1]);
      else if (revealed && (e.key === 'Enter' || e.key === 'ArrowRight')) next();
      else if (e.key.toLowerCase() === 'b') toggleSaved(q.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!list.length) {
    return (
      <div className="page" style={{ maxWidth: 760 }}>
        <Empty title="Nothing to practice here yet">
          {params.get('mode') === 'mistakes' ? 'You have no mistakes to retry. Nice work.' : 'Try a different mode or domain.'}
          <div style={{ marginTop: 16 }}><Link to="/practice" className="btn">Choose another set</Link></div>
        </Empty>
      </div>
    );
  }

  if (done) {
    const right = results.filter(Boolean).length;
    const missed = list.filter((_, k) => results[k] === false);
    return (
      <div className="page" style={{ maxWidth: 820 }}>
        <div className="card glow stack" style={{ gap: 18, padding: 32 }}>
          <span className="sub">Set complete</span>
          <h1 className="d" style={{ fontSize: 40, fontWeight: 800 }}>{right} of {list.length} correct</h1>
          <div className="row wrap" style={{ gap: 10 }}>
            <span className="chip accent">+{right * 10 + (list.length - right) * 2} XP</span>
            <span className="chip plain">Best combo: {bestCombo}</span>
            {missed.length > 0 && <span className="chip bad">{missed.length} added to Mistakes</span>}
          </div>
          <div className="row wrap">
            <button type="button" className="btn primary" onClick={() => nav(0)}>Practice another set</button>
            {missed.length > 0 && <Link to="/practice/go?mode=mistakes" className="btn">Retry mistakes</Link>}
            <Link to="/" className="btn">Back to dashboard</Link>
          </div>
        </div>
        {missed.length > 0 && (
          <section className="card stack" style={{ gap: 10 }}>
            <h2 className="d" style={{ fontSize: 20 }}>Review what you missed</h2>
            {missed.map((m) => (
              <Link key={m.id} to={`/q/${m.id}`} className="row" style={{ padding: '10px 12px', borderRadius: 12, background: 'var(--raised)', textDecoration: 'none', color: 'var(--text)' }}>
                <span className="chip" style={{ background: domainById[m.domain].color + '22', color: domainById[m.domain].color }}>{domainById[m.domain].short}</span>
                <span className="grow">{m.stem}</span>
              </Link>
            ))}
          </section>
        )}
      </div>
    );
  }

  const d = domainById[q.domain];
  return (
    <div className="page" style={{ maxWidth: 1180 }}>
      <div className="row wrap" style={{ gap: 14 }}>
        <Link to="/practice" className="icon-btn" aria-label="Leave practice"><Icon d={PATHS.back} /></Link>
        <span className="tile" style={{ width: 40, height: 40, background: d.color, borderRadius: 12 }}><Icon d={d.icon} size={20} stroke="#0B0D1C" /></span>
        <div className="stack">
          <span className="sub small">{d.name}</span>
          <span className="d" style={{ fontSize: 18, fontWeight: 700 }}>Question {i + 1} of {list.length}</span>
        </div>
        <div className="grow" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(list.length, 30)}, minmax(0, 1fr))`, gap: 4, minWidth: 140 }}>
          {list.slice(0, 30).map((_, k) => (
            <span key={k} style={{
              height: 8, borderRadius: 4,
              background: k === i ? 'var(--accent)' : results[k] === true ? 'var(--ok)' : results[k] === false ? 'var(--bad)' : '#262B55',
              boxShadow: k === i ? '0 0 12px var(--accent)' : 'none',
            }} />
          ))}
        </div>
        {combo >= 2 && (
          <span className="chip accent" style={{ padding: '8px 12px' }}><Icon d={PATHS.bolt} size={15} fill="currentColor" /> {combo} in a row</span>
        )}
      </div>

      <div className="row wrap" style={{ alignItems: 'flex-start', gap: 24 }}>
        <div className="stack" style={{ flex: '999 1 600px', minWidth: 0, gap: 20 }}>
          <QuestionView q={q} order={order} picked={picked} revealed={revealed} onPick={pick} />
          {revealed && (
            <>
              <div className="card stack" style={{ gap: 12, padding: 20 }}>
                <div className="row between wrap">
                  <span className="row">
                    <span className="tile" style={{ width: 34, height: 34, borderRadius: 10, background: picked === q.key ? 'var(--ok)' : 'var(--bad)' }}>
                      <Icon d={picked === q.key ? PATHS.check : PATHS.x} size={17} stroke="#0B0D1C" width={3} />
                    </span>
                    <b className="d" style={{ fontSize: 19 }}>
                      {picked === q.key ? (q.keySource === 'claude' ? 'Correct' : 'Correct per your key') : 'Not quite'}
                    </b>
                  </span>
                  <span className="d" style={{ color: 'var(--accent)', fontWeight: 800 }}>+{picked === q.key ? 10 : 2} XP</span>
                </div>
                {picked === q.key ? (
                  <>
                    <span className="sub">How sure were you? This decides when you see it again.</span>
                    <div className="conf">
                      <button type="button" className={conf === 'guessed' ? 'on' : ''} onClick={() => chooseConf('guessed')}>Guessed<span className="small" style={{ color: 'var(--bad-text)' }}>back tomorrow</span></button>
                      <button type="button" className={conf === 'unsure' || conf === null ? (conf ? 'on' : '') : ''} onClick={() => chooseConf('unsure')}>Unsure<span className="small" style={{ color: 'var(--accent)' }}>back in 3 days</span></button>
                      <button type="button" className={conf === 'knew' ? 'on' : ''} onClick={() => chooseConf('knew')}>Knew it<span className="small" style={{ color: 'var(--ok-text)' }}>back in 2 weeks</span></button>
                    </div>
                  </>
                ) : (
                  <span className="sub">Added to your Mistakes. It will come back until you get it right.</span>
                )}
              </div>
              <KeyCheck q={q} />
              <Explanation q={q} order={order} />
            </>
          )}
        </div>
        <aside className="stack" style={{ flex: '1 1 280px', gap: 16, position: 'sticky', top: 20 }}>
          {revealed ? (
            <button type="button" className="btn primary" onClick={next} style={{ minHeight: 58, fontSize: 17 }}>
              {i + 1 === list.length ? 'See results' : 'Next question'} <Icon d={PATHS.next} size={18} />
            </button>
          ) : (
            <div className="card stack" style={{ gap: 8, padding: 18 }}>
              <b>Pick an answer</b>
              <span className="sub small">Use keys 1–{order.length}. Press B to save, Enter for next.</span>
            </div>
          )}
          <div className="card stack" style={{ gap: 6, padding: 18 }}>
            <span className="sub small">Topic</span>
            <Link to={`/learn/${q.notes.t}`} style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'none' }}>{lessonById[q.notes.t]?.title}</Link>
            <span className="sub small">{ALL_LESSONS.find((l) => l.id === q.notes.t)?.questionIds.length} questions on this topic</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

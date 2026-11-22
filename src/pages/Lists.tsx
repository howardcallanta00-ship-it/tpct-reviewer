import { useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { DomainId, Question } from '../types';
import { ALL_LESSONS, DOMAINS, KEY_CHECKS, QUESTIONS, domainById, questionById } from '../data';
import {
  exportProgress, importProgress, mistakes, recordAnswer, resetProgress, setExamDate, setShuffle, useProgress,
} from '../store';
import { Explanation, KeyCheck, QuestionView, canShuffle } from '../components/QuestionView';
import { Empty, Icon, Md, PATHS, shuffle } from '../components/ui';
import { SearchBox } from '../components/Layout';

function QRow({ q, extra }: { q: Question; extra?: React.ReactNode }) {
  const d = domainById[q.domain];
  return (
    <Link to={`/q/${q.id}`} className="card row card-link" style={{ padding: 16, gap: 14, textDecoration: 'none', color: 'var(--text)', alignItems: 'flex-start' }}>
      <span className="tile" style={{ width: 34, height: 34, background: d.color, borderRadius: 10 }}><Icon d={d.icon} size={17} stroke="#0B0D1C" /></span>
      <span className="stack grow" style={{ gap: 4 }}>
        <span className="sub small">{d.short}, question {q.num}</span>
        <b style={{ fontWeight: 600 }}>{q.stem}</b>
        {extra}
      </span>
      <Icon d={PATHS.next} size={18} />
    </Link>
  );
}

function DomainFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="row wrap" style={{ gap: 8 }}>
      <button type="button" className={'btn small' + (value === 'all' ? ' primary' : '')} onClick={() => onChange('all')}>All</button>
      {DOMAINS.map((d) => (
        <button key={d.id} type="button" className="btn small" onClick={() => onChange(d.id)}
          style={value === d.id ? { background: d.color, borderColor: d.color, color: '#0B0D1C' } : undefined}>{d.short}</button>
      ))}
    </div>
  );
}

export function Mistakes() {
  const p = useProgress();
  const list = mistakes(p);
  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <div className="row wrap between">
        <div>
          <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Mistakes</h1>
          <p className="sub" style={{ margin: '4px 0 0' }}>Questions you got wrong last time. Get one right and it leaves this list.</p>
        </div>
        {list.length > 0 && <Link to="/practice/go?mode=mistakes&n=0" className="btn primary"><Icon d={PATHS.play} size={16} fill="currentColor" /> Retry all {list.length}</Link>}
      </div>
      {list.length === 0 ? (
        <Empty title="No mistakes right now">Answer some questions and anything you miss will collect here.</Empty>
      ) : (
        <div className="stack stagger" style={{ gap: 10 }}>{list.map((q) => <QRow key={q.id} q={q} />)}</div>
      )}
    </div>
  );
}

export function KeyChecks() {
  const [d, setD] = useState('all');
  const list = KEY_CHECKS.filter((q) => d === 'all' || q.domain === d);
  const flagged = KEY_CHECKS.filter((q) => q.notes.k).length;
  const missing = KEY_CHECKS.filter((q) => q.keySource === 'claude').length;
  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <div className="row wrap between">
        <div>
          <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Answer key checks</h1>
          <p className="sub" style={{ margin: '4px 0 0', maxWidth: 620 }}>
            {flagged} answers in your reviewer look wrong or doubtful, and {missing} questions have no answer marked. You are still scored on your key. Each one explains what the real exam most likely expects.
          </p>
        </div>
        <Link to="/practice/go?mode=keychecks&n=0" className="btn primary">Practice these</Link>
      </div>
      <DomainFilter value={d} onChange={setD} />
      <div className="stack" style={{ gap: 10 }}>
        {list.map((q) => (
          <QRow key={q.id} q={q} extra={
            q.notes.k ? (
              <span className="small" style={{ color: 'var(--warn-text)' }}>
                Key: {q.key + 1}{q.notes.k.likely >= 0 ? `, likely: ${q.notes.k.likely + 1}` : ', ambiguous'}
              </span>
            ) : <span className="small" style={{ color: 'var(--warn-text)' }}>No key in reviewer, answer: {q.key + 1}</span>
          } />
        ))}
      </div>
    </div>
  );
}

export function Saved() {
  const p = useProgress();
  const list = p.saved.map((id) => questionById[id]).filter(Boolean);
  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <div className="row wrap between">
        <div>
          <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Saved</h1>
          <p className="sub" style={{ margin: '4px 0 0' }}>Questions you bookmarked with the bookmark button or the B key.</p>
        </div>
        {list.length > 0 && <Link to="/practice/go?mode=saved&n=0" className="btn primary">Practice saved</Link>}
      </div>
      {list.length === 0 ? <Empty title="Nothing saved yet">Tap the bookmark on any question to keep it here.</Empty> : (
        <div className="stack stagger" style={{ gap: 10 }}>{list.map((q) => <QRow key={q.id} q={q} />)}</div>
      )}
    </div>
  );
}

export function Search() {
  const [params] = useSearchParams();
  const term = (params.get('q') ?? '').trim().toLowerCase();
  const words = term.split(/\s+/).filter(Boolean);
  const match = (s: string) => words.every((w) => s.toLowerCase().includes(w));
  const lessons = words.length ? ALL_LESSONS.filter((l) => match(l.title + ' ' + l.summary + ' ' + JSON.stringify(l.blocks))) : [];
  const qs = words.length ? QUESTIONS.filter((q) => match(q.stem + ' ' + q.options.map((o) => o.text).join(' ') + ' ' + q.notes.e)) : [];
  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Search</h1>
      <SearchBox key={term} />
      {words.length > 0 && <span className="sub">{lessons.length} lessons and {qs.length} questions for “{params.get('q')}”</span>}
      {lessons.length > 0 && (
        <div className="grid">
          {lessons.map((l) => (
            <Link key={l.id} to={`/learn/${l.id}`} className="card stack" style={{ gap: 6, textDecoration: 'none', color: 'var(--text)' }}>
              <span className="small" style={{ color: domainById[l.domain].color, fontWeight: 700 }}>{domainById[l.domain].short} lesson</span>
              <b className="d" style={{ fontSize: 18 }}>{l.title}</b>
              <span className="sub small">{l.summary}</span>
            </Link>
          ))}
        </div>
      )}
      <div className="stack" style={{ gap: 10 }}>{qs.slice(0, 60).map((q) => <QRow key={q.id} q={q} />)}</div>
    </div>
  );
}

export function QuestionPage() {
  const { id } = useParams();
  const p = useProgress();
  const q = id ? questionById[id] : undefined;
  const [picked, setPicked] = useState<number | null>(null);
  const order = useMemo(() => {
    if (!q) return [];
    const idx = q.options.map((_, k) => k);
    return p.shuffle && canShuffle(q) ? shuffle(idx) : idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id]);
  if (!q) return <div className="page"><Empty title="Question not found" /></div>;
  const all = QUESTIONS.filter((x) => x.domain === q.domain);
  const pos = all.findIndex((x) => x.id === q.id);
  const prev = all[pos - 1];
  const next = all[pos + 1];
  return (
    <div className="page" style={{ maxWidth: 900 }} key={q.id}>
      <div className="row wrap between">
        <button type="button" className="btn small" onClick={() => history.back()}><Icon d={PATHS.back} size={16} /> Back</button>
        <div className="row">
          {prev && <Link to={`/q/${prev.id}`} className="btn small" onClick={() => setPicked(null)}>Previous</Link>}
          {next && <Link to={`/q/${next.id}`} className="btn small" onClick={() => setPicked(null)}>Next</Link>}
        </div>
      </div>
      <QuestionView fx q={q} order={order} picked={picked} revealed={picked !== null}
        onPick={(oi) => { setPicked(oi); recordAnswer(q.id, oi === q.key, null); }} />
      {picked === null ? (
        <button type="button" className="btn" style={{ alignSelf: 'flex-start' }} onClick={() => setPicked(-1)}>Just show me the answer</button>
      ) : (
        <>
          <KeyCheck q={q} />
          <Explanation q={q} order={order} />
        </>
      )}
    </div>
  );
}

export function Settings() {
  const p = useProgress();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `topcit-sprint-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const upload = async (f: File) => {
    try {
      importProgress(await f.text());
      setMsg('Progress imported.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Could not import that file.');
    }
  };
  const answered = Object.keys(p.q).length;
  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Progress and settings</h1>
      <div className="card stack" style={{ gap: 12 }}>
        <h2 className="d" style={{ fontSize: 19 }}>Exam date</h2>
        <span className="sub">Shows a countdown on the dashboard.</span>
        <div className="row wrap">
          <input className="input" type="date" value={p.examDate ?? ''} onChange={(e) => setExamDate(e.target.value || null)} aria-label="Exam date" />
          {p.examDate && <button type="button" className="btn small" onClick={() => setExamDate(null)}>Clear</button>}
        </div>
      </div>
      <div className="card stack" style={{ gap: 12 }}>
        <h2 className="d" style={{ fontSize: 19 }}>Shuffle answer options</h2>
        <span className="sub">Stops you memorizing positions instead of answers. Options that refer to each other, like “(a), (b)”, always keep their order.</span>
        <label className="row" style={{ gap: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={p.shuffle} onChange={(e) => setShuffle(e.target.checked)} style={{ width: 20, height: 20 }} />
          <span>{p.shuffle ? 'On' : 'Off'}</span>
        </label>
      </div>
      <div className="card stack" style={{ gap: 12 }}>
        <h2 className="d" style={{ fontSize: 19 }}>Your progress</h2>
        <span className="sub">Saved only in this browser ({answered} questions answered, {p.xp} XP). Export it to move to another device.</span>
        <div className="row wrap">
          <button type="button" className="btn" onClick={download}>Export progress</button>
          <button type="button" className="btn" onClick={() => file.current?.click()}>Import progress</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <button type="button" className="btn danger" onClick={() => { if (confirm('Delete all progress on this device? This cannot be undone.')) { resetProgress(); setMsg('Progress reset.'); } }}>Reset progress</button>
        </div>
        {msg && <span className="sub" role="status">{msg}</span>}
      </div>
      <div className="card stack" style={{ gap: 8 }}>
        <h2 className="d" style={{ fontSize: 19 }}>About the content</h2>
        <p className="sub" style={{ margin: 0 }}>
          Questions, answer keys and figures come from your six TOPCIT reviewers ({QUESTIONS.length} questions). Explanations, lessons and key-check notes were written to accompany them. Where the reviewer marks no answer, the answer shown is labeled “No key in reviewer”.
        </p>
        <Md className="sub" text={`**${KEY_CHECKS.length}** questions carry a key check.`} />
      </div>
    </div>
  );
}

export type { DomainId };

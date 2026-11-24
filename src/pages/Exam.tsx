import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Question } from '../types';
import { DOMAINS, QUESTIONS, domainById } from '../data';
import { recordAnswer, recordExam, useProgress } from '../store';
import { Explanation, KeyCheck, QuestionView, canShuffle } from '../components/QuestionView';
import { Icon, PATHS, ink, shuffle } from '../components/ui';
import { Confirm, CountUp, celebrate, haptic } from '../components/fx';

/** Even spread across domains, random within each. */
function buildExam(total: number): Question[] {
  if (total >= QUESTIONS.length) return shuffle(QUESTIONS);
  const per = Math.floor(total / DOMAINS.length);
  let extra = total - per * DOMAINS.length;
  const picked: Question[] = [];
  for (const d of shuffle(DOMAINS)) {
    const take = per + (extra-- > 0 ? 1 : 0);
    picked.push(...shuffle(QUESTIONS.filter((q) => q.domain === d.id)).slice(0, take));
  }
  return shuffle(picked);
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s % 60)).padStart(2, '0')}`;

export function Exam() {
  const p = useProgress();
  const [size, setSize] = useState(40);
  const [minutes, setMinutes] = useState(60);
  const [list, setList] = useState<Question[] | null>(null);
  const [orders, setOrders] = useState<Record<string, number[]>>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [i, setI] = useState(0);
  const [endAt, setEndAt] = useState(0);
  const [left, setLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState<string | null>(null);
  const [ask, setAsk] = useState(false);

  const start = () => {
    const l = buildExam(size);
    setList(l);
    setOrders(Object.fromEntries(l.map((q) => [q.id, p.shuffle && canShuffle(q) ? shuffle(q.options.map((_, k) => k)) : q.options.map((_, k) => k)])));
    setAnswers({});
    setFlags({});
    setI(0);
    setSubmitted(false);
    setEndAt(Date.now() + minutes * 60_000);
    setLeft(minutes * 60);
  };

  const submit = () => {
    if (!list || submitted) return;
    setSubmitted(true);
    let correct = 0;
    for (const q of list) {
      const a = answers[q.id];
      if (a === undefined) continue;
      const ok = a === q.key;
      if (ok) correct++;
      recordAnswer(q.id, ok, null);
    }
    recordExam(list.length, correct, minutes);
    window.scrollTo({ top: 0 });
    if (correct / list.length >= 0.7) {
      setTimeout(() => celebrate(160), 500);
      haptic('win');
    }
  };

  useEffect(() => {
    if (!list || submitted) return;
    const t = setInterval(() => {
      const s = Math.round((endAt - Date.now()) / 1000);
      setLeft(s);
      if (s <= 0) submit();
    }, 1000);
    return () => clearInterval(t);
  });

  const stats = useMemo(() => {
    if (!list) return null;
    const right = list.filter((q) => answers[q.id] === q.key).length;
    const byDomain = DOMAINS.map((d) => {
      const qs = list.filter((q) => q.domain === d.id);
      return { d, total: qs.length, right: qs.filter((q) => answers[q.id] === q.key).length };
    }).filter((x) => x.total > 0);
    return { right, byDomain };
  }, [list, answers]);

  if (!list) {
    const last = p.exams[p.exams.length - 1];
    return (
      <div className="page" style={{ maxWidth: 820 }}>
        <div>
          <h1 className="d" style={{ fontSize: 32, fontWeight: 800 }}>Mock exam</h1>
          <p className="sub" style={{ margin: '4px 0 0' }}>A timed mix of all six domains. No feedback until you submit, just like the real test.</p>
        </div>
        <div className="card glow stack" style={{ gap: 18 }}>
          <div className="stack" style={{ gap: 8 }}>
            <span className="sub">Number of questions</span>
            <div className="row wrap" style={{ gap: 8 }}>
              {[20, 40, 60, QUESTIONS.length].map((n) => (
                <button key={n} type="button" className={'btn small' + (size === n ? ' primary' : '')} onClick={() => { setSize(n); setMinutes(Math.round(n * 1.5)); }}>
                  {n === QUESTIONS.length ? `All ${n}` : n}
                </button>
              ))}
            </div>
          </div>
          <label className="stack" style={{ gap: 8 }}>
            <span className="sub">Time limit (minutes)</span>
            <input className="input" type="number" min={5} max={400} value={minutes} onChange={(e) => setMinutes(Math.max(5, Number(e.target.value) || 5))} style={{ width: 140 }} />
          </label>
          <button type="button" className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={start}>
            <Icon d={PATHS.clock} size={18} /> Start the exam
          </button>
        </div>
        {last && (
          <div className="card row wrap between">
            <span className="sub">Last mock exam: {new Date(last.at).toLocaleDateString()}</span>
            <b className="d" style={{ fontSize: 22 }}>{last.correct} / {last.total} ({Math.round((last.correct / last.total) * 100)}%)</b>
          </div>
        )}
      </div>
    );
  }

  if (submitted && stats) {
    const pct = Math.round((stats.right / list.length) * 100);
    const rq = review ? list.find((q) => q.id === review) : null;
    return (
      <div className="page" style={{ maxWidth: 1000 }}>
        <div className="card glow stack" style={{ gap: 16, padding: 32, animation: 'scale-in .5s var(--ease-spring) both' }}>
          <span className="sub">Mock exam result</span>
          <h1 className="d" style={{ fontSize: 44, fontWeight: 800 }}>
            <CountUp value={stats.right} ms={1200} /> / {list.length} <span style={{ color: 'var(--accent-fg)' }}>(<CountUp value={pct} ms={1200} />%)</span>
          </h1>
          <p className="sub" style={{ margin: 0, fontSize: 16 }}>
            {pct >= 85 ? 'Excellent. You are exam ready in most areas.' : pct >= 70 ? 'Passing territory. Polish the weakest domain below.' : 'Keep going. Every miss is now in your Mistakes deck.'}
          </p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 10 }}>
            {stats.byDomain.map(({ d, total, right }) => (
              <div key={d.id} className="stack" style={{ padding: 12, borderRadius: 14, background: 'var(--raised)', gap: 6 }}>
                <span className="small" style={{ color: ink(d.color), fontWeight: 700 }}>{d.short}</span>
                <b className="d n" style={{ fontSize: 20 }}>{right} / {total}</b>
                <div className="bar"><span style={{ width: `${(right / total) * 100}%`, background: d.color }} /></div>
              </div>
            ))}
          </div>
          <div className="row wrap">
            <button type="button" className="btn primary" onClick={() => setList(null)}>New mock exam</button>
            <Link to="/practice/go?mode=mistakes" className="btn">Practice my mistakes</Link>
          </div>
        </div>
        <section className="card stack" style={{ gap: 10 }}>
          <h2 className="d" style={{ fontSize: 20 }}>Review every question</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))', gap: 6 }}>
            {list.map((q, k) => {
              const a = answers[q.id];
              const bg = a === undefined ? 'var(--track)' : a === q.key ? 'var(--ok-bg)' : 'var(--bad-bg)';
              const fg = a === undefined ? 'var(--faint)' : a === q.key ? 'var(--ok-text)' : 'var(--bad-text)';
              return (
                <button key={q.id} type="button" onClick={() => setReview(q.id)}
                  style={{ height: 42, borderRadius: 10, border: review === q.id ? '2px solid var(--accent-fg)' : 0, background: bg, color: fg, fontWeight: 800, cursor: 'pointer' }}>
                  {k + 1}
                </button>
              );
            })}
          </div>
          <span className="sub small">Green = right, red = wrong, grey = unanswered. Tap a number to see the explanation.</span>
        </section>
        {rq && (
          <>
            <QuestionView q={rq} order={orders[rq.id]} picked={answers[rq.id] ?? -1} revealed />
            <KeyCheck q={rq} order={orders[rq.id]} />
            <Explanation q={rq} order={orders[rq.id]} />
          </>
        )}
      </div>
    );
  }

  const q = list[i];
  const answeredCount = Object.keys(answers).length;
  return (
    <div className="page" style={{ maxWidth: 1180 }}>
      <div className="row wrap" style={{ gap: 14 }}>
        <span className="d" style={{ fontSize: 20, fontWeight: 800 }}>Mock exam</span>
        <span className="sub n">{answeredCount} of {list.length} answered</span>
        <span className="grow" />
        <span className="chip n" style={{ padding: '10px 14px', fontSize: 16, background: left < 300 ? 'var(--bad-bg)' : 'var(--surface)', color: left < 300 ? 'var(--bad-text)' : 'var(--text)', border: '1px solid var(--line)' }}>
          <Icon d={PATHS.clock} size={16} /> {fmt(left)}
        </span>
        <button type="button" className="btn small primary" onClick={() => setAsk(true)}>Submit</button>
        {ask && (
          <Confirm
            title="Submit your exam?"
            body={list.length - answeredCount > 0
              ? `${list.length - answeredCount} question${list.length - answeredCount === 1 ? ' is' : 's are'} still unanswered and will count as wrong.`
              : 'You answered every question. Ready to see your score?'}
            confirm="Submit exam"
            onConfirm={() => { setAsk(false); submit(); }}
            onCancel={() => setAsk(false)}
          />
        )}
      </div>
      <div className="row wrap" style={{ alignItems: 'flex-start', gap: 24 }}>
        <div className="stack" style={{ flex: '999 1 600px', minWidth: 0, gap: 16 }}>
          <QuestionView key={q.id} q={q} order={orders[q.id]} picked={answers[q.id] ?? null} revealed={false} onPick={(oi) => setAnswers((a) => ({ ...a, [q.id]: oi }))} index={i} total={list.length} />
          <div className="row wrap between">
            <button type="button" className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><Icon d={PATHS.back} size={18} /> Previous</button>
            <button type="button" className={'btn small' + (flags[q.id] ? ' danger' : '')} onClick={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))}>
              {flags[q.id] ? 'Flagged for review' : 'Flag for review'}
            </button>
            {i + 1 < list.length
              ? <button type="button" className="btn primary" onClick={() => setI(i + 1)}>Next <Icon d={PATHS.next} size={18} /></button>
              : <button type="button" className="btn primary" onClick={submit}>Submit exam</button>}
          </div>
        </div>
        <aside className="card stack" style={{ flex: '1 1 260px', gap: 10, padding: 18 }}>
          <b>Questions</b>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(38px, 1fr))', gap: 6 }}>
            {list.map((x, k) => (
              <button key={x.id} type="button" onClick={() => setI(k)} aria-label={`Question ${k + 1}`}
                style={{
                  height: 36, borderRadius: 9, cursor: 'pointer', fontWeight: 800, fontSize: 13,
                  border: k === i ? '2px solid var(--accent-fg)' : flags[x.id] ? '2px solid var(--warn)' : '1px solid var(--line-2)',
                  background: answers[x.id] !== undefined ? 'var(--accent-tint)' : 'var(--raised)', color: answers[x.id] !== undefined ? 'var(--accent-fg)' : 'var(--faint)',
                }}>
                {k + 1}
              </button>
            ))}
          </div>
          <span className="sub small">Lime = answered. Orange border = flagged.</span>
          <span className="sub small">{domainById[q.domain].name}</span>
        </aside>
      </div>
    </div>
  );
}

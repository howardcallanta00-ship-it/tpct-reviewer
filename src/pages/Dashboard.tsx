import { Link, useNavigate } from 'react-router-dom';
import { DOMAINS, QUESTIONS, domainById, lessonById } from '../data';
import {
  answersToTarget, domainMastery, lastNDays, mistakes, nextMilestone, readiness, streakOf, tonightsPlan, useProgress, weakTopics,
} from '../store';
import { DomainTile, HexChart, Icon, PATHS, Ring, SegBar } from '../components/ui';
import { SearchBox } from '../components/Layout';
import { CountUp } from '../components/fx';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export function Dashboard() {
  const p = useProgress();
  const nav = useNavigate();
  const ready = readiness(p);
  const target = nextMilestone(ready);
  const need = answersToTarget(p, target);
  const plan = tonightsPlan(p);
  const planDomain = domainById[plan.domain];
  const answered = Object.keys(p.q).length;
  const week = lastNDays(p, 7);
  const streak = streakOf(p.days);
  const weak = weakTopics(p);
  const mistakeCount = mistakes(p).length;
  const daysLeft = p.examDate ? Math.ceil((new Date(p.examDate).getTime() - Date.now()) / 86_400_000) : null;

  // Up next: first unseen question in the weakest domain
  const upNext = QUESTIONS.find((q) => q.domain === plan.domain && !p.q[q.id]) ?? QUESTIONS.find((q) => !p.q[q.id]) ?? QUESTIONS[0];
  const practiceUrl = `/practice/go?d=${plan.domain}&mode=smart&n=10`;

  const steps = [
    { done: !!p.lessons[plan.lesson.id], title: `Learn: ${plan.lesson.title}`, meta: 'Concept card, about 4 min', to: `/learn/${plan.lesson.id}` },
    { done: plan.todayCount >= 10, title: `10 ${planDomain.short} questions`, meta: 'Your weakest domain, about 8 min', to: practiceUrl },
    mistakeCount > 0
      ? { done: false, title: `Retry ${mistakeCount} mistake${mistakeCount === 1 ? '' : 's'}`, meta: 'They come back until you get them right', to: '/practice/go?mode=mistakes' }
      : { done: false, title: 'Review the answer-key checks', meta: 'Learn where your reviewer may be wrong', to: '/key-checks' },
  ];
  const currentStep = steps.findIndex((s) => !s.done);

  const headline =
    answered === 0
      ? 'Let’s find out where you stand. Start with ten questions.'
      : ready >= 1
        ? 'Everything mastered. Keep it fresh with a mock exam.'
        : `${need} more right answer${need === 1 ? '' : 's'} and you hit your ${Math.round(target * 100)}% target.`;

  return (
    <div className="page stagger">
      <div className="row wrap between">
        <div>
          <span className="sub">{new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          <h1 className="d" style={{ fontSize: 34, fontWeight: 800 }}>{greeting()}</h1>
        </div>
        <div className="row wrap">
          <div style={{ width: 280 }} className="hide-sm"><SearchBox /></div>
          {daysLeft !== null && daysLeft >= 0 && (
            <span className="chip plain" style={{ padding: '10px 14px' }}>
              <Icon d={PATHS.clock} size={16} /> {daysLeft === 0 ? 'Exam today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} to exam`}
            </span>
          )}
        </div>
      </div>

      <section className="row wrap" style={{ alignItems: 'stretch', gap: 24 }}>
        <div className="card glow stack" style={{ flex: '999 1 520px', minWidth: 0, padding: 32, gap: 24 }}>
          <div aria-hidden="true" style={{ position: 'absolute', right: -80, top: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,244,90,.16), transparent 65%)' }} />
          <div className="row wrap" style={{ gap: 30, position: 'relative' }}>
            <Ring value={ready} target={target} size={190} />
            <div className="stack grow" style={{ gap: 12, flexBasis: 280 }}>
              <h2 className="d" style={{ fontSize: 36, lineHeight: 1.08, fontWeight: 800 }}>{headline}</h2>
              <p style={{ margin: 0, color: '#B9BDD8', fontSize: 16 }}>
                {answered} of {QUESTIONS.length} questions answered. Tonight focuses on {planDomain.name}.
              </p>
              <div className="row wrap" style={{ marginTop: 4 }}>
                <Link to={steps[currentStep === -1 ? 1 : currentStep].to} className="btn primary shine">
                  <Icon d={PATHS.play} size={16} fill="currentColor" /> Start tonight’s sprint
                </Link>
                <Link to="/exam" className="btn">Take a mock exam</Link>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 8, paddingTop: 20, borderTop: '1px solid var(--line-2)', position: 'relative' }}>
            {week.map((w) => (
              <div key={w.key} className="stack" style={{ alignItems: 'center', gap: 6 }}>
                <span className="small" style={{ fontWeight: 700, color: 'var(--faint)' }}>{w.label}</span>
                <span
                  style={{
                    width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: w.count ? 'var(--accent)' : w.isToday ? 'rgba(200,244,90,.08)' : '#1A1E3A',
                    border: w.isToday && !w.count ? '2px dashed var(--accent)' : 'none',
                  }}
                >
                  {w.count > 0 && <Icon d={PATHS.check} size={16} stroke="#0B0D1C" width={3.2} />}
                </span>
                <span className="small n muted">{w.count ? `${w.count}` : w.isToday ? 'today' : '–'}</span>
              </div>
            ))}
          </div>
          <span className="sub small" style={{ position: 'relative' }}>
            {streak > 0 ? `${streak}-day streak. ` : ''}{p.xp} XP earned.
          </span>
        </div>

        <div className="card stack" style={{ flex: '1 1 340px', gap: 8 }}>
          <div className="row between">
            <h2 className="d" style={{ fontSize: 21, fontWeight: 700 }}>Your TOPCIT shape</h2>
            <span className="row small muted" style={{ gap: 6 }}><span style={{ width: 14, borderTop: '2px dashed #fff' }} />70% target</span>
          </div>
          <HexChart items={DOMAINS.map((d) => ({ label: d.short, value: domainMastery(p, d.id), color: d.color }))} />
          <p className="sub" style={{ margin: 0 }}>
            {answered === 0
              ? 'Each corner is a domain. It fills in as you answer questions correctly.'
              : `${planDomain.name} is furthest from target, so it gets extra questions.`}
          </p>
        </div>
      </section>

      <section className="row wrap" style={{ alignItems: 'stretch', gap: 24 }}>
        <div className="card stack" style={{ flex: '999 1 520px', minWidth: 0, gap: 16 }}>
          <div className="row between wrap">
            <span className="row">
              <span className="tile" style={{ width: 36, height: 36, background: domainById[upNext.domain].color, borderRadius: 11 }}>
                <Icon d={domainById[upNext.domain].icon} size={18} stroke="#0B0D1C" />
              </span>
              <span className="stack">
                <span className="d" style={{ fontSize: 19, fontWeight: 700 }}>Up next</span>
                <span className="sub small">{domainById[upNext.domain].name}</span>
              </span>
            </span>
            <span className="sub small">{lessonById[upNext.notes.t]?.title}</span>
          </div>
          <p className="d" style={{ fontSize: 21, lineHeight: 1.3, fontWeight: 700 }}>{upNext.stem}</p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: 10 }}>
            {upNext.options.slice(0, 4).map((o, i) => (
              <button key={i} type="button" className="opt" style={{ minHeight: 50, fontSize: 15 }} onClick={() => nav(`/practice/go?d=${upNext.domain}&mode=smart&n=10&first=${upNext.id}&a=${i}`)}>
                <span className="k" style={{ width: 28, height: 28 }}>{i + 1}</span>
                <span className="grow">{o.text || 'See the figure'}</span>
              </button>
            ))}
          </div>
          <span className="sub small">Pick an answer to start a 10-question set.</span>
        </div>

        <div className="card stack" style={{ flex: '1 1 320px', gap: 4 }}>
          <div className="row between" style={{ marginBottom: 12 }}>
            <h2 className="d" style={{ fontSize: 19, fontWeight: 700 }}>Tonight’s plan</h2>
            <span className="sub n">{steps.filter((s) => s.done).length} of 3 done</span>
          </div>
          {steps.map((s, i) => (
            <Link key={i} to={s.to} className="row" style={{ alignItems: 'stretch', gap: 14, textDecoration: 'none', color: 'var(--text)' }}>
              <div className="stack" style={{ alignItems: 'center' }}>
                <span
                  style={{
                    width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontWeight: 800, fontSize: 13,
                    background: s.done ? 'var(--accent)' : 'transparent',
                    border: s.done ? 'none' : `2px solid ${i === currentStep ? 'var(--accent)' : 'var(--line-3)'}`,
                    color: i === currentStep ? 'var(--accent)' : 'var(--faint)',
                    boxShadow: i === currentStep ? '0 0 0 5px rgba(200,244,90,.12)' : 'none',
                  }}
                >
                  {s.done ? <Icon d={PATHS.check} size={16} stroke="#0B0D1C" width={3} /> : i + 1}
                </span>
                {i < 2 && <span style={{ flex: '1 1 auto', width: 2, minHeight: 20, background: '#2F3566' }} />}
              </div>
              <div style={{ paddingBottom: i < 2 ? 16 : 0 }}>
                <div style={{ fontWeight: 700, color: s.done ? '#8F94B5' : 'var(--text)', textDecoration: s.done ? 'line-through' : 'none' }}>{s.title}</div>
                <div className="sub">{s.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="stack" style={{ gap: 16 }}>
        <div className="row between wrap">
          <h2 className="d" style={{ fontSize: 24, fontWeight: 800 }}>Domains</h2>
          <span className="sub">Each segment is 10% mastery</span>
        </div>
        <div className="grid">
          {DOMAINS.map((d) => {
            const m = domainMastery(p, d.id);
            const qs = QUESTIONS.filter((q) => q.domain === d.id);
            const done = qs.filter((q) => p.q[q.id]).length;
            const w = weak.find((x) => x.l.domain === d.id)?.l;
            return (
              <Link key={d.id} to={`/learn?d=${d.id}`} className="card stack card-link" style={{ gap: 16, textDecoration: 'none', color: 'var(--text)', background: `linear-gradient(180deg, ${d.color}14, #151931 45%)` }}>
                <div className="row">
                  <DomainTile d={d} />
                  <span className="stack grow">
                    <span className="d" style={{ fontSize: 17, fontWeight: 700 }}>{d.name}</span>
                    <span className="sub small n">{qs.length} questions, {done} answered</span>
                  </span>
                  <span className="d n" style={{ fontSize: 26, fontWeight: 800 }}><CountUp value={Math.round(m * 100)} /><span style={{ fontSize: 14, color: 'var(--muted)' }}>%</span></span>
                </div>
                <SegBar value={m} color={d.color} />
                <span className="sub small">{w ? <>Weakest: <b style={{ color: 'var(--text)' }}>{w.title}</b></> : d.blurb}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

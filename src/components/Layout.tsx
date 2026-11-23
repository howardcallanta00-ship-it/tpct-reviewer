import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DOMAINS, KEY_CHECKS } from '../data';
import { domainMastery, mistakes, nextMilestone, readiness, streakOf, today, useProgress } from '../store';
import { Icon, PATHS } from './ui';
import { FxLayer, celebrate, haptic, toast } from './fx';

/** Celebrates readiness milestones and the first study of the day. */
function useCelebrations() {
  const p = useProgress();
  const ready = readiness(p);
  const prevMilestone = useRef<number | null>(null);
  const prevToday = useRef<number | null>(null);
  useEffect(() => {
    // The milestone already reached is the one just below the next milestone.
    const reached = [0, 0.1, 0.25, 0.5, 0.7, 0.85, 1].filter((m) => m <= ready + 0.0001).pop() ?? 0;
    if (prevMilestone.current !== null && reached > prevMilestone.current) {
      celebrate(140);
      haptic('win');
      toast(`${Math.round(reached * 100)}% exam ready`, {
        body: reached >= 1 ? 'Everything mastered. Incredible work.' : `Next milestone: ${Math.round(nextMilestone(ready) * 100)}%`,
        icon: PATHS.bolt,
      });
    }
    prevMilestone.current = reached;

    const todayCount = p.days[today()] ?? 0;
    if (prevToday.current === 0 && todayCount > 0) {
      const s = streakOf(p.days);
      toast(s > 1 ? `${s}-day streak` : 'Streak started', { body: 'Come back tomorrow to keep it going.', icon: PATHS.flame, color: '#FF9F43' });
    }
    prevToday.current = todayCount;
  }, [ready, p.days]);
}

export function Brand() {
  return (
    <NavLink to="/" className="brand">
      <span className="brand-mark"><Icon d={PATHS.bolt} size={20} fill="#0B0D1C" /></span>
      <span className="d" style={{ fontSize: 21, fontWeight: 800 }}>TOPCIT Sprint</span>
    </NavLink>
  );
}

export function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) nav('/search?q=' + encodeURIComponent(q.trim()));
  };
  return (
    <form onSubmit={submit} role="search">
      <label className="search">
        <Icon d={PATHS.search} size={18} />
        <span className="sr-only">Search</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a concept, like RAID" autoFocus={autoFocus} />
      </label>
    </form>
  );
}

export function Layout() {
  const p = useProgress();
  const mistakeCount = mistakes(p).length;
  const streak = streakOf(p.days);
  const location = useLocation();
  useCelebrations();
  return (
    <div className="shell">
      <FxLayer />
      <aside className="sidebar">
        <Brand />
        <nav aria-label="Main" className="stack" style={{ gap: 2 }}>
          <NavLink to="/" end className="nav-link"><Icon d={PATHS.grid} />Dashboard</NavLink>
          <NavLink to="/learn" className="nav-link"><Icon d={PATHS.layers} />Learn concepts</NavLink>
          <NavLink to="/practice" className="nav-link"><Icon d={PATHS.help} />Practice</NavLink>
          <NavLink to="/exam" className="nav-link"><Icon d={PATHS.clock} />Mock exam</NavLink>
          <NavLink to="/mistakes" className="nav-link">
            <Icon d={PATHS.undo} />
            <span className="grow">Mistakes</span>
            {mistakeCount > 0 && <span className="badge" style={{ background: 'var(--bad-bg)', color: 'var(--bad-text)' }}>{mistakeCount}</span>}
          </NavLink>
          <NavLink to="/key-checks" className="nav-link">
            <Icon d={PATHS.alert} />
            <span className="grow">Key checks</span>
            <span className="badge" style={{ background: 'var(--warn-chip)', color: 'var(--warn-text)' }}>{KEY_CHECKS.length}</span>
          </NavLink>
          <NavLink to="/saved" className="nav-link"><Icon d={PATHS.bookmark} />Saved</NavLink>
          <NavLink to="/settings" className="nav-link"><Icon d={PATHS.gear} />Progress and settings</NavLink>
        </nav>
        <div className="stack" style={{ gap: 2 }}>
          <span className="sub small" style={{ padding: '0 12px 6px' }}>Domains</span>
          {DOMAINS.map((d) => (
            <Link key={d.id} to={`/learn?d=${d.id}`} className="nav-link" style={{ minHeight: 38, fontSize: 14 }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: d.color, flex: 'none' }} />
              <span className="grow">{d.short}</span>
              <span className="n small" style={{ color: 'var(--faint)' }}>{Math.round(domainMastery(p, d.id) * 100)}%</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 'auto', padding: 16, borderRadius: 18, background: 'var(--streak-bg)', border: '1px solid var(--streak-line)' }} className="row">
          <span className={'tile' + (streak > 0 ? ' flame-anim' : '')} style={{ width: 36, height: 36, background: '#FF9F43', borderRadius: 11 }}><Icon d={PATHS.flame} size={18} fill="#241D12" /></span>
          <span className="stack" style={{ lineHeight: 1.2 }}>
            <b className="n" style={{ color: 'var(--streak-text)' }}>{streak}-day streak</b>
            <span className="small" style={{ color: 'var(--streak-sub)' }}>Best: {Math.max(p.bestStreak, streak)} days</span>
          </span>
        </div>
      </aside>
      <main className="main">
        <div key={location.pathname} className="route">
          <Outlet />
        </div>
      </main>
      <nav className="tabbar" aria-label="Main">
        <NavLink to="/" end className="tab"><Icon d={PATHS.home} size={22} />Home</NavLink>
        <NavLink to="/learn" className="tab"><Icon d={PATHS.layers} size={22} />Learn</NavLink>
        <NavLink to="/practice" className="tab"><Icon d={PATHS.help} size={22} />Practice</NavLink>
        <NavLink to="/exam" className="tab"><Icon d={PATHS.clock} size={22} />Exam</NavLink>
        <NavLink to="/mistakes" className="tab">
          <Icon d={PATHS.undo} size={22} />Mistakes
          {mistakeCount > 0 && (
            <span style={{ position: 'absolute', top: 4, right: '22%', minWidth: 18, height: 18, borderRadius: 9, background: 'var(--bad)', color: '#0B0D1C', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
              {mistakeCount}
            </span>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

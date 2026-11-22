import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './ui';

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const COLORS = ['#C8F45A', '#7C9CFF', '#3DDBB4', '#FFB547', '#FF7A6B', '#C792EA', '#FF8CC6'];

// ---------- Haptics ----------
export function haptic(kind: 'ok' | 'bad' | 'tap' | 'win') {
  try {
    const pattern = kind === 'ok' ? 18 : kind === 'bad' ? [35, 50, 35] : kind === 'win' ? [20, 40, 20, 40, 60] : 8;
    navigator.vibrate?.(pattern);
  } catch {
    /* not supported */
  }
}

// ---------- Event bus ----------
type ToastMsg = { id: number; title: string; body?: string; icon: string; color: string; out?: boolean };
const toastListeners = new Set<(t: ToastMsg) => void>();
const confettiListeners = new Set<(n: number) => void>();
let nextId = 1;

export function toast(title: string, opts: { body?: string; icon: string; color?: string }) {
  const t = { id: nextId++, title, body: opts.body, icon: opts.icon, color: opts.color ?? 'var(--accent)' };
  toastListeners.forEach((l) => l(t));
}

export function celebrate(amount = 90) {
  if (reduced()) return;
  confettiListeners.forEach((l) => l(amount));
}

// ---------- Global layers (mounted once in Layout) ----------
export function FxLayer() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [bursts, setBursts] = useState<{ id: number; pieces: { x: number; left: number; dur: number; delay: number; spin: number; color: string; w: number }[] }[]>([]);

  useEffect(() => {
    const onToast = (t: ToastMsg) => {
      setToasts((list) => [...list.slice(-2), t]);
      setTimeout(() => setToasts((list) => list.map((x) => (x.id === t.id ? { ...x, out: true } : x))), 2600);
      setTimeout(() => setToasts((list) => list.filter((x) => x.id !== t.id)), 2950);
    };
    const onConfetti = (n: number) => {
      const id = nextId++;
      const pieces = Array.from({ length: n }, () => ({
        left: Math.random() * 100,
        x: (Math.random() - 0.5) * 240,
        dur: 1.6 + Math.random() * 1.6,
        delay: Math.random() * 0.35,
        spin: (Math.random() - 0.5) * 1440,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        w: 6 + Math.random() * 6,
      }));
      setBursts((b) => [...b, { id, pieces }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 3800);
    };
    toastListeners.add(onToast);
    confettiListeners.add(onConfetti);
    return () => {
      toastListeners.delete(onToast);
      confettiListeners.delete(onConfetti);
    };
  }, []);

  return (
    <>
      <div className="toaster" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={'toast' + (t.out ? ' out' : '')}>
            <span className="tile" style={{ background: t.color }}><Icon d={t.icon} size={18} stroke="#0B0D1C" width={2.4} /></span>
            <span className="stack" style={{ lineHeight: 1.25 }}>
              <b>{t.title}</b>
              {t.body && <span className="sub small">{t.body}</span>}
            </span>
          </div>
        ))}
      </div>
      {bursts.map((b) => (
        <div key={b.id} className="confetti" aria-hidden="true">
          {b.pieces.map((p, i) => (
            <i
              key={i}
              style={{
                left: `${p.left}%`, width: p.w, height: p.w * 1.5, background: p.color,
                ['--x' as string]: `${p.x}px`, ['--dur' as string]: `${p.dur}s`, ['--delay' as string]: `${p.delay}s`, ['--spin' as string]: `${p.spin}deg`,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

// ---------- Particle burst on an element ----------
export function Burst({ color = '#3DDBB4', count = 14 }: { color?: string; count?: number }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      r: (360 / count) * i + Math.random() * 14,
      d: -(38 + Math.random() * 34),
      c: i % 3 === 0 ? '#C8F45A' : color,
      s: 5 + Math.random() * 5,
    })),
  );
  return (
    <span className="burst" aria-hidden="true">
      {pieces.map((p, i) => (
        <i key={i} style={{ background: p.c, width: p.s, height: p.s, ['--r' as string]: `${p.r}deg`, ['--d' as string]: `${p.d}px` }} />
      ))}
    </span>
  );
}

// ---------- Count-up number ----------
export function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(reduced() ? target : 0);
  const from = useRef(0);
  useEffect(() => {
    if (reduced()) {
      setV(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setV(a + (target - a) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

export function CountUp({ value, ms }: { value: number; ms?: number }) {
  const v = useCountUp(value, ms);
  return <>{Math.round(v)}</>;
}

// ---------- Confirm dialog ----------
export function Confirm({ title, body, confirm, cancel = 'Keep going', onConfirm, onCancel, danger }: {
  title: string; body: ReactNode; confirm: string; cancel?: string; onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onCancel]);
  return (
    <div className="modal-back" onClick={onCancel}>
      <div className="modal card stack" style={{ gap: 14 }} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <h2 className="d" style={{ fontSize: 22, fontWeight: 800 }}>{title}</h2>
        <div className="sub" style={{ fontSize: 15 }}>{body}</div>
        <div className="row wrap" style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn" onClick={onCancel} autoFocus>{cancel}</button>
          <button type="button" className={'btn ' + (danger ? 'danger' : 'primary')} onClick={onConfirm}>{confirm}</button>
        </div>
      </div>
    </div>
  );
}

/** Scroll-linked reading progress bar. */
export function ReadProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div className="read-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

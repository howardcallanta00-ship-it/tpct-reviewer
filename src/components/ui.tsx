import { Fragment, useEffect, useState, type ReactNode } from 'react';
import type { DomainInfo } from '../types';

export const PATHS = {
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  grid: 'M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17v.5',
  clock: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 9v4l2 2M9 2h6',
  undo: 'M4 12a8 8 0 1 0 3-6.2M4 4v4h4',
  alert: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v5M12 16.5v.5',
  bookmark: 'M6 4h12v17l-6-4-6 4z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  back: 'M15 6l-6 6 6 6',
  next: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12l5 5L20 7',
  x: 'M6 6l12 12M18 6 6 18',
  play: 'M7 4l13 8-13 8z',
  bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z',
  flame: 'M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  key: 'M15 7a4 4 0 1 1-3.9 5H3v3h3v3h3v-3h2.1A4 4 0 0 1 15 7z',
};

export function Icon({ d, size = 20, stroke = 'currentColor', fill = 'none', width = 2 }: { d: string; size?: number; stroke?: string; fill?: string; width?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={fill === 'none' ? stroke : 'none'} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Tiny formatter: **bold**, `code` and line breaks. */
export function Md({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <span className={'md ' + (className ?? '')}>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
        return (
          <Fragment key={i}>
            {p.split('\n').map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
    </span>
  );
}

export function Ring({ value, target = 0.7, size = 180, stroke = 16, label = 'exam ready' }: { value: number; target?: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;
  const pct = Math.round(value * 100);
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Readiness ${pct} percent, target ${Math.round(target * 100)} percent`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#262B55" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={stroke} strokeLinecap="round" strokeOpacity={value < 0.005 ? 0 : 1}
          strokeDasharray={`${Math.max(0.001, value) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray .8s ease' }}
        />
        <g transform={`rotate(${target * 360} ${size / 2} ${size / 2})`}>
          <line x1={size / 2} y1={size / 2 - r - stroke / 2 - 4} x2={size / 2} y2={size / 2 - r + stroke / 2 + 4} stroke="#fff" strokeWidth={3} strokeLinecap="round" />
        </g>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="d n" style={{ fontSize: size * 0.28, fontWeight: 800, lineHeight: 1 }}>
          {pct}
          <span style={{ fontSize: size * 0.13 }}>%</span>
        </span>
        {label && <span className="sub small">{label}</span>}
      </div>
    </div>
  );
}

export function HexChart({ items, target = 0.7, compact = false }: { items: { label: string; value: number; color: string }[]; target?: number; compact?: boolean }) {
  const W = 400;
  const H = compact ? 260 : 300;
  const cx = 200;
  const cy = H / 2;
  const R = compact ? 80 : 100;
  const ang = items.map((_, i) => ((-90 + (360 / items.length) * i) * Math.PI) / 180);
  const pt = (r: number, i: number) => [cx + r * Math.cos(ang[i]), cy + r * Math.sin(ang[i])];
  const poly = (fn: (i: number) => number) => ang.map((_, i) => pt(fn(i), i).map((v) => v.toFixed(1)).join(',')).join(' ');
  const label = items.map((it, i) => it.label + ' ' + Math.round(it.value * 100) + ' percent').join(', ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={'Mastery by domain: ' + label}>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={poly(() => R * f)} fill="none" stroke="#262B55" strokeWidth="1" />
      ))}
      {ang.map((_, i) => {
        const [x, y] = pt(R, i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#262B55" strokeWidth="1" />;
      })}
      <polygon points={poly(() => R * target)} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 5" />
      <polygon points={poly((i) => R * Math.max(0.03, items[i].value))} fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" style={{ transition: 'all .6s ease' }} />
      {items.map((it, i) => {
        const [x, y] = pt(R * Math.max(0.03, it.value), i);
        return <circle key={i} cx={x} cy={y} r="6" fill={it.color} stroke="#151931" strokeWidth="2.5" />;
      })}
      {items.map((it, i) => {
        const [x, y] = pt(R + (compact ? 16 : 22), i);
        const cos = Math.cos(ang[i]);
        const sin = Math.sin(ang[i]);
        const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
        const by = sin < -0.9 ? y - 16 : sin > 0.9 ? y + 6 : y - 4;
        return (
          <g key={'l' + i}>
            <text x={x} y={by} textAnchor={anchor} fill="#C9CCE3" fontFamily="Manrope, sans-serif" fontSize="12.5" fontWeight="700">{it.label}</text>
            <text x={x} y={by + 16} textAnchor={anchor} fill={it.color} fontFamily="Bricolage Grotesque, sans-serif" fontSize="14" fontWeight="800">{Math.round(it.value * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

export function DomainTile({ d, size = 46 }: { d: DomainInfo; size?: number }) {
  return (
    <span className="tile" style={{ width: size, height: size, background: d.color, boxShadow: `0 8px 20px -10px ${d.color}`, borderRadius: size * 0.3 }}>
      <Icon d={d.icon} size={size * 0.48} stroke="#0B0D1C" />
    </span>
  );
}

export function SegBar({ value, color }: { value: number; color: string }) {
  const filled = Math.round(value * 10);
  return (
    <div className="seg-bar" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} style={i < filled ? { background: color } : undefined} />
      ))}
    </div>
  );
}

export function ZoomImg({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const url = import.meta.env.BASE_URL + src;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={{ padding: 0, border: 0, background: 'none', alignSelf: 'flex-start', maxWidth: '100%' }} aria-label="Enlarge image">
        <img className="q-img" src={url} alt={alt} loading="lazy" />
      </button>
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)} role="dialog" aria-label="Enlarged image">
          <img src={url} alt={alt} />
        </div>
      )}
    </>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: 40 }}>
      <h2 className="d" style={{ fontSize: 22 }}>{title}</h2>
      {children && <div className="sub" style={{ marginTop: 8 }}>{children}</div>}
    </div>
  );
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

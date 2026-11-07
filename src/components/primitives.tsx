import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Avatar, Breadcrumb, Card, Empty, Table, Tabs, Tag, Tooltip, type TableProps, type TabsProps } from 'antd';
import { avatarGradients, kpiTones, tones, shadows, type KpiTone, type Tone } from '../tokens.js';
import { logos } from '../brand.js';
import { useLinkRenderer } from '../provider.js';

// Pure UI: every value comes from props, nothing is fetched, no business logic.

/** The three soft background blobs; put it once at the top of the app (the AppShell already does). */
export function AppBackground() {
  return (
    <div className="auf-bg" aria-hidden>
      <span className="b1" />
      <span className="b2" />
      <span className="b3" />
    </div>
  );
}

export function Logo({ variant = 'white', height = 40, src, alt = 'Algeria United Foundation' }: { variant?: 'white' | 'green'; height?: number; src?: string; alt?: string }) {
  return <img src={src ?? logos[variant]} alt={alt} style={{ height, width: 'auto', display: 'block' }} />;
}

export function GlassCard({ title, extra, children, style, bodyStyle, className }: {
  title?: ReactNode; extra?: ReactNode; children: ReactNode; style?: CSSProperties; bodyStyle?: CSSProperties; className?: string;
}) {
  return (
    <Card className={`auf-glass${className ? ` ${className}` : ''}`} variant="borderless" title={title} extra={extra} style={style} styles={{ body: bodyStyle }}>
      {children}
    </Card>
  );
}

// ---------------------------------------------------------------- page header
export interface Crumb { label: ReactNode; href?: string; onClick?: () => void }

export function PageHeader({ title, crumbs = [], actions, subtitle }: { title: ReactNode; crumbs?: Crumb[]; actions?: ReactNode; subtitle?: ReactNode }) {
  const Link = useLinkRenderer();
  return (
    <div style={{ marginBottom: 20 }}>
      {crumbs.length > 0 && (
        <Breadcrumb
          style={{ marginBottom: 6 }}
          items={crumbs.map((c) => ({
            title: c.href ? Link({ href: c.href, children: c.label }) : c.onClick ? <a onClick={c.onClick}>{c.label}</a> : c.label,
          }))}
        />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <h1 className="auf-page-title">{title}</h1>
          {subtitle && <div className="auf-muted" style={{ marginTop: 4 }}>{subtitle}</div>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{actions}</div>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- tabs bar
/** Tabs inside a glass card (the page's main tab bar). */
export function TabsBar(props: TabsProps) {
  return (
    <GlassCard bodyStyle={{ paddingTop: 4 }}>
      <Tabs {...props} />
    </GlassCard>
  );
}

// ---------------------------------------------------------------- KPI
export function KpiRow({ children }: { children: ReactNode }) {
  return <div className="auf-kpi-row">{children}</div>;
}

export function KpiCard({ label, value, sub, icon, tone = 'solid', alert = false, href, onClick, hint }: {
  label: string; value: ReactNode; sub?: ReactNode; icon: ReactNode; tone?: KpiTone; alert?: boolean;
  /** opens a filtered list */ href?: string; onClick?: () => void; /** tooltip of a clickable card */ hint?: string;
}) {
  const Link = useLinkRenderer();
  const card = (
    <div
      className="auf-glass auf-glass-kpi auf-kpi-card"
      style={{
        padding: 18, display: 'flex', gap: 16, alignItems: 'flex-start',
        borderColor: alert ? 'rgba(252,165,165,.9)' : undefined, background: alert ? 'rgba(254,226,226,.55)' : undefined,
      }}
    >
      <span className="auf-icon-tile" style={kpiTones[alert ? 'danger' : tone]}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div className="auf-muted auf-kpi-label" style={{ fontWeight: 700, fontSize: 14 }} title={label}>{label}</div>
        <div className="auf-num" style={{ fontSize: 28, fontWeight: 800, color: alert ? '#b91c1c' : '#054535', lineHeight: 1.25 }}>{value}</div>
        {sub && <div className="auf-muted" style={{ fontSize: 13 }}>{sub}</div>}
      </div>
    </div>
  );
  const wrap = (node: ReactNode) => (hint ? <Tooltip title={hint}>{node}</Tooltip> : node);
  if (href) return wrap(Link({ href, className: 'auf-kpi-link', 'aria-label': hint ? `${label}: ${hint}` : label, children: card }));
  if (onClick)
    return wrap(
      <div role="button" tabIndex={0} className="auf-kpi-link" onClick={onClick} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>{card}</div>,
    );
  return card;
}

// ---------------------------------------------------------------- tags, badges, dots, progress
/** Status tag: pick a generic tone, or pass exact colours. Apps map their own statuses to tones. */
export function StatusTag({ label, tone = 'neutral', colors }: { label: ReactNode; tone?: Tone; colors?: { bg: string; color: string; border: string } }) {
  const s = colors ?? tones[tone] ?? tones.neutral;
  return <Tag style={{ background: s.bg, color: s.color, borderColor: s.border, fontWeight: 700, marginInlineEnd: 0 }}>{label}</Tag>;
}

/** Small pill badge (counts, sizes, short codes). */
export function Badge({ children, tone = 'neutral', title }: { children: ReactNode; tone?: Tone; title?: string }) {
  const s = tones[tone] ?? tones.neutral;
  const el = (
    <span className="auf-num" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '1px 10px', borderRadius: 999, background: s.bg, color: s.color, fontWeight: 800, fontSize: 12 }}>
      {children}
    </span>
  );
  return title ? <Tooltip title={title}>{el}</Tooltip> : el;
}

export function ColorDot({ color, size = 10 }: { color: string; size?: number }) {
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: 999, background: color, flex: 'none' }} />;
}

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="auf-bar-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="auf-bar-fill" style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
    </div>
  );
}

// ---------------------------------------------------------------- avatar
/** Photo when `src` loads, otherwise the first letter on a gradient (index picks the gradient). */
export function UserAvatar({ name, src, size = 40, index = 0, ring, online = false }: {
  name: string; src?: string | null; size?: number; index?: number; /** coloured ring (e.g. a person type) */ ring?: string; online?: boolean;
}) {
  const av = (
    <Avatar
      aria-hidden
      size={size}
      src={src || undefined}
      onError={() => true /* falls back to the letter */}
      style={{
        flex: 'none', background: avatarGradients[Math.abs(index) % avatarGradients.length], color: '#fff', fontWeight: 800,
        fontSize: size * 0.42, lineHeight: `${size}px`, boxShadow: ring ? `0 0 0 2px ${ring}` : shadows.avatar,
      }}
    >
      {name.trim().charAt(0)}
    </Avatar>
  );
  return online ? <span className="auf-online">{av}</span> : av;
}

// ---------------------------------------------------------------- empty state, filter bar
export function EmptyState({ description, action, compact = false }: { description: ReactNode; action?: ReactNode; compact?: boolean }) {
  return (
    <Empty image={compact ? Empty.PRESENTED_IMAGE_SIMPLE : Empty.PRESENTED_IMAGE_DEFAULT} description={<span className="auf-muted">{description}</span>}>
      {action}
    </Empty>
  );
}

/** Row of filters (selects, search, segmented) with an optional count/summary at the end. */
export function FilterBar({ children, end }: { children: ReactNode; end?: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
      {children}
      {end && <span className="auf-muted auf-num" style={{ marginInlineStart: 'auto' }}>{end}</span>}
    </div>
  );
}

// ---------------------------------------------------------------- data table
/** Clicks on buttons, links, selects, checkboxes or their popups keep their own job (never a row click). */
export const isInteractiveClick = (e: MouseEvent) =>
  !!(e.target as HTMLElement).closest(
    'button, a, input, textarea, label, .ant-select, .ant-select-dropdown, .ant-checkbox-wrapper, .ant-dropdown, .ant-dropdown-menu, .ant-popover, .ant-picker, .ant-picker-dropdown, .ant-modal-root, .ant-drawer, .ant-table-selection-column, .ant-table-row-expand-icon-cell, [role="button"], [role="combobox"]',
  );

/** Ant Design table in a glass card: sticky header, tabular numbers, empty state, optional clickable rows. */
export function DataTable<T extends object>({ title, extra, emptyText, onRowClick, highlightKey, rowClassName, card = true, ...table }: TableProps<T> & {
  title?: ReactNode; extra?: ReactNode; emptyText?: ReactNode; onRowClick?: (row: T) => void;
  /** the row with this key flashes ~3 s (e.g. reached through a link) */ highlightKey?: string | number; card?: boolean;
}) {
  const rk = table.rowKey;
  const keyOf = (r: T, i: number) => (typeof rk === 'function' ? rk(r, i) : (r as Record<string, unknown>)[String(rk ?? 'key')]) as string | number;
  const t = (
    <Table<T>
      size="small"
      scroll={{ x: 'max-content' }}
      sticky
      locale={{ emptyText: <EmptyState compact description={emptyText ?? '—'} /> }}
      {...table}
      rowClassName={(r, i, ind) => [
        typeof rowClassName === 'function' ? rowClassName(r, i, ind) : rowClassName,
        onRowClick ? 'auf-row-clickable' : '',
        highlightKey !== undefined && keyOf(r, i) === highlightKey ? 'auf-row-flash' : '',
      ].filter(Boolean).join(' ')}
      onRow={(r, i) => ({ ...(table.onRow?.(r, i) ?? {}), onClick: onRowClick ? (e) => { if (!isInteractiveClick(e)) onRowClick(r); } : table.onRow?.(r, i)?.onClick })}
    />
  );
  return card ? <GlassCard title={title} extra={extra}>{t}</GlassCard> : t;
}

/** Drawer and modal styles are global (styles.css); add className="auf-drawer" to a Drawer for the glass panel. */
export const drawerProps = { rootClassName: 'auf-drawer', width: 420 } as const;

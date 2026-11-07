// Algeria United Foundation design tokens: the SINGLE source of truth for the look.
// Values are taken unchanged from the media ERP (src/theme/tokens.ts, global.css, antdTheme.ts).
// Change a value here, rebuild, and every component, the CSS variables and the Ant Design theme follow.

/** Brand green scale (the foundation's ERP palette). */
export const brand = {
  50: '#ecf7f2',
  100: '#d2eee2',
  200: '#a7dcc6',
  400: '#2fb38c',
  500: '#12936f',
  600: '#0d8664',
  700: '#0a7a5c',
  800: '#075f48',
  900: '#054535',
  950: '#032b21',
} as const;

export const colors = {
  pageBg: '#eef6f2',
  text: brand[950],
  title: brand[900],
  textMuted: 'rgba(7, 95, 72, 0.7)',
  label: brand[800],
  fieldBorder: '#cfe7dd',
  fieldFocusBorder: brand[400],
  fieldFocusRing: 'rgba(47, 179, 140, 0.18)',
  cellBorder: '#d7ece3',
  white: '#ffffff',
  danger: '#b91c1c',
  dangerStrong: '#dc2626',
  warning: '#92400e',
  warningStrong: '#f59e0b',
  info: '#0369a1',
  infoStrong: '#0284c7',
  neutral: '#64748b',
  overlay: 'rgba(3, 43, 33, 0.35)',
  rowFlash: 'rgba(250, 204, 21, 0.35)',
  presence: '#22c55e',
} as const;

export const gradients = {
  /** sidebar and dark bands */
  sidebar: `linear-gradient(to bottom, ${brand[900]}, ${brand[700]} 55%, ${brand[500]})`,
  /** horizontal header band */
  header: `linear-gradient(to left, ${brand[900]}, ${brand[700]}, ${brand[500]})`,
  /** floating action button */
  fab: `linear-gradient(to bottom right, ${brand[600]}, ${brand[800]})`,
  /** progress bars */
  progress: `linear-gradient(to left, ${brand[400]}, ${brand[700]})`,
  /** KPI icon tile, "gradient" tone */
  kpi: `linear-gradient(135deg, #6ee7b7, ${brand[600]})`,
} as const;

/** Letter avatars: one gradient per person, picked by a stable index. */
export const avatarGradients = [
  'linear-gradient(135deg, #34d399, #0d9488)',
  'linear-gradient(135deg, #2dd4bf, #0891b2)',
  'linear-gradient(135deg, #a3e635, #059669)',
  `linear-gradient(135deg, #10b981, ${brand[900]})`,
  `linear-gradient(135deg, #4ade80, ${brand[700]})`,
  'linear-gradient(135deg, #22d3ee, #0f766e)',
  'linear-gradient(135deg, #6ee7b7, #16a34a)',
] as const;

/** Page background: three soft blobs drawn as radial gradients (no blur filter, cheap to render). */
export const backgroundBlobs = [
  { size: 700, color: '110, 231, 183', alpha: [0.6, 0.25] },
  { size: 600, color: '153, 246, 228', alpha: [0.7, 0.28] },
  { size: 660, color: '217, 249, 157', alpha: [0.5, 0.2] },
] as const;

export const glass = {
  bg: 'rgba(255, 255, 255, 0.42)',
  border: 'rgba(255, 255, 255, 0.55)',
  topbarBg: 'rgba(255, 255, 255, 0.78)',
  blur: 14, // px, only where content scrolls underneath (sticky top bar)
  modalBlur: 24,
  maskBlur: 4,
} as const;

export const shadows = {
  card: '0 20px 25px -5px rgba(5, 69, 53, 0.05), 0 8px 10px -6px rgba(5, 69, 53, 0.05)',
  kpi: '0 20px 25px -5px rgba(5, 69, 53, 0.10), 0 8px 10px -6px rgba(5, 69, 53, 0.10)',
  elevated: '0 25px 50px -12px rgba(5, 69, 53, 0.18)',
  sidebar: '0 25px 50px -12px rgba(5, 69, 53, 0.3)',
  hover: '0 12px 24px -10px rgba(5, 69, 53, 0.35)',
  primaryButton: '0 10px 15px -3px rgba(10, 122, 92, 0.3)',
  avatar: '0 4px 10px rgba(5, 69, 53, 0.18)',
} as const;

export const radius = {
  xl: 24, // sidebar, header bands, modals
  lg: 16, // cards, KPI, icon tiles
  md: 14, // fields, menu items
  sm: 10, // table cells, small tiles
  pill: 999, // buttons, tags, segmented
} as const;

/** 4-px based spacing used by the layouts. */
export const spacing = { xxs: 4, xs: 6, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;

export const typography = {
  /** Arabic first (Tajawal, bundled), Latin falls back to the same family then system fonts. */
  fontFamily: "'Tajawal', 'Cairo', 'Segoe UI', Tahoma, sans-serif",
  weights: { regular: 400, medium: 500, bold: 700, extraBold: 800 },
  sizes: { xs: 12, sm: 13, base: 14, md: 15, lg: 17, kpi: 28, pageTitle: 26 },
  lineHeight: { tight: 1.25, base: 1.3, relaxed: 1.6 },
  /** numbers: tabular, Western digits (as in the foundation's sheets) */
  numeric: 'tabular-nums',
} as const;

export const motion = {
  fast: '0.15s',
  base: '0.2s',
  slow: '0.9s',
  easeOut: 'cubic-bezier(.2, .8, .2, 1)',
  hoverLift: 'translateY(-2px)',
  rowFlashDuration: '3s',
} as const;

export const layout = {
  sidebarWidth: 264,
  sidebarCollapsed: 84,
  topbarHeight: 64,
  gutter: 12, // space around the floating sidebar and top bar
  mobileBreakpoint: 992, // below: the sidebar becomes a drawer
} as const;

/** Generic tones for tags and badges (apps map their own statuses onto these). */
export type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'orange' | 'violet';
export const tones: Record<Tone, { bg: string; color: string; border: string }> = {
  neutral: { bg: 'rgba(100,116,139,.12)', color: '#334155', border: '#cbd5e1' },
  success: { bg: 'rgba(18,147,111,.10)', color: '#0a7a5c', border: '#a7dcc6' },
  warning: { bg: 'rgba(251,191,36,.16)', color: '#92400e', border: '#fcd34d' },
  orange: { bg: 'rgba(249,115,22,.12)', color: '#c2410c', border: '#fdba74' },
  info: { bg: 'rgba(14,165,233,.10)', color: '#0369a1', border: '#7dd3fc' },
  danger: { bg: 'rgba(239,68,68,.12)', color: '#b91c1c', border: '#fca5a5' },
  violet: { bg: 'rgba(139,92,246,.12)', color: '#5b21b6', border: '#c4b5fd' },
};

/** KPI icon tile tones. */
export type KpiTone = 'solid' | 'amber' | 'teal' | 'gradient' | 'danger';
export const kpiTones: Record<KpiTone, { background: string; color: string; boxShadow?: string }> = {
  solid: { background: brand[700], color: '#fff', boxShadow: shadows.primaryButton },
  amber: { background: 'rgba(251,191,36,.2)', color: '#b45309' },
  teal: { background: 'rgba(45,212,191,.2)', color: '#0f766e' },
  gradient: { background: gradients.kpi, color: '#fff' },
  danger: { background: 'rgba(239,68,68,.15)', color: '#b91c1c' },
};

export const tokens = { brand, colors, gradients, avatarGradients, backgroundBlobs, glass, shadows, radius, spacing, typography, motion, layout, tones, kpiTones };
export type Tokens = typeof tokens;

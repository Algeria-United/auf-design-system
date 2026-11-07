import { brand, colors, glass, layout, radius, shadows, typography, motion, gradients } from './tokens.js';

// The tokens as CSS custom properties (written to dist/tokens.css by the build, also usable at runtime).
export function cssVariables(): Record<string, string> {
  const v: Record<string, string> = {};
  for (const [k, c] of Object.entries(brand)) v[`--brand-${k}`] = c;
  v['--page-bg'] = colors.pageBg;
  v['--text'] = colors.text;
  v['--title'] = colors.title;
  v['--text-muted'] = colors.textMuted;
  v['--field-border'] = colors.fieldBorder;
  v['--cell-border'] = colors.cellBorder;
  v['--danger'] = colors.danger;
  v['--overlay'] = colors.overlay;
  v['--row-flash'] = colors.rowFlash;
  v['--presence'] = colors.presence;
  v['--glass-bg'] = glass.bg;
  v['--glass-border'] = glass.border;
  v['--glass-topbar-bg'] = glass.topbarBg;
  v['--glass-blur'] = `${glass.blur}px`;
  v['--glass-shadow'] = shadows.card;
  v['--glass-shadow-kpi'] = shadows.kpi;
  v['--shadow-elevated'] = shadows.elevated;
  v['--shadow-sidebar'] = shadows.sidebar;
  v['--shadow-hover'] = shadows.hover;
  v['--gradient-sidebar'] = gradients.sidebar;
  v['--gradient-progress'] = gradients.progress;
  v['--gradient-fab'] = gradients.fab;
  for (const [k, r] of Object.entries(radius)) v[`--radius-${k}`] = `${r}px`;
  v['--font-family'] = typography.fontFamily;
  v['--motion-fast'] = motion.fast;
  v['--motion-base'] = motion.base;
  v['--ease-out'] = motion.easeOut;
  v['--sidebar-width'] = `${layout.sidebarWidth}px`;
  v['--sidebar-collapsed'] = `${layout.sidebarCollapsed}px`;
  return v;
}

export const cssVariablesText = () =>
  `:root {\n${Object.entries(cssVariables()).map(([k, val]) => `  ${k}: ${val};`).join('\n')}\n}\n`;

// @auf/design-system: Algeria United Foundation ERP look (tokens, Ant Design theme, UI components).
// Also import the styles once: import '@auf/design-system/styles.css';
export * from './tokens.js';
export { cssVariables, cssVariablesText } from './cssVars.js';
export { antdTheme } from './antd-theme.js';
export { logos, faviconFiles, foundation } from './brand.js';
export { DesignSystemProvider, useLinkRenderer, type LinkRenderer } from './provider.js';
export {
  AppBackground, Logo, GlassCard, PageHeader, TabsBar, KpiRow, KpiCard, StatusTag, Badge, ColorDot, ProgressBar,
  UserAvatar, EmptyState, FilterBar, DataTable, isInteractiveClick, drawerProps, type Crumb,
} from './components/primitives.js';
export { AppShell, type AppShellProps, type NavItem, type ShellUser, type LanguageOption } from './components/AppShell.js';

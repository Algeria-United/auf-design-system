# @auf/design-system

The look of the Algeria United Foundation (مؤسسة الجزائر المتحدة الخيرية) internal ERPs, as one package:
design tokens, the Ant Design theme, RTL-first UI components (app shell, page header, KPI cards, tables,
tags, avatars…), the Tajawal font and the foundation's logos and favicon.

It is **UI only**: components receive their data through props. No network calls, no business logic,
no keys. The same look as the media office ERP (the first app built with it).

## Install (from GitHub, pinned tag)

```bash
npm install github:<owner>/auf-design-system#v0.1.0
```

`package.json` then contains `"@auf/design-system": "github:<owner>/auf-design-system#v0.1.0"`.
The package builds itself on install (`prepare` script). Always pin a tag: never install from a branch.

Peer dependencies (install them in the app): `react` 18, `react-dom` 18, `antd` 5 (≥ 5.29), `@ant-design/icons` 5.

**Vite:** exclude the package from dependency pre-bundling, so the logo and font files keep their URLs:

```ts
// vite.config.ts
export default defineConfig({ plugins: [react()], optimizeDeps: { exclude: ['@auf/design-system'] } });
```

## Usage

```tsx
import { createRoot } from 'react-dom/client';
import arEG from 'antd/locale/ar_EG';
import { Link, useNavigate, useLocation } from 'react-router';
import { DesignSystemProvider, AppShell, PageHeader, KpiRow, KpiCard, DataTable, StatusTag } from '@auf/design-system';
import '@auf/design-system/styles.css';

createRoot(document.getElementById('root')!).render(
  // link: how components render internal links (here: React Router). Default: a plain <a href>.
  <DesignSystemProvider locale={arEG} link={({ href, children, ...rest }) => <Link to={href} {...rest}>{children}</Link>}>
    <App />
  </DesignSystemProvider>,
);

function Layout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <AppShell
      sectionTitle="اسم القسم"
      nav={[{ key: '/', label: 'لوحة التحكم', icon: <HomeOutlined /> }]}
      selectedKey={pathname}
      onNavigate={navigate}
      user={{ name: currentUser.name, role: 'مسؤول', avatarSrc: currentUser.photoUrl }}
      onLogout={signOut}
      languages={[{ value: 'ar', label: 'ع' }, { value: 'fr', label: 'FR', disabled: true }]}
      storageKey="my-app.sidebar"
    >
      {children}
    </AppShell>
  );
}
```

### Components

| Component | What it is |
|---|---|
| `DesignSystemProvider` | RTL, theme, Arabic locale (passed in), Ant Design `App`, link renderer |
| `AppShell` | floating gradient sidebar (logo + `sectionTitle` + nav; a drawer on phones), sticky glass top bar (avatar, name, role, language switch, logout, `topbarExtra`) |
| `PageHeader` | breadcrumb, title, subtitle, actions |
| `TabsBar` | Ant Design `Tabs` (all props) inside a glass card |
| `KpiRow`, `KpiCard` | KPI grid (wraps instead of shrinking); card with icon tile, tone, `alert`, `href`/`onClick` |
| `DataTable` | Ant Design `Table` (all props) in a glass card, sticky header, empty state, `onRowClick` (ignores clicks on buttons/selects/checkboxes and their popups), `highlightKey` (row flashes ~3 s) |
| `StatusTag`, `Badge` | tag/pill in a generic `tone` (`neutral`, `success`, `warning`, `orange`, `info`, `danger`, `violet`) or exact colours |
| `UserAvatar` | photo when it loads, otherwise the first letter on a gradient; `ring`, `online` dot |
| `EmptyState`, `FilterBar`, `GlassCard`, `ProgressBar`, `ColorDot`, `Logo`, `AppBackground` | as named |
| `drawerProps` | spread on an Ant Design `Drawer` for the glass panel |

Map your own statuses onto tones in your app (e.g. `{ done: 'success', late: 'danger' }`): the package knows no business status.

### Tokens

Single source of truth: `src/tokens.ts`. The build writes the same values as CSS variables in `dist/tokens.css`
(imported by `styles.css`) and the Ant Design theme reads them (`antdTheme`).

| Token | Value | Role |
|---|---|---|
| `brand[700]` / `--brand-700` | `#0a7a5c` | primary (buttons, links, selected) |
| `brand[900]` / `--brand-900` | `#054535` | titles |
| `brand[950]` / `--text` | `#032b21` | body text |
| `brand[400]` | `#2fb38c` | focus border, progress start |
| `colors.pageBg` / `--page-bg` | `#eef6f2` | page background (with 3 soft blobs) |
| `colors.textMuted` / `--text-muted` | `rgba(7,95,72,.7)` | secondary text |
| `gradients.sidebar` | `#054535 → #0a7a5c 55% → #12936f` | sidebar, dark bands |
| `glass.bg` / `--glass-bg` | `rgba(255,255,255,.42)` + white border | cards |
| `glass.topbarBg` + blur 14px | `rgba(255,255,255,.78)` | sticky top bar |
| `shadows.card` / `kpi` | soft green shadows | cards / KPI |
| `radius` | xl 24 · lg 16 · md 14 · sm 10 · pill 999 | modals/sidebar · cards · fields · cells · buttons/tags |
| `spacing` | 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 | layouts |
| `typography.fontFamily` | Tajawal (bundled, OFL) → Cairo → Segoe UI → Tahoma | Arabic and Latin |
| `typography.weights` | 400 · 500 · 700 · 800 | text · medium · labels/buttons · titles/numbers |
| `typography.sizes` | 12 · 13 · 14 · 15 · 17 · 26 (page title) · 28 (KPI) | |
| `motion` | 0.15s hover lift (−2px) · 0.2s sidebar · 0.9s progress · 3s row flash | |
| `layout` | sidebar 264 / 84 px, top bar 64 px, gutter 12 px, drawer below 992 px | |

### RTL notes

- Everything is designed right-to-left first: `DesignSystemProvider` sets `direction="rtl"`; set `<html lang="ar" dir="rtl">` in `index.html`.
- Use logical CSS (`margin-inline-start`, `inset-inline-end`, `padding-inline`) in your own styles, never left/right, so a future French (LTR) mode works by switching `direction`.
- The sidebar sits on the right in RTL (start side); the mobile drawer opens from the right.
- Numbers use Western digits and tabular figures (`.auf-num`); dates as `DD/MM/YYYY`.
- Arabic locale for Ant Design: `import arEG from 'antd/locale/ar_EG'` (passed to the provider).

### Light / dark

The look is light only (as in the media ERP). The colours are CSS variables, so a dark set can be added
later without touching components.

### Brand

- `logos.white` (on the dark sidebar), `logos.green` (light backgrounds, reports), also at `@auf/design-system/brand/logo-*.png`.
- Favicon set in `dist/brand/favicon/`: copy into your app's `public/` and add:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#0a7a5c" />
```

## Develop

```bash
npm install
npm run build      # dist/ (ESM + types + tokens.css + fonts + brand)
npm run demo       # every component with sample data, http://localhost:5180
```

Release: bump `version`, commit, `git tag v0.x.y`, `git push --tags`. Apps update by changing the tag in their `package.json`.

The Tajawal font is under the SIL Open Font License (`src/fonts/OFL.txt`).

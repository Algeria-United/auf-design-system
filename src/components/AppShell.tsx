import { useEffect, useState, type ReactNode } from 'react';
import { Button, Drawer, Grid, Layout, Menu, Segmented, Tooltip } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { layout } from '../tokens.js';
import { AppBackground, Logo, UserAvatar } from './primitives.js';

export interface NavItem { key: string; label: string; icon?: ReactNode }
export interface ShellUser { name: string; role?: string; avatarSrc?: string | null; avatarIndex?: number; ring?: string }
export interface LanguageOption { value: string; label: string; disabled?: boolean }

export interface AppShellProps {
  /** e.g. "مكتب الإعلام والتواصل": shown under the logo */
  sectionTitle: string;
  nav: NavItem[];
  selectedKey?: string;
  onNavigate: (key: string) => void;
  user: ShellUser;
  onLogout?: () => void;
  languages?: LanguageOption[];
  language?: string;
  onLanguageChange?: (value: string) => void;
  /** extra items in the top bar (e.g. who is online), before the language switch */
  topbarExtra?: ReactNode;
  /** replace the white logo (default: the foundation logo) */
  logoSrc?: string;
  /** remember the collapsed sidebar under this localStorage key (omit = not remembered) */
  storageKey?: string;
  labels?: { menu?: string; expand?: string; collapse?: string; logout?: string; language?: string };
  children: ReactNode;
}

const L = { menu: 'القائمة', expand: 'توسيع القائمة', collapse: 'طي القائمة', logout: 'تسجيل الخروج', language: 'اللغة' };

function SideMenu({ p, collapsed, onPick }: { p: AppShellProps; collapsed: boolean; onPick: (k: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{ flex: 'none', padding: collapsed ? '16px 12px' : '18px 22px', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
        {collapsed ? (
          <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ width: 44, overflow: 'hidden', direction: 'ltr' }}>
              <div style={{ width: 160 }}><Logo variant="white" height={38} src={p.logoSrc} /></div>
            </div>
          </div>
        ) : (
          <>
            <Logo variant="white" height={42} src={p.logoSrc} />
            <div style={{ marginTop: 10, fontWeight: 800, fontSize: 15, color: '#fff' }}>{p.sectionTitle}</div>
          </>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={p.selectedKey ? [p.selectedKey] : []}
        className="auf-side-menu"
        style={{ border: 'none', padding: '10px 10px', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', fontWeight: 700, fontSize: 14 }}
        items={p.nav.map((i) => ({ key: i.key, icon: i.icon, label: i.label }))}
        onClick={({ key }) => onPick(String(key))}
      />
    </div>
  );
}

/**
 * The ERP frame: floating gradient sidebar (drawer on mobile), sticky glass top bar with the user,
 * language switch and logout, and the page content. Navigation is passed in; routing stays in the app.
 */
export function AppShell(p: AppShellProps) {
  const labels = { ...L, ...p.labels };
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const [collapsed, setCollapsed] = useState(() => {
    try { return !!p.storageKey && localStorage.getItem(p.storageKey) === '1'; } catch { return false; }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (!p.storageKey) return;
    try { localStorage.setItem(p.storageKey, collapsed ? '1' : '0'); } catch { /* storage unavailable */ }
  }, [collapsed, p.storageKey]);
  const width = collapsed ? layout.sidebarCollapsed : layout.sidebarWidth;
  const pick = (k: string) => { setDrawerOpen(false); p.onNavigate(k); };

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
      <AppBackground />
      {!isMobile && (
        <Layout.Sider
          width={layout.sidebarWidth}
          collapsedWidth={layout.sidebarCollapsed}
          collapsed={collapsed}
          trigger={null}
          className="auf-brand-gradient"
          style={{ position: 'fixed', insetBlock: 12, insetInlineStart: 12, height: 'calc(100vh - 24px)', borderRadius: 24, overflow: 'hidden', zIndex: 20 }}
        >
          <SideMenu p={p} collapsed={collapsed} onPick={pick} />
        </Layout.Sider>
      )}
      <Drawer
        open={isMobile && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        width={280}
        closable={false}
        styles={{ body: { padding: 0 }, content: { background: 'transparent' } }}
        rootClassName="auf-mobile-nav"
      >
        <div className="auf-brand-gradient" style={{ height: '100%', borderRadius: 0 }}>
          <SideMenu p={p} collapsed={false} onPick={pick} />
        </div>
      </Drawer>

      <Layout style={{ marginInlineStart: isMobile ? 0 : width + 24, transition: 'margin .2s', position: 'relative', zIndex: 1 }}>
        <Layout.Header
          className="auf-glass auf-glass-blur auf-topbar"
          style={{
            position: 'sticky', top: 12, zIndex: 10, margin: isMobile ? '12px 12px 0' : '12px 12px 0 0', height: layout.topbarHeight,
            padding: isMobile ? '0 8px' : '0 16px', display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12, lineHeight: 'normal', minWidth: 0,
          }}
        >
          {isMobile ? (
            <Button type="text" icon={<MenuOutlined />} aria-label={labels.menu} onClick={() => setDrawerOpen(true)} />
          ) : (
            <Tooltip title={collapsed ? labels.expand : labels.collapse}>
              <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} aria-label={collapsed ? labels.expand : labels.collapse} onClick={() => setCollapsed((c) => !c)} />
            </Tooltip>
          )}
          <div style={{ flex: 1, minWidth: 0, fontWeight: 800, color: '#054535', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {isMobile && screens.sm ? p.sectionTitle : null}
          </div>
          {p.topbarExtra}
          {p.languages && p.languages.length > 1 && (
            <Segmented size="small" value={p.language ?? p.languages[0].value} options={p.languages} aria-label={labels.language} onChange={(v) => p.onLanguageChange?.(String(v))} />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <UserAvatar name={p.user.name} src={p.user.avatarSrc} index={p.user.avatarIndex} ring={p.user.ring} size={38} />
            {!isMobile && (
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 800, color: '#054535' }}>{p.user.name}</div>
                {p.user.role && <div className="auf-muted" style={{ fontSize: 12 }}>{p.user.role}</div>}
              </div>
            )}
          </div>
          {p.onLogout && (
            <Tooltip title={labels.logout}>
              <Button type="text" icon={<LogoutOutlined />} aria-label={labels.logout} onClick={p.onLogout} />
            </Tooltip>
          )}
        </Layout.Header>
        <Layout.Content style={{ padding: isMobile ? '20px 16px 32px' : '24px 24px 40px 12px' }}>{p.children}</Layout.Content>
      </Layout>
    </Layout>
  );
}

import { createContext, useContext, type ReactNode } from 'react';
import { App as AntApp, ConfigProvider, type ThemeConfig } from 'antd';
import type { Locale } from 'antd/es/locale';
import { antdTheme } from './antd-theme.js';

/** How the components render an internal link (default: a plain <a href>). Pass your router's Link. */
export type LinkRenderer = (props: { href: string; className?: string; children: ReactNode; 'aria-label'?: string }) => ReactNode;
const defaultLink: LinkRenderer = ({ href, className, children, ...rest }) => <a href={href} className={className} {...rest}>{children}</a>;
const LinkCtx = createContext<LinkRenderer>(defaultLink);
export const useLinkRenderer = () => useContext(LinkCtx);

/**
 * Wrap the whole app once: RTL, the foundation theme, Ant Design's App (message/modal hooks).
 * `locale`: pass Ant Design's Arabic locale (import arEG from 'antd/locale/ar_EG') or another one.
 */
export function DesignSystemProvider({
  children,
  locale,
  direction = 'rtl',
  theme = antdTheme,
  link,
}: {
  children: ReactNode;
  locale?: Locale;
  direction?: 'rtl' | 'ltr';
  theme?: ThemeConfig;
  link?: LinkRenderer;
}) {
  return (
    <ConfigProvider direction={direction} locale={locale} theme={theme}>
      <AntApp>
        <LinkCtx.Provider value={link ?? defaultLink}>{children}</LinkCtx.Provider>
      </AntApp>
    </ConfigProvider>
  );
}

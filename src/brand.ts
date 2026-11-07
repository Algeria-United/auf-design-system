// Foundation brand assets shipped with the package (files in ./brand next to this module).
// Bundlers (Vite, webpack 5) turn these into real asset URLs. With Vite, exclude the package from
// dependency pre-bundling (see README) so the URLs keep pointing at the files.
export const logos = {
  /** white logo: on the dark sidebar and dark bands */
  white: new URL('./brand/logo-white.png', import.meta.url).href,
  /** green logo: on light backgrounds (login page, printed reports) */
  green: new URL('./brand/logo-green.png', import.meta.url).href,
} as const;

/** Favicon set. Copy these files into your app's public folder and use the <link> tags from the README. */
export const faviconFiles = [
  'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png', 'apple-touch-icon.png',
  'android-chrome-192x192.png', 'android-chrome-512x512.png', 'maskable-512x512.png',
] as const;

export const foundation = {
  nameAr: 'مؤسسة الجزائر المتحدة الخيرية',
  nameLatin: 'Algeria United Foundation',
  short: 'AUF',
  themeColor: '#0a7a5c',
} as const;

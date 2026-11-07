// Build: TypeScript -> dist (ESM + .d.ts), tokens -> dist/tokens.css, then copy styles, fonts and brand files.
import { execSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true });
execSync('npx tsc -p tsconfig.json', { cwd: root, stdio: 'inherit' });

const { cssVariablesText } = await import(pathToFileURL(join(dist, 'cssVars.js')).href);
writeFileSync(join(dist, 'tokens.css'), `/* generated from src/tokens.ts: do not edit */\n${cssVariablesText()}`);
cpSync(join(root, 'src', 'styles.css'), join(dist, 'styles.css'));
for (const d of ['fonts', 'brand']) { mkdirSync(join(dist, d), { recursive: true }); cpSync(join(root, 'src', d), join(dist, d), { recursive: true }); }
console.log('built dist/');

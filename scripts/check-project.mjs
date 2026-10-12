import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverSiteRoutes } from './site-routes.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const failures = [];
const exists = async p => Boolean(await stat(p).catch(() => null));
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const clients = (await readdir(root + 'src/sites', { withFileTypes: true })).filter(e => e.isDirectory()).map(e => e.name);
const registry = await readFile(root + 'src/registry.ts', 'utf8');
const routes = await discoverSiteRoutes(root + 'src/sites');
for (const entry of await readdir(root + 'src/pages')) {
  if (entry !== 'index.astro') failures.push(`Client pages must live in src/sites/<client>/pages, not src/pages/${entry}`);
}
for (const client of clients) {
  for (const file of ['site.ts', 'Layout.astro', 'styles.css']) {
    if (!await exists(`${root}src/sites/${client}/${file}`)) failures.push(`${client}: missing ${file}`);
  }
  if (!await exists(`${root}src/sites/${client}/pages/index.astro`)) failures.push(`${client}: missing homepage`);
  if (!registry.includes(`./sites/${client}/site`)) failures.push(`${client}: missing registry entry`);
  const layout = await readFile(`${root}src/sites/${client}/Layout.astro`, 'utf8');
  if (!layout.includes('"./styles.css"')) failures.push(`${client}: layout must import its stylesheet`);
}
for (const file of await files(root + 'src')) {
  if (!/\.(astro|tsx?|css|js)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');
  const owner = file.match(/src\/(?:sites|pages)\/([^/]+)\//)?.[1];
  if (!clients.includes(owner)) continue;
  for (const match of text.matchAll(/(?:from\s*|import\s*)["']([^"']+)["']/g)) {
    if (!match[1].startsWith('.')) continue;
    const target = path.resolve(path.dirname(file), match[1]);
    const other = target.match(/src\/sites\/([^/]+)\//)?.[1];
    if (other && other !== owner) failures.push(`${path.relative(root, file)} imports another client: ${other}`);
  }
}
for (const file of await files(root + 'public')) {
  const rel = path.relative(root + 'public', file);
  if (/\.(astro|tsx?|html|md)$/.test(file) || /(^|\/)(node_modules|package(?:-lock)?\.json|\.env[^/]*|\.DS_Store)(\/|$)/.test(rel)) {
    failures.push(`Development/reference file in public: ${rel}`);
  }
}
if (process.argv.includes('--built')) {
  const output = root + 'dist';
  if (!await exists(output)) failures.push('Run npm run build first');
  else {
    const outputFiles = await files(output);
    const available = new Set(outputFiles.map(f => path.relative(output, f)));
    for (const { pattern } of routes) {
      if (!pattern.includes('[') && !available.has(pattern.slice(1) + '/index.html')) failures.push(`Missing built client route: ${pattern}`);
    }
    for (const file of outputFiles) {
      const rel = path.relative(output, file);
      if (/\.(astro|tsx?|md)$/.test(file) || /(^|\/)(node_modules|references|src|\.env[^/]*|\.DS_Store)(\/|$)/.test(rel)) failures.push(`Source/reference file in build: ${rel}`);
      if (!file.endsWith('.html')) continue;
      const html = await readFile(file, 'utf8');
      for (const match of html.matchAll(/\b(?:href|src|poster)=["'](\/[^"']*)["']/g)) {
        if (match[1].startsWith('//')) continue;
        const target = decodeURIComponent(match[1].split(/[?#]/)[0]).replace(/^\//, '').replace(/\/$/, '');
        if (!available.has(target) && !available.has(`${target}/index.html`) && !available.has(`${target}.html`) && !(target === '' && available.has('index.html'))) failures.push(`${rel}: missing ${match[1]}`);
      }
    }
    if (available.has('frank-rahm-landscaping/index.html')) failures.push('Removed Frank Rahm site is still in output');
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'));
  process.exitCode = 1;
} else console.log(`Verified ${clients.length} independent clients${process.argv.includes('--built') ? ', published files, and local HTML links/assets' : ''}.`);

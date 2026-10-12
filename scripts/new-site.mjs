import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const [slug, name] = process.argv.slice(2);
if (!slug || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(slug) || !name) {
  console.error('Usage: npm run new:site -- client-slug "Client Name"');
  process.exit(1);
}
if (['index', 'sites', 'mockup-ar'].includes(slug)) {
  console.error('That slug is reserved; no files changed.');
  process.exit(1);
}
for (const location of ['src/sites/', 'src/pages/', 'public/sites/']) {
  if (await access(root + location + slug).then(() => true, () => false)) {
    console.error(`${location}${slug} already exists; no files changed.`);
    process.exit(1);
  }
}
const registryPath = root + 'src/registry.ts';
const registry = await readFile(registryPath, 'utf8');
const symbol = 'site_' + slug.replaceAll('-', '_');
if (!/export const sites = \[[^\]]*\] as const;/.test(registry)) throw new Error('Unrecognized registry format; no files changed.');
for (const dir of [`src/sites/${slug}/components`, `src/sites/${slug}/assets`, `src/sites/${slug}/pages`, `public/sites/${slug}`]) await mkdir(root + dir, { recursive: true });
const put = (file, text) => writeFile(root + file, text, { flag: 'wx' });
await put(`src/sites/${slug}/site.ts`, `export default ${JSON.stringify({ slug, name, description: 'Website preview' }, null, 2)} as const;\n`);
await put(`src/sites/${slug}/styles.css`, `@import "tailwindcss" source(none);\n@source "./";\n`);
await put(`src/sites/${slug}/Layout.astro`, `---\nimport "./styles.css";\nimport site from "./site";\nconst { title = site.name } = Astro.props;\n---\n<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>{title}</title>\n  </head>\n  <body><slot /></body>\n</html>\n`);
await put(`src/sites/${slug}/pages/index.astro`, `---\nimport Layout from "../Layout.astro";\nimport site from "../site";\n---\n<Layout>\n  <main class="mx-auto max-w-5xl px-6 py-16">\n    <h1 class="text-4xl font-bold">{site.name}</h1>\n  </main>\n</Layout>\n`);
await writeFile(registryPath, `import ${symbol} from "./sites/${slug}/site";\n` + registry.replace(/(export const sites = \[)([^\]]*)(\] as const;)/, (_, start, sites, end) => start + sites + (sites.trim() ? ', ' : '') + symbol + end));
console.log(`Created /${slug}. Edit src/sites/${slug}/pages and src/sites/${slug}.`);

import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, copyFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { discoverSiteRoutes } from './site-routes.mjs';
const run = promisify(execFile);

async function fixture(t, names) {
  const root = await mkdtemp(path.join(tmpdir(), 'mockup-routes-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const name of names) {
    const file = path.join(root, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, '');
  }
  return root;
}

test('client pages register stable root, nested, and dynamic route patterns', async t => {
  const root = await fixture(t, ['acme/pages/index.astro', 'acme/pages/contact.astro', 'acme/pages/services/index.astro', 'acme/pages/services/repair.astro', 'acme/pages/blog/[slug].astro', 'acme/pages/_draft.astro', 'acme/pages/_drafts/hidden.astro', 'acme/pages/notes.txt', 'acme/components/Header.astro']);
  const routes = await discoverSiteRoutes(root);
  assert.deepEqual(routes.map(r => r.pattern).sort(), ['/acme', '/acme/blog/[slug]', '/acme/contact', '/acme/services', '/acme/services/repair']);
  assert.ok(routes.every(r => r.entrypoint.startsWith(path.join(root, 'acme/pages'))));
});

test('ambiguous file and directory routes fail before building', async t => {
  const root = await fixture(t, ['acme/pages/about.astro', 'acme/pages/about/index.astro']);
  await assert.rejects(discoverSiteRoutes(root), /Duplicate client route: \/acme\/about/);
});

test('scaffolding creates client-owned pages and refuses to overwrite them', async t => {
  const root = await fixture(t, ['scripts/new-site.mjs', 'src/registry.ts']);
  await copyFile(new URL('./new-site.mjs', import.meta.url), path.join(root, 'scripts/new-site.mjs'));
  await writeFile(path.join(root, 'src/registry.ts'), 'export const sites = [] as const;\n');
  await run(process.execPath, [path.join(root, 'scripts/new-site.mjs'), 'acme', 'Acme']);
  const routes = await discoverSiteRoutes(path.join(root, 'src/sites'));
  assert.equal(routes[0].pattern, '/acme');
  const page = await readFile(routes[0].entrypoint, 'utf8');
  assert.match(page, /import Layout from "\.\.\/Layout.astro"/);
  await assert.rejects(run(process.execPath, [path.join(root, 'scripts/new-site.mjs'), 'acme', 'Replacement']));
  assert.equal(await readFile(routes[0].entrypoint, 'utf8'), page);
});

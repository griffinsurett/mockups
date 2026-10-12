import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function pageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries
    .filter(entry => !entry.name.startsWith('.') && !entry.name.startsWith('_'))
    .map(entry => entry.isDirectory()
      ? pageFiles(path.join(directory, entry.name))
      : entry.name.endsWith('.astro') ? [path.join(directory, entry.name)] : []));
  return files.flat().sort();
}

export async function discoverSiteRoutes(sitesDirectory) {
  const sites = (await readdir(sitesDirectory, { withFileTypes: true }))
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.')).sort((a, b) => a.name.localeCompare(b.name));
  const routes = [];
  const patterns = new Set();
  for (const site of sites) {
    const pagesDirectory = path.join(sitesDirectory, site.name, 'pages');
    for (const entrypoint of await pageFiles(pagesDirectory)) {
      const page = path.relative(pagesDirectory, entrypoint).split(path.sep).join('/')
        .replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
      const pattern = `/${site.name}${page ? '/' + page : ''}`;
      if (patterns.has(pattern)) throw new Error(`Duplicate client route: ${pattern}`);
      patterns.add(pattern);
      routes.push({ pattern, entrypoint });
    }
  }
  return routes;
}

/** Register client-owned pages using Astro's native route integration API. */
export default function siteRoutes() {
  return {
    name: 'client-site-routes',
    hooks: {
      'astro:config:setup': async ({ config, injectRoute }) => {
        const sitesDirectory = fileURLToPath(new URL('./src/sites/', config.root));
        for (const route of await discoverSiteRoutes(sitesDirectory)) injectRoute(route);
      },
    },
  };
}

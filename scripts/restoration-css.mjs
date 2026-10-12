import fs from 'node:fs/promises';
import postcss from 'postcss';
import tailwind from 'tailwindcss-legacy';
import { fileURLToPath } from 'node:url';

// Preserve the existing Tailwind 3 appearance while compiling locally.
// Only Restoration uses this compatibility compiler; other clients use Tailwind 4.
const root = fileURLToPath(new URL('../', import.meta.url));
export async function buildRestorationCss() {
  const result = await postcss([tailwind({
    content: [root + 'src/sites/actionrestoration/**/*.{astro,js}'],
    theme: {
      extend: {
        colors: {
          'navy-950': '#08172e', 'navy-900': '#0f2743', 'navy-700': '#244f79',
          'water-blue': '#5b99c0',
          'slate-ar-900': '#202d3d', 'slate-ar-700': '#4b5f75', 'slate-ar-200': '#d7e2ee', 'slate-ar-50': '#f5f8fc',
          'orange-600': '#d95b17', 'orange-500': '#f26a21', 'orange-100': '#ffe6d6',
        },
        fontFamily: { sora: ['"Sora"', '"Segoe UI"', 'sans-serif'], body: ['"Source Sans 3"', '"Segoe UI"', 'sans-serif'] },
        maxWidth: { site: '1180px' },
      },
    },
    corePlugins: { preflight: false },
  })]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', { from: undefined });
  const destination = root + 'src/sites/actionrestoration/generated/utilities.css';
  await fs.mkdir(root + 'src/sites/actionrestoration/generated', { recursive: true });
  // Avoid a watcher loop when no utility class changed.
  if (await fs.readFile(destination, 'utf8').catch(() => '') !== result.css) await fs.writeFile(destination, result.css);
}

export default function restorationCss() {
  return {
    name: 'restoration-css',
    hooks: {
      'astro:config:setup': async () => { await buildRestorationCss(); },
      'astro:server:setup': ({ server }) => {
        server.watcher.on('change', async (file) => {
          if (/src\/sites\/actionrestoration\/.*\.(astro|js)$/.test(file)) await buildRestorationCss();
        });
      },
    },
  };
}

# Mockups project rules

Follow the parent workspace AGENTS.md as well.

- Preserve each client's current design unless a visual change is requested.
- Page implementations belong only in `src/sites/<client>/pages/`.
- `src/pages/index.astro` is the hub. The site-routes integration registers client
  pages automatically; do not add wrapper pages or a second client pages folder.
- Supporting code, layout, metadata, and styles belong in `src/sites/<client>/`.
- Every client owns `styles.css`, imported by its own layout. Never import another
  client's stylesheet or components. The hub owns its styling separately.
- Use `npm run new:site -- slug "Client Name"` to scaffold a client.
- Keep active source out of `public/`; it contains runtime assets only.
- Historical exports belong in `references/`; one-off probes and screenshots go
  in the OS temporary directory, not here.
- Do not edit generated CSS, `.astro`, dependencies, or `dist` as source.
- Restoration's pinned Tailwind 3 compiler preserves its existing appearance.
  Do not replace it with Tailwind 4 as part of unrelated work.
- Run `npm run verify` after changes. For structural or stylesheet work, compare
  desktop and mobile rendering and verify client interactions as well.
- Do not deploy or change hosting access unless requested.

# Client Mockups

One Astro application containing five independently styled client showcase sites.
The hub is `/`; each client has a stable path such as `/alert-sprinkler`.

## Development

```sh
npm ci
npm run dev       # http://localhost:4444
npm run verify    # ownership checks, production build, local links/assets
npm run preview  # preview the production output
```

Use a supported native Node installation. Dependencies are installed locally;
`node_modules`, `.astro`, generated compatibility CSS, and `dist` are ignored.

## Where to edit

```text
src/pages/index.astro                 Showcase hub
src/sites/<client>/pages/*.astro      Actual page implementations and routes
src/sites/<client>/Layout.astro       Client document shell
src/sites/<client>/styles.css         Client stylesheet entry point
src/sites/<client>/components/        Client-owned components and interactions
src/sites/<client>/assets/            Imported assets processed by Astro
src/sites/<client>/site.ts            Hub name, slug, and description
src/registry.ts                      Explicit showcase list and order
src/hub/                             Hub layout and stylesheet
public/                              Runtime assets served unchanged
references/                          Historical design/source references, not published
```

Each client owns its pages alongside its layout, components, and styles.
`scripts/site-routes.mjs` registers those pages using [Astro’s `injectRoute` API](https://docs.astro.build/en/reference/integrations-reference/#injectroute-option).
Only the hub lives in `src/pages/`; there are no wrapper or duplicate client pages.
For example, `src/sites/alert-sprinkler/pages/contact.astro` serves
`/alert-sprinkler/contact`. Nested folders work the same way; `index.astro` serves
the containing path. Restart the dev server after adding, renaming, or removing
page files; edits to existing pages still hot-reload.

A client's layout imports only that client's stylesheet;
the hub has its own stylesheet. Component-scoped styles remain with their owning
components. Do not import another client's components or styling to start a site.

The three existing Tailwind 4 clients and the hub use explicit `@source` paths.
This prevents reference HTML and other clients from adding classes to their CSS.
Keep client-specific colors, fonts, and utilities in the owning site's stylesheet.

Public asset URLs from the original Astro clients are retained to preserve their
existing references. New assets should use `public/sites/<client>/`, or live in
`src/sites/<client>/assets/` when imported through Astro. Never put downloaded
webpages, source projects, package files, or credentials in `public/`.

## Adding a client

```sh
npm run new:site -- client-slug "Client Name"
```

This creates the page, layout, independent Tailwind stylesheet, metadata, and
registry entry. It refuses to overwrite an existing client. Edit the description
in `site.ts` and implement the pages and components in their owning folders.

Run `npm run verify` before sharing a build. Compare the client's desktop and
mobile views and test its navigation and interactive sections. Shared changes
require checking every client.

## Converted HTML mockups

Ebersole and Reactive Restoration now render as native Astro pages, without
whole-site iframe wrappers. Embedded maps remain ordinary map iframes.

- **Ebersole:** its existing CSS, classic scripts, fonts, and images were extracted
  without changing the design. Classic script order is preserved because the
  original scripts share globals. Browser-ignored malformed CSS was normalized
  to the rules the browser actually applied.
- **Restoration:** `public/mockup-ar` was the authoritative current design,
  including the pre-existing uncommitted homepage and CSS edits. Its pages now
  live under `src/sites/actionrestoration/pages/` and serve `/actionrestoration`. Header and footer are shared client components.
  The old browser CDN used Tailwind 3; a pinned local compatibility compiler
  preserves those utilities. `styles.css` preserves the original cascade through
  `base.css`, generated utilities, and `home.css`. The Astro integration generates
  utilities on startup/build and refreshes them when client source changes.
  Do not edit `generated/utilities.css` directly.

Other clients continue using Tailwind 4. A separate visual migration would be
needed before changing Restoration's utility engine.

Historical `.html` URLs redirect through `vercel.json` when hosted on Vercel.
Astro's portable `/mockup-ar`, `/actionrestoration/gallery`, and
`/actionrestoration/service` aliases also redirect to their current pages.
Use canonical client URLs for local previews. Hosting redirects are configuration
only until the next deployment; this reorganization does not deploy the site.

Frank Rahm Landscaping has been removed. Earlier source/design copies remain in
`references/`, outside the published output, for historical comparison.

## Reorganization verification — October 11, 2026

- `npm run verify` passed: five client boundaries, 20 built pages (including the
  hub), published-file checks, and local HTML links/assets.
- Compared all 19 client pages at 1440 × 900 and 390 × 900 viewports, using
  full-page captures with lazy-loaded content loaded and animations paused.
  All 38 page dimensions matched. Thirty-five comparisons had no pixels above
  a 12/255 per-channel difference threshold; the other three differed by less
  than 0.01%, limited to rendering/subpixel differences. The hub's two comparisons
  reflect the intentional HTML-to-Astro badge text change.
- Existing page markup for the ten original Astro client pages is unchanged;
  only their imports moved. The converted Restoration and Ebersole pages matched
  their original rendered designs at both sizes.
- No broken images or browser JavaScript errors were observed in the final
  comparison pass. Existing remote fonts/images were reused consistently for
  the comparisons; this is local verification, not a live-hosting audit.
- Nine interaction checks passed across the five clients: navigation, carousel
  controls, comparison slider, FAQ, Ebersole theme controls, responsive header,
  and the hydrated pricing selector. No forms were submitted.
- The new-client scaffold passed creation, overwrite protection, and invalid-slug
  checks in a temporary test project.
- Generated output and dependencies are no longer tracked. Git whitespace checks
  passed. No deployment, commit, or hosting access change was performed.

### Client-owned pages follow-up

All 19 client page implementations now live in `src/sites/<client>/pages/`.
Only relative imports changed inside the pages. Route discovery, nested routes,
duplicate-route rejection, and the updated scaffold are covered by
`npm run test:routes`. All 19 client URLs were checked on the dev server.

A second comparison against the pre-move production build covered 40 views
(including the hub) at desktop and mobile sizes. All dimensions matched; 38 views
had no pixels above the same 12/255 threshold, and the other two differed by less
than 0.001%. Compiled stylesheets were identical after normalizing generated
Astro scope IDs. Existing URLs, redirects, and public asset paths are preserved.

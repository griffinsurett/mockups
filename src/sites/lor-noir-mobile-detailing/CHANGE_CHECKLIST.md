# L’Or Noir Mobile Detailing conversion

Source: `src/sites/car-detailing-cen-fl/`. Original site and assets remain untouched.
New route: `/lor-noir-mobile-detailing`. Location: Miami, Florida.

## Completed
- [x] Duplicate into an independent site with its own pages, styles, components and assets.
- [x] Replace business name and route with L’Or Noir Mobile Detailing.
- [x] Replace the client logo with an original SVG wordmark and geometric emblem.
- [x] Shift warm yellow gold to champagne: #bca477 and #e4d5b5.
- [x] Replace Central Florida service areas and map with Miami and nearby areas.
- [x] Remove former owner and telephone details, social placeholders and dated Mother's Day promotion.
- [x] Replace inherited review claims with a three-step service section.
- [x] Make inquiry form a local demo; no submission, storage or external form integration.
- [x] Add concept disclosure, illustrative pricing notice and noindex metadata.

## Images and validation
- [x] Four original AI gallery photos saved as optimized WebP assets.
- [x] Three matched AI before/after pairs: exterior, interior, wheel.
- [x] Replace every inherited photo reference, including unknown-origin imagery.
- [x] Verify desktop/mobile layouts, navigation, comparison sliders, pricing and form.
- [x] Run `npm run verify` and inspect final diff and built assets.

Original gallery and before/after photos were client-supplied. Other original image provenance was not established, so no original photography is copied into this concept. New gallery assets are also reused in hero, service and supporting sections. Exact generation prompts and source outputs are recorded in `image-prompts.json`; generated with the built-in image tool.

## Validation evidence (2026-10-12)
- `npm run verify` passed: all 3 route tests, site isolation checks, production build and built link/asset checks.
- Native Apple silicon Chrome checked all 4 routes at 1440, 768 and 390px with no horizontal overflow.
- Mobile menu navigation, pricing selection ($225 SUV + $75 engine = $300), local demo form, slider keyboard and mouse drag all passed.
- All page images loaded; no browser JavaScript errors.
- Desktop/mobile hero and comparison sections visually inspected.
- Ten optimized WebP images exist in `public/sites/lor-noir-mobile-detailing/images/`; each has a generation prompt in `image-prompts.json`.
- Original site source and public assets have no Git changes. New built pages contain no original business identity or image references.
- Removed an untracked Finder `.DS_Store` file that blocked the public-output check.
- Local preview only; no deployment or hosting changes.

## Before using as a real business site
- [ ] Replace illustrative prices, service claims, hours and coverage with verified business details.
- [ ] Add real contact details, booking integration, privacy terms and genuine reviews if desired.
- [ ] Obtain explicit deployment instruction. No deployment is included in this task.

## Service-area update
- Removed the contact-page attribution block; company branding only, no owner/person identity.
- Miami, Florida remains the base. Service area uses an approximate 20-mile straight-line radius from Downtown Miami, with exact-address confirmation for municipal boundaries.
- Shared county-grouped town lists drive the homepage and contact page; footer reflects both counties.
- Southern Broward list: Hallandale Beach, Hollywood, Pembroke Park, West Park and Miramar. No countywide Broward coverage claimed.
- Geographic context: https://www.visitflorida.com/places-to-go/southeast/hollywood/ describes Hollywood as about 20 miles north of Miami.
- Validation: `npm run verify` passed; expanded service-area list checked at 1440px and 390px with no horizontal overflow.

## Expanded coverage and simplified presentation
- Removed the gallery caption at the user's request.
- Heading: Serving Miami and the Surrounding Areas.
- Replaced county groups with one shared town list on home/contact pages.
- Added Fort Lauderdale, Dania Beach, Davie, Plantation, Oakland Park, Wilton Manors and Pembroke Pines.
- This supersedes the earlier 20-mile coverage limit; removed that limit from visitor-facing copy.
- Validation: project verification passed; 39-town list and removed caption checked on desktop/mobile.

## Portfolio presentation and individual offers
- Removed visible AI/concept notices from footer, comparison copy and gallery messaging at user request. Image provenance remains documented internally.
- Added exterior-only ($70 sedan / $75 SUV) and interior-only ($140 sedan / $165 SUV) offers matching existing selector prices.
- Exterior image left, interior image right on desktop; image first on mobile. Offers appear below the complete detail on home and below the selector on pricing.
- Contact form remains local-only; review action does not submit or claim a booking was sent.
- Validation: `npm run verify` passed; desktop alternating images, mobile stacking, removed footer notice and both service-selection links checked in Chrome. Refreshed stale local React development modules during verification.

## Interior price update
- Interior-only starting/sedan price changed to $165 in both the offer and selector; SUV/truck interior price remains $165.

## Footer credit and policy links
- Added bottom-right Powered by Webmaxxers link using the existing site credit destination.
- Added styled, non-navigating Privacy Policy, Cookie Policy and Terms of Service links beside Explore.
- Project verification and desktop/mobile footer/link checks passed.

## Footer width and readable bottom bar
- Footer now matches header padding (64px desktop, 16px below 1024px) with no max-width cap.
- Bottom bar text is 16px with relaxed line height; #b3b3b3 on black measures 10.02:1 contrast, above WCAG AA normal-text minimum of 4.5:1. Credit link is lighter, with visible keyboard focus.
- Reference: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Project verification passed; browser checked alignment and no overflow at 1920px and 390px. This is a targeted footer check, not a full-site WCAG audit.

## Heraldic identity
- Replaced initial diamond wordmark with original scalable SVG heraldry: double-rimmed quartered shield, drawn LN initials, fleur-de-lis, mirrored lion supporters and engraved ornament in existing champagne gold.
- Header uses shield-only mark; hero displays full crest and wordmark on desktop and mobile; footer uses compact shield above full wordmark.
- Increased hero space to fit the complete identity without crowding the heading or buttons.
- Desktop/mobile hero and footer visually inspected; no horizontal overflow.

## Chosen supplied logo
- Replaced generated SVG crest with the exact user-selected PNG from Downloads, preserved byte-for-byte at `public/sites/lor-noir-mobile-detailing/images/lor-noir-logo.png`.
- Updated shared logo, header, hero, footer and contact rendering; full supplied lockup used throughout.
- Desktop/mobile rendering checked with no overflow; project verification passed.

# Pacific Rose Lactation website

Static site built with [Astro](https://astro.build). It builds to plain HTML files, so it runs on any static host
(Cloudflare Pages, Netlify) with no server or database to maintain.

## Run it on your computer

```bash
npm install
npm run dev          # site + editing dashboard: http://localhost:4321 and http://localhost:4321/admin
npm run dev:site     # site only, no dashboard
npm run build:local  # builds just the site to /dist (no Tina account needed)
npm run build        # what the host runs: builds the dashboard, then the site (needs the Tina variables below)
```

Needs Node 22 or newer. Locally the dashboard runs in "local mode" with no login and saves straight to the files.

## Where things live

Everything Whitney is likely to change is in plain content files. These are the files the editing dashboard
(CMS) will point at in the next phase.

| What | File |
| --- | --- |
| Parent stories (one file each) | `src/content/stories/*.md` |
| Bloom Circle schedule, venue, cancelled + extra dates, topics | `src/data/bloom.json` |
| Services, rates, insurance, "also supporting" | `src/data/services.json` |
| FAQ | `src/data/faq.json` |
| Bio, credentials, timeline, facts | `src/data/about.json` |
| Testimonials (home page) | `src/data/testimonials.json` |
| Phone, email, Instagram, booking link, photo, form endpoints | `src/data/site.json` |
| Affiliation logos | `src/data/affiliations.json` + `public/affiliations/` |

Layout, colors, and page structure live in `src/pages/`, `src/layouts/`, `src/components/`, and
`src/styles/global.css`. Brand colors are the variables at the top of `global.css`.

### Bloom Circle dates

Dates are calculated from the rule in `bloom.json` (1st and 3rd Wednesday) and re-calculated in the browser, so
the page never shows a past date and needs no rebuild. In the dashboard, use **Bloom Circle > Cancelled dates**
to skip a date and **Extra dates** to add a one-off session (format `2026-12-02`; the dashboard rejects other
formats). In the file they look like this:

```json
"cancelledDates": [{ "date": "2026-12-02", "note": "Thanksgiving week" }],
"extraDates": [{ "date": "2026-11-10", "note": "Guest speaker" }]
```

The weekday, week-of-month, and hour rules (`weekday`, `weeksOfMonth`, `startHour`, `endHour`) are not shown in
the dashboard on purpose. Edit them in `bloom.json` if the regular pattern ever changes.

### Parent stories

Copy an existing file in `src/content/stories/` and edit it. Fields: `title`, `tag`, `place` (Portland or
Astoria), `excerpt`, `going`, `worked`, `now`, `serviceLabel` (a service title, or `Join Bloom Circle`), `seoTitle`, `metaDescription`.

The six included stories are placeholders marked `sample: true`. Sample stories show a "Sample story" label and are
hidden from Google (`noindex`). When a story is replaced with a real one, set `sample: false`. Set `draft: true` to
hide a story completely. Only publish a real story with the parent's written permission.

## Editing dashboard (TinaCMS)

Whitney edits the site at `/admin` on the live site, with an email login and plain forms. Each change is saved to
the GitHub repository, and the host rebuilds the site, usually within a couple of minutes. She never needs a GitHub
account.

| In the dashboard | Edits |
| --- | --- |
| Parent stories | One entry per story. New stories start as hidden drafts. |
| Bloom Circle | Cancelled dates, extra dates, venue, topics |
| Services + rates | Services, rates, insurance badges |
| FAQ | Questions and answers |
| About Whitney | Bio, credentials, timeline |
| Testimonials | Quotes (placeholders are labeled) |
| Contact + site info | Phone, email, Instagram, booking link, her photo |

Layout and design changes are not in the dashboard. Those happen in the code.

### One-time setup

1. Create a private GitHub repository (for example under the Makerr Media account) and push this project to it.
2. Make an account at [tina.io](https://tina.io) and create a project from that repository (branch `main`).
   Add the live site address to the project's allowed site URLs.
3. Copy the project's **Client ID** and create a **Token** in the Tina dashboard.
4. On the host (Cloudflare Pages or Netlify), add two environment variables: `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`.
   Set the build command to `npm run build` and the output directory to `dist`.
5. In the Tina dashboard, invite Whitney by email under Users. The free plan allows two users, so that is
   Emily and Whitney. A third person needs a paid plan.
6. Whitney opens `/admin`, signs in, and edits.

Check Tina's current docs for the exact menu names and plan limits, since they can change.

### Good to know

- A change appears on the live site after the host finishes rebuilding. Remind Whitney it is not instant.
- Fields the dashboard does not show (the Bloom Circle schedule rules) are kept untouched when she saves.
- Keep `public/admin/` out of Git. It is generated during the build.
- `tina/__generated__/` is generated too, but keep it committed, except its `.cache` folder.

## Contact + reminder forms

The forms do not send anywhere until an endpoint is set in `src/data/site.json`
(`contactFormEndpoint`, `reminderFormEndpoint`). Until then, visitors see a message asking them to email
instead, so no inquiry is silently lost.

- **Netlify:** set the value to `netlify`. Submissions appear in the Netlify dashboard.
- **Formspree, Basin, Web3Forms, or similar:** paste the form's URL.

Test both forms on the live site from a phone before launch, and have submissions email Whitney and Emily.

## Putting it online

Use either host's "connect a Git repository" flow:

- Build command: `npm run build` (needs the two Tina variables above; use `npm run build:local` for a site-only preview)
- Output directory: `dist`
- While it's a preview, add the environment variable `PUBLIC_NOINDEX=true` so Google ignores it. Remove it at launch.

Quick preview without Git: build locally, then drag the `dist` folder onto the Netlify Drop page.

Update `site` in `astro.config.mjs` and `url` in `src/data/site.json` if the final domain differs from
pacificroselactation.com.

## Before launch

- [ ] Save Whitney's photo into `public/images/` and point `portraitPhoto` in `site.json` at it. It currently loads
      from the Squarespace image host and will break when that account is closed.
- [ ] Replace the affiliation logos with official files or written permission to use them.
- [ ] Confirm the Hedon and Gotham web font license, or keep Belleza and Montserrat (both free, self-hosted).
- [ ] Replace placeholder testimonials and sample stories with real ones (written permission first).
- [ ] Set the form endpoints and test both forms.
- [ ] Add redirects for every old Squarespace address in `public/_redirects`. Only `/work-with-me` is listed.
- [ ] Point the domain at the new host (change website records only, leave email records alone), then check email.
- [ ] Add the site to Google Search Console and submit `sitemap-index.xml`.

## Notes

- Astro is pinned to 5.18.2. `npm audit` lists Astro advisories that are fixed in Astro 7.4 or newer. They concern
  server rendering, server islands, image optimization, and dynamic attributes, none of which this static site uses,
  but plan to upgrade. Astro 7 needs Node 22.23.4 or newer, and the upgrade may need small config changes.
- Fonts are self-hosted through `@fontsource`, so visitors don't make requests to Google.

---
name: blog-cover
description: Make the cover image for one blog post on any site (a stageshow-style faux-UI illustration designed from the post's content). Use when a post has no featureImage, when CI says "Blog posts without a cover image", when asked to redo a post's cover, or to set up blog covers on a new site. Usage /blog-cover <slug>.
---

# Blog cover

One post, one unique 1280x720 cover PNG. Needs the `stageshow` skill (installed as `stageshow` or `skcriptshowcase`; find it with `ls -d ~/.claude/skills/{stageshow,skcriptshowcase}`; call it `$SS` below). Paths come from the site's config, so the same skill works on every site.

## 0. Config

Read `.claude/blog-cover.json` in the repo root. Fields (all paths relative to the repo; see `templates/blog-cover.config.example.json`):

- `posts`: folder of `<slug>.md` posts
- `out`: where `<slug>.png` goes (the blog list picks it up by filename)
- `sources`: where each cover's source folder `cover-<slug>/` is kept
- `template`: folder with `index.tsx` + `look.css`, the starting point and shared look
- `port`: preview port (one per repo, avoid clashes)
- `check`: command that fails when a post in the grid has no cover (optional)
- `preview`: blog list URL to look at the card in real Chrome

**No config yet (new site):** do the setup once, then continue.
1. Ask Karthik only what you can't read: where posts live, where PNGs should be served from, and the blog list URL. Read the site's CSS tokens/fonts yourself.
2. Create `template/` from `templates/skcript/` (index.tsx, look.css), then rewrite `look.css` to the site's fonts and accent colors (oklch, one accent, neutral terminals). Keep the structure: `.skc .ss-stage` tokens, dark field, paper field.
3. Write `.claude/blog-cover.json`. Optionally copy `templates/check-blog-covers.mjs` to `scripts/` and add a `check:covers` script to `package.json`.
4. Do not edit the site's pages or build; if `coverFor`-style lookup by filename doesn't exist, tell Karthik what to add.

## 1. Make the cover

1. Read `<posts>/<slug>.md` and `style.md` next to this file (spec, film command, variety table). A `STYLE.md` inside `template/` adds site rules and wins on conflict. Load `/stageshow` (or `/skcriptshowcase`) for the kit and rules.
2. Pick a composition not used by the 3 or 4 newest covers in `sources/`. Look at two of them first.
3. Make sure `$SS/examples/cover-_template/` exists and matches `template/` (the preview imports its `look.css`; copy it over if missing or stale). Create `$SS/examples/cover-<slug>/` (`index.tsx` + `cover.css`, from `template/`). Start the preview server on `port`, film, read the PNG, fix the largest fault, re-film until clean (2 to 4 rounds).
4. Copy the source: `cp -R $SS/examples/cover-<slug> <sources>/`. Stop the server.
5. Verify: run `check` if set, and open the blog list in real Chrome: the cover at card size, text still readable.
6. Do not commit or push unless asked. Report the PNG path and what the cover shows.

Never invent facts on the cover that the post doesn't support; say which strings are filler.

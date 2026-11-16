# Blog cover spec

Read first, in this order: `$SS/SKILL.md`, `references/craft.md`, `references/framing.md`. Then look at the 3 newest finished covers in `<sources>/` and their code.

## Sandbox and dev server
- Write only `$SS/examples/cover-<slug>/` (`index.tsx` + `cover.css`) and `<out>/<slug>.png`.
- Never edit `template/` (shared `look.css`), the kit, other examples, or site code.
- Root class: `skc cv-<code>`, `<code>` 3 to 5 letters unique to the slug (`grep -r "cv-<code>" $SS/examples/`). Nest every selector under `.cv-<code>`: the preview loads every example's CSS at once.
- The preview only sees example folders that existed when it started. Run your own: `cd $SS && node_modules/.bin/vite playground --config playground/vite.config.ts --port <port> --strictPort`. Restart after adding a folder. Stop it when done (`pkill -f "port <port>"`).

## Film command (the only renderer)
```
cd $SS && node scripts/film.mjs "http://127.0.0.1:<port>/?capture=cover-<slug>" --select '#example .ss-stage' --pad 0 --still --out <out>/<slug>.png
```
The output must be exactly 1280x720 (`sips -g pixelWidth -g pixelHeight <png>`). Without `--select '#example .ss-stage' --pad 0` you get the wrong size.
Rehearse: film the still, Read the PNG, fix the largest fault (framing first, then hierarchy, then polish), and film again. Usually 2 to 4 rounds. Clear every `framing:`, `cut by the crop`, `clipped` and `tight` line. `uneven gutters` against a card or sheet that runs off the bottom is a false positive.

## Style spec
- Stage `640x360`, filmed at 2x. A cover is shown at 384x216 (0.6x), so design for that size: real words are 15px or larger, the focal string 19 to 26px, and a big number up to 32px. Never use type under 13px.
- Look (Skcript profile; other sites: the `look.css` set up in SKILL.md step 0): `import '../cover-_template/look.css'`. It sets Inter, JetBrains Mono, the signal-red accent (`--ss-accent`, `--ss-accent-text`, `--ss-accent-soft`, `--sk-red`), neutral terminal colors and the fields.
- Fields (never pure white edge to edge; the cover has to hold its own edge on a white page): light gray (default), dark (`theme="dark"`), or warm paper (class `skc-paper`).
- Use one focal object, built from what the post is actually about (read its `gist`). Red goes only on the focal thing: one row, one number, one bar. Everything else is quiet gray.
- Use 3 to 7 real strings. The rest are `Bar` placeholders that vary in width. Don't use the post title as the headline: the card already prints it under the image.
- Use real chrome from the kit (`Window`, `Phone`, `Notification`, `chrome="terminal"`, `Chart`, `Badge`, `Avatar`, `Row`, `BrandMark`). No sparkles, purple, emoji icons or invented logos (no letter in a colored square). Never hand-draw an icon.
- Hard crop: the hero bleeds off one or two edges (only filler is cut). Hold one gutter, 32 to 56px, on every edge that doesn't bleed. A satellite straddles the hero's edge about half outside and covers chrome or filler, never the focal content.
- No near-tangents (edges 1 to 3px apart), no slivers at the stage edge, and no whole window floating with air on four sides.
- Don't use a `script`: covers are stills, so there's no compact layout and no motion.

## Variety guide (one family, never the same composition twice)
Keep a running tally in your notes. Within your batch, use each layout no more than twice and each field no more than about half the time. Across the 50, aim for roughly 55% light, 25% dark and 20% paper.

| Composition | Good for | Example in this set |
|---|---|---|
| Sidebar app window + terminal satellite (dark) | dev tools, CI, OpenFault | introducing-openfault |
| One chart or scorecard card, bottom bleed | cost, benchmarks, metrics | cost-per-task |
| Document + straddling card (paper) | invoices, compliance, contracts | ai-invoice-processing-guide |
| Terminal alone, close-up | CI runners, CLI, Docker | spare-macbook CI |
| Phone pinned from the top, notification or widget | iOS app, alerts | openfault-ios-app-store |
| Window + phone (device pair) | cross-device | |
| Checklist / list card (ticks, one red cross) | how-to-choose, red flags, readiness steps | |
| Many of one (grid of tiles, one in focus) | vendor index, model shortlist | ai-automation-companies-uae |
| Stacked cards (setting over its detail) | pricing, pilot scope | |
| Calendar / timeline week | 10-day pilot, playbook steps | |
| Diagram with connectors (boxes and one red path) | legacy integration, data residency, org chart with agents | |
| Comparison table, one column lit | consultant vs agency, React vs Svelte | |
| Tilted paper stack | receipts, tax invoices | |
| Chat / AI answer thread | knowledge base, ChatGPT for doctors | |
| Code / diff close-up | React signals, real-time events | |
| Kanban / board with votes | FeatureOS posts, duplicate detection | |

Vary the window too: browser `url`, sidebar app, plain `title`, terminal, `chrome="card"` or `"hairline"`, phone, or no window (a card or paper).

## Done means
The slug has a 1280x720 PNG that you've read with your own eyes after the last fix, and that would pass the exacting-designer test in SKILL.md ("How hard to press"). Report the slugs, any slug you skipped and why, and your tally of compositions used.

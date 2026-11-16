// CI check: fails when a published post in the newest N has no featureImage and no cover PNG.
// Reads .claude/blog-cover.json (posts, out). Usage: node check-blog-covers.mjs [grid=50]
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync(process.env.BLOG_COVER_CONFIG ?? '.claude/blog-cover.json', 'utf8'));
const GRID = Number(process.argv[2] ?? 50); // keep in sync with the blog listing's image grid

const posts = [];
for (const f of fs.readdirSync(cfg.posts).filter((f) => f.endsWith('.md'))) {
	const fm = fs.readFileSync(`${cfg.posts}/${f}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
	const get = (k) => fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1].replace(/^["']|["']$/g, '');
	if (get('draft') === 'true') continue;
	posts.push({ slug: f.replace(/\.md$/, ''), date: get('date'), image: get('featureImage') });
}

const missing = posts
	.sort((a, b) => new Date(b.date) - new Date(a.date))
	.slice(0, GRID)
	.filter((p) => !p.image && !fs.existsSync(`${cfg.out}/${p.slug}.png`))
	.map((p) => p.slug);

if (missing.length) {
	console.error(`Blog posts without a cover image:\n${missing.map((s) => `  ${s}`).join('\n')}\nRun /blog-cover <slug> to make one.`);
	process.exit(1);
}
console.log('blog covers ok');

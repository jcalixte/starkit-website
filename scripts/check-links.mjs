// Walks the prerendered site and resolves every internal href against dist/. A markdown link only
// has to be wrong by one path segment to 404, and nothing else in the build notices: the page
// renders, the anchor is valid HTML, and the type checker never sees it.
import { readFileSync, existsSync } from "node:fs"
import { globSync } from "node:fs"
import { relative } from "node:path"

const pages = globSync("dist/**/*.html")
if (pages.length === 0) {
  console.error("no HTML in dist/ — run `pnpm build` first")
  process.exit(1)
}

const broken = []

for (const file of pages) {
  const page = (
    "/" +
    relative("dist", file)
      .replace(/index\.html$/, "")
      .replace(/\.html$/, "")
  ).replace(/\/$/, "")
  const html = readFileSync(file, "utf8")

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(href)) continue

    const target = new URL(href, `https://x${page || "/"}`).pathname.replace(/\/$/, "")
    const found = [`dist${target}/index.html`, `dist${target}`, `dist${target}.html`].some((p) =>
      existsSync(p),
    )
    if (!found) broken.push(`${page || "/"} → ${href} (resolves to ${target || "/"})`)
  }
}

if (broken.length > 0) {
  console.error(`${broken.length} broken internal link(s):`)
  for (const line of [...new Set(broken)].sort()) console.error(`  ${line}`)
  process.exit(1)
}

console.log(`${pages.length} pages, no broken internal links`)

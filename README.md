# starkit.app

The documentation site for [Starkit](https://github.com/jcalixte/starkit) — how to write a Script.

A Vite + Vue 3 + DaisyUI site, prerendered to static HTML by
[vite-ssg](https://github.com/antfu-collective/vite-ssg). Content lives in `src/pages/` as markdown,
and is a restructured version of the Starkit repo's
[`seed/SCRIPTING.md`](https://github.com/jcalixte/starkit/blob/main/seed/SCRIPTING.md). Where this
site and `seed/src/starkit.gleam` disagree, the module wins.

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # vue-tsc + vite-ssg, static output in dist/
pnpm preview
pnpm lint       # oxlint   (pnpm lint:fix to autofix)
pnpm fmt        # oxfmt    (pnpm fmt:check to verify only)
```

## Routing

`vue-router`'s file-based routing (the `vue-router/vite` plugin) turns `src/pages/**` into routes,
with `.md` added to `extensions` so a markdown file is a page. `unplugin-vue-markdown` compiles it
to a Vue component and [Shiki](https://shiki.style) highlights the Gleam in it against both
`github-light` and `github-dark` — the dark colours ride along as `--shiki-dark` custom properties
and `src/style.css` swaps them under `prefers-color-scheme`.

`src/site.ts` is the one place the navigation lives: the header links, the sidebar, and the
prev/next order at the foot of a page.

`vite-ssg` renders every route at build time with `dirStyle: "nested"`, so `/guide/effects` is
written to `guide/effects/index.html` and served without a `.html` suffix.

## Type

Nova Mono, from `api.fonts.coollabs.io` — the Coolify team's Google Fonts mirror, so the request
never reaches Google. It ships one weight, so anything heavier is the browser's own synthesis.

## Colours

`src/style.css` holds the four colours Starkit is drawn from —
[colorhunt.co/palette/fff2c6fff8deaac4f58ca9ff](https://colorhunt.co/palette/fff2c6fff8deaac4f58ca9ff)
— as Tailwind theme tokens, and gives DaisyUI's light theme the periwinkle `--color-primary`.
`public/favicon.svg` is the app icon redrawn: the same periwinkle plate and cream carambola
`AppIcon.swift` renders, on Apple's icon grid.

## Deploy

Pushes to `main` are picked up by Coolify at https://platform.apoena.dev, which builds the
`Dockerfile` — node prerenders the site, nginx serves it. `nginx.conf` resolves a clean URL to its
prerendered directory with `try_files $uri $uri/ /index.html`.

The site is https://starkit.app. Its DNS is an `at.marque.dns` record in the apoena PDS.

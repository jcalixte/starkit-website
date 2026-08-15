# starkit.app

The documentation site for [Starkit](https://github.com/jcalixte/starkit) — how to write a Script.

A VitePress static site. Content lives in `docs/`, and is a restructured version of the Starkit
repo's [`seed/SCRIPTING.md`](https://github.com/jcalixte/starkit/blob/main/seed/SCRIPTING.md).
Where this site and `seed/src/starkit.gleam` disagree, the module wins.

## Develop

```sh
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # static output in docs/.vitepress/dist
pnpm preview
```

## Type

Nova Mono, self-hosted through `@fontsource/nova-mono` and imported in
`docs/.vitepress/theme/index.ts` — latin and latin-ext only, no request to Google. It ships one
weight, so anything heavier is the browser's own synthesis.

## Colours

`docs/.vitepress/theme/palette.css` holds the four colours Starkit is drawn from —
[colorhunt.co/palette/fff2c6fff8deaac4f58ca9ff](https://colorhunt.co/palette/fff2c6fff8deaac4f58ca9ff)
— and builds the gradient from them. `docs/public/favicon.svg` is the app icon redrawn: the same
periwinkle plate and cream carambola `AppIcon.swift` renders, on Apple's icon grid.

## Deploy

`.github/workflows/deploy.yml` builds on a push to `main` and publishes to GitHub Pages.
`docs/public/CNAME` points the site at `starkit.app`.

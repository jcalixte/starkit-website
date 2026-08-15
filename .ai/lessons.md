# Lessons

## A passing build says nothing about whether the page is readable

`pnpm build`, `pnpm lint` and `pnpm fmt:check` all passed on a hero whose text sat at 1.04:1 on its
own background. Two causes, both invisible to every gate in the repo:

- DaisyUI does not derive `--color-primary-content` from `--color-primary`. Override one and the
  other keeps the value that belonged to DaisyUI's default primary.
- The hero gradient is four fixed hex colours under both themes, while its text inherited
  `base-content` — which the dark theme turns near-white.

**Rule:** whenever a colour is hand-written — a theme token, a gradient, a banner — measure the
pairs it creates against WCAG AA (4.5:1, or 3:1 at 24px+) in _both_ colour schemes before calling
the work done. The ratio is the evidence; a green build is not. The measuring snippet lives in the
`apoena-new` skill under Step 3 → Contrast.

## Verify against the deployed site, not just the local build

Three defects survived a clean local build and only showed up on `starkit.app`: Coolify doubling the
git URL, nginx 301-ing every clean URL to its trailing-slash form, and unknown paths answering 200
with a blank page. Curl the live URLs and read the status codes after every deploy.

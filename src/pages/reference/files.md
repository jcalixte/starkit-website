# Which files are yours

Everything lives in `~/.starkit`.

| Path                                                                                              | Who owns it                                                                   |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `src/scripts/*.gleam`                                                                             | Yours. Seeded once on a fresh install, never overwritten after                |
| `test/*_test.gleam`                                                                               | Yours, apart from `starkit_test.gleam`                                        |
| `src/starkit.gleam`, `src/entry.gleam`, `src/text.gleam`, `run.mjs`, `gleam.toml`, `SCRIPTING.md` | The Shelf's. Overwritten on every install                                     |
| `src/registry.gleam`                                                                              | Generated from `src/scripts/` on every save. Do not edit                      |
| `starkit.toml`                                                                                    | Yours, and optional: Toolchain paths, for a shell that hides `gleam` or `bun` |

Nothing in `~/.starkit` is ever committed back to the Starkit repo, which is why `work.gleam` ships
empty — the names of your employer's tools stay yours.

## `starkit.toml`

Only needed when `gleam` or `bun` are not where a login shell would find them:

```toml
gleam = "/opt/homebrew/bin/gleam"
bun = "/Users/you/.bun/bin/bun"
```

## Keeping your Scripts

They are ordinary files in an ordinary Gleam project. `git init` in `~/.starkit` works, and the
Shelf-owned files being overwritten on install shows up as a diff you can read rather than a
surprise.

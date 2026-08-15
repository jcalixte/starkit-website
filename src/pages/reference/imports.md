# What you can import

Standard Gleam does not count against the Vocabulary, and the whole of `gleam_stdlib` is available.
Beyond it:

| Module                               | For                                                                                                                                         | Example         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `gleam/javascript/promise`           | The `Promise` a `Fetching` Script returns                                                                                                   | both fetchers   |
| `gleam/fetch`, `gleam/http/request`  | Reaching the network                                                                                                                        | `link.gleam`    |
| `gleam/json`, `gleam/dynamic/decode` | Reading a JSON answer back                                                                                                                  | `youtube.gleam` |
| `text`                               | `text.normalise`, which flattens typographic punctuation to what a keyboard types, so a pasted title is one you can find again by typing it | both pasters    |

## `text` is the one shared module

It is Shelf-owned and replaced wholesale on install, and importing it means sharing its fate: every
Script that imports it goes Stale when it changes. That is the one exception to Script isolation,
and it is why the module holds nothing but `normalise`.

## Adding a dependency

An _ask first_. `gleam.toml` is overwritten on every install, so an edit there does not survive one
anyway.

The bar for a new dependency is the same as the bar for a new Effect: several Scripts needing it,
not one. `link.gleam` scans HTML with `string.split_once` rather than parsing it for exactly this
reason — the pages that come out wrong are pinned in its test suite instead.

## The target is JavaScript

No OTP, no actors, no Erlang-only Hex package. Scripts compile to JavaScript and run on `bun`,
measured at roughly 5x faster to start for this workload; this is not BEAM Gleam.
[`docs/adr/0001`](https://github.com/jcalixte/starkit/blob/main/docs/adr/0001-compile-gleam-to-javascript.md)
has the numbers, and
[`docs/adr/0003`](https://github.com/jcalixte/starkit/blob/main/docs/adr/0003-run-artefacts-on-bun.md)
covers why bun rather than node.

# Install Starkit

Starkit is a desktop bar for running your own Gleam scripts. ⌃⌘K summons it, you type a
**Keyword**, and ↩ runs the **Script** that answers to it. Scripts live in `~/.starkit`.

This site is about writing them. It is the same text as
[`seed/SCRIPTING.md`](https://github.com/jcalixte/starkit/blob/main/seed/SCRIPTING.md), which is
vendored to `~/.starkit/SCRIPTING.md` beside the Scripts it describes. The compile-checked truth is
[`src/starkit.gleam`](https://github.com/jcalixte/starkit/blob/main/seed/src/starkit.gleam); where
this site and that module disagree, the module wins.

## Requirements

- macOS 14 or later
- `gleam` and `bun` on your `PATH`
- Xcode Command Line Tools (`xcode-select --install`), only to build Starkit yourself

## Get it

From the tap, which installs a notarized build and needs nothing else run:

```sh
brew install --cask jcalixte/tap/starkit
```

Or [download the zip](https://github.com/jcalixte/starkit/releases/latest) and drag it to
`/Applications`. Either way the app sets `~/.starkit` up the first time it launches: it seeds the
Scripts, builds them, and turns on Start at Login.

## First launch

Starkit lives in the menu bar, and the icon turns red when something is wrong — a build that fails
says so immediately, instead of waiting for you to try running something.

- **Accessibility** is requested the first time a Script uses `Paste`, because synthesising ⌘V needs
  it. Nothing else does. System Settings → Privacy & Security → Accessibility → Starkit.
- **Start at Login** is turned on once by the app itself, and can be toggled from the menu
  afterwards.

The chord is ⌃⌘K and cannot be changed. It races Script Kit, Raycast and Alfred, and the loser
registers nothing without saying so — quit the other one.

## What is already there

Five Scripts are seeded on install, and they are yours from that moment: seeded once, never
overwritten by a later install.

| Keyword | Does |
| ------- | ---- |
| `link` | Reads a URL's `h1` and pastes `[Title](url)` |
| `youtube`, `yt` | Turns a YouTube link into the note a video gets written down as |
| `clean` | Kills every running application except the ones on your keep list |
| `work` | Opens your working day — ships empty, fill it in yourself |
| `personal` | The same, for everything else |

`link.gleam` and `youtube.gleam` are the two worth reading before you write anything: both reach the
network, and both turn every failure into a sentence.

## Using the bar

⌃⌘K, type a Keyword, press ↩.

| Key | Does |
| --- | ---- |
| ↩ | Runs the selected Script, or creates one when nothing matches |
| ⌥↩ or ⌃O | Opens the selected Script in your editor, or writes the one nothing matched |
| ⌃D, then ⌃D again | Moves a Script and its test to the Trash, naming the files first |
| Escape or ⌃⌘K | Dismisses the bar. A Script already running still finishes and performs its Effects |

Next: [write one](./your-first-script).

# The Effects

An **Effect** is something a Script asks the Shelf to do. Every one of them is performed by the
Shelf, in the order you listed them.

| Effect             | Does                                                                                                | Worth knowing                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Open(app:)`       | Brings an application to the front, launching it if needed                                          | Takes the displayed name or the bundle name: `Calculatrice` or `Calculator` both work                                                                  |
| `Browse(url:)`     | Hands a URL to whatever registered its scheme                                                       | A whole URL, scheme and all: `https://…`, `obsidian://`, `mailto:`. An application by name is an `Open`, and a string without a scheme is a Refusal rather than a guess |
| `Kill(app:)`       | Terminates it immediately                                                                           | Never asks, never lets it save. Same two spellings accepted                                                                                            |
| `Copy(text:)`      | Puts the text on the clipboard                                                                      | Types nothing anywhere, so it does not care what was in front. Reach for it when the result is worth keeping and there is nowhere to put it             |
| `Paste(text:)`     | Puts the text on the clipboard, restores focus to the application you came from, and synthesises ⌘V | The text stays on the clipboard afterwards, so it can be pasted again by hand                                                                          |
| `Notify(message:)` | Shows a message in the bar while it is still on screen                                              | Not a system notification, and the only way a Script reports anything, failure included                                                                |

`Paste` is the one that needs Accessibility, because synthesising ⌘V does. Nothing else does — a
`Copy` writes the same clipboard without it — and the permission is requested the first time a
Script uses `Paste`.

## Order is the semantics

The list goes out only once `run` has returned the whole of it. Once it has, the Shelf performs the
Effects in order and there is no way back — nothing comes back to the Script, so no Script can stop
partway and offer you a list to choose from. An Effect the Shelf cannot perform stops the run there,
leaving the ones before it done: everything after it was decided on the assumption that it happened.

That also means a Script must survive its own run. The seeded `clean` keeps Starkit on an
`untouchable` list for exactly this reason: a `Kill` aimed at Starkit would end the process partway
down its own list.

```gleam
/// Never Killed, whatever `keep` says.
const untouchable = ["Starkit"]
```

## Returning nothing

`[]` is a legitimate answer. It performs nothing and says nothing — the seeded `work.gleam` ships
that way until you fill it in.

## Failure is a Notify

There is no error channel. A Script that cannot do what it was asked says so:

```gleam
case video_id(input) {
  Error(_) -> [Notify("Starkit could not read that as a YouTube link.")]
  Ok(id) -> [Paste(markdown(id))]
}
```

`panic`, `todo` and an unhandled crash all become a **Refusal** naming the Script, with the stack
trace as the detail, and no Effect is performed. That is a worse report than a sentence you wrote,
so write the sentence.

## The table is the whole list

And there is no escape hatch standing in for a word that is not on it. A Script that needs a new
capability gets a new word in the Vocabulary, which is a design decision — the smallness is the
property being defended, so the bar is several Scripts wanting the same missing word, not one. See
[limits](/reference/limits#when-the-vocabulary-is-not-enough).

# Your first Script

A **Script** is one Gleam module in `~/.starkit/src/scripts/`. It turns an **Input** and a
**Context** into a list of **Effects**. It decides _what_ should happen; the **Shelf** decides
_how_, and is the only side permitted to touch the machine.

## Create the file

From the bar: ⌃⌘K, type a name nothing answers to, and the `Create` row writes the file from the
template and opens it in your editor. Or from a terminal:

```sh
Starkit create hello   # writes src/scripts/hello.gleam if absent, then opens it
Starkit edit hello     # opens it; refuses rather than writing a template over the question
Starkit delete hello   # moves it and its test suite to the Trash
```

A **Keyword** is a Gleam module name, so the file name is the Keyword: lowercase letters, digits and
underscores, starting with a letter. `daily_notes.gleam` answers to `daily_notes`.

What `create` writes compiles, does nothing, and shows where to start:

```gleam
//// Hello — created by Starkit. Say what it does here.

import starkit.{type Script, Decides, Script}

pub fn script() -> Script {
  Script(
    keyword: "hello",
    name: "Hello",
    other_keywords: [],
    needs: [],
    asks: Decides,
    run: fn(_input, _context) {
      // The Effects you want performed, in order. For example:
      //
      //   [starkit.Notify("it works")]
      //
      // Declare needs: [starkit.RunningApps] to be handed the machine's state, and
      // asks: Asks(for: "a question") to be given a line of Input first.
      []
    },
  )
}
```

Returning `[]` is legitimate: the seeded `work.gleam` is exactly that until you fill it in.

## Make it do something

Replace the empty list with one `Notify`, and import it by name while you are there:

```gleam
//// Says hello, and nothing else.

import starkit.{type Script, Decides, Notify, Script}

pub fn script() -> Script {
  Script(
    keyword: "hello",            // the module name, so also the file name
    name: "Hello",               // what the bar shows
    other_keywords: ["hi"],      // shorthand; [] is the normal case
    needs: [],                   // the Context slices you want gathered
    asks: Decides,               // or Asks(for: "a question")
    run: fn(_input, _context) { [Notify("it works")] },
  )
}
```

Save. The Watcher rewrites `src/registry.gleam` and rebuilds within about 200 ms, so `hello` is in
the bar by the next ⌃⌘K. There is no build step to run and nothing to register by hand.

## The contract

`pub fn script() -> Script` is the whole of it. The registry finds a Script by file name and nothing
else, so the function name and its visibility are not yours to change.

Two constructors, and you want `Script` unless you reach the network:

| Constructor | `run` returns           | For                                                              |
| ----------- | ----------------------- | ---------------------------------------------------------------- |
| `Script`    | `List(Effect)`          | Everything local                                                 |
| `Fetching`  | `Promise(List(Effect))` | A Script that must [fetch](/guide/fetching) before it can decide |

The fields are the same for both:

| Field            | Holds                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `keyword`        | The canonical Keyword. It is the module name, so it is the file name too                  |
| `name`           | What the bar shows on the row                                                             |
| `other_keywords` | Shorthand this Script also answers to, like `["yt"]`. `[]` is the normal case             |
| `needs`          | The [Context](/guide/input-and-context) slices the Shelf should gather before running you |
| `asks`           | `Decides`, or `Asks(for:)` to get a line of [Input](/guide/input-and-context) first       |
| `run`            | `fn(String, Context) -> List(Effect)` — the decision itself                               |

## Something worth running

Two `Open`s in the order you want them, the last one frontmost. This is `work.gleam` with its list
filled in:

```gleam
//// Opens everything you need for a working day.

import starkit.{type Script, Decides, Open, Script}

pub fn script() -> Script {
  Script(
    keyword: "work",
    name: "Work",
    other_keywords: [],
    needs: [],
    asks: Decides,
    run: fn(_input, _context) { [Open("Ghostty"), Open("Slack")] },
  )
}
```

Try it from a terminal before you trust it to the bar:

```sh
Starkit run work --dry-run   # prints the Effects, performs none
```

`--dry-run` is the debugging path and is kept permanently.

Next: [the Effects](/guide/effects) it can ask for.

# Input and Context

Two channels, and both are declared in the Manifest instead of discovered at run time, because the
bar has to know before your code runs.

## The Input

The **Input** is the text typed after the Keyword. Which of the two you get is `asks`:

| `asks`                     | In the bar                                                                      | `run` receives                                             |
| -------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `Decides`                  | No stage. Runs on the first ↩                                                   | `""`, unless someone typed a line after the Keyword anyway |
| `Asks(for: "YouTube URL")` | A stage carrying that question, Seeded from the clipboard and arriving selected | What was in the field                                      |

`Asks` labels are questions in the bar's own voice, so `Asks(for: "YouTube URL")` reads as one in
the place a person is about to answer it. Seeding from the clipboard means accepting what you just
copied is one keystroke.

Typing the Input on the Keyword's own line (`youtube <url>`) skips the stage, so an `Asks` Script
must still handle an empty one:

```gleam
run: fn(input, _context) {
  case string.trim(input) {
    "" -> [Notify("Nothing to go on.")]
    url -> decide(url)
  }
}
```

## The Context

The **Context** is what the Shelf gathered for the **Needs** you declared. Scripts cannot read the
machine themselves. One slice exists:

| Need          | Field                  | Holds                                                                                                                 |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `RunningApps` | `context.running_apps` | The applications a person can see and switch to, as the names _this machine_ displays: `Calculatrice` on a French Mac |

An undeclared Need arrives as its empty value instead of failing to compile. Forgetting
`needs: [RunningApps]` therefore gives you an empty list and a Script that decides on nothing, which
is why the `clean` Kill list is [tested](./testing).

```gleam
import starkit.{type Effect, type Script, Decides, Kill, RunningApps, Script}

pub fn script() -> Script {
  Script(
    keyword: "clean",
    name: "Clean",
    other_keywords: [],
    needs: [RunningApps],
    asks: Decides,
    run: fn(_input, context) { kills(context.running_apps, keep) },
  )
}
```

## Names are what the machine displays

`context.running_apps` holds what each application calls itself on _this_ machine. Case and
surrounding spaces are safe to ignore; the language is not. A keep list saying `Calculator` spares
nothing on a French Mac, where the list says `Calculatrice`.

`clean` compares whole names, trimmed and lowercased, and nothing looser:

```gleam
fn same_application(one: String, other: String) -> Bool {
  normalise(one) == normalise(other)
}

fn normalise(name: String) -> String {
  name |> string.trim |> string.lowercase
}
```

Both allowances lean the same way — they make keeping more likely, never less — which is the only
direction an irreversible Effect may be forgiving in. Prefix or substring matching would also mean
nobody can say in advance what a keep list keeps.

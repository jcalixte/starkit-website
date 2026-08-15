# Testing a Script

Put the suite in `test/<keyword>_test.gleam`. `gleeunit` discovers every `*_test.gleam`, and
`test/starkit_test.gleam` is only the runner.

```sh
cd ~/.starkit && gleam test
```

## Test the decision, not the plumbing

Make `pub` whatever part of the Script answers the question that would be silent if it were wrong,
and call it with plain values:

```gleam
pub fn a_kept_application_is_spared_test() {
  assert clean.kills(["Zed", "Slack"], ["Zed"]) == [Kill("Slack")]
}
```

Use the bare `assert` keyword and not `gleeunit/should`: the existing suites all use it, and a
function whose name ends in `_test` is the whole registration.

This is why `clean.kills` takes its keep list as an argument instead of reading the constant: the
destructive decision can then be tested away from anyone's actual preferences.

`starkit.empty_context()` is there for a Script that takes a whole Context and declared no Needs.

## What is worth a test

The failure that does not look like one.

- A wrong YouTube ID pastes a working link to the wrong video. Nothing about the result looks
  broken, which is why every URL shape `youtube.video_id` accepts is one YouTube's own share menu
  hands out, and why an ID's length and alphabet are both checked.
- A name missing from a keep list closes an application with whatever was unsaved in it. `Kill`
  never prompts, so the keep list is the only place that decision can be made.
- A Script that forgot `needs: [RunningApps]` is handed an empty list and decides on nothing. That
  compiles.

## Deleting one

Delete a Script's source and its test suite goes with it. `gleam build` typechecks `test/`, so a
suite left behind is a project that stops compiling 200 ms later — which is why `Starkit delete`
moves both to the Trash, naming the files first.

```sh
Starkit delete youtube
```

## Running one by hand

```sh
Starkit run <keyword> [input]             # runs it for real
Starkit run <keyword> [input] --dry-run   # prints the Effects and performs none
```

`Starkit run` accepts any Keyword a Script answers to, but spelled in full only: the bar shows you
the row it picked before ↩ reaches it, and a terminal shows nothing between the word and the
Effects. `Starkit run c` will not reach `clean`.

While debugging, print with `echo` or `io.println_error`. Both go to stderr and are safe.
`io.println` does not — see [limits](../reference/limits).

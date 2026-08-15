# The Vocabulary

Everything `starkit.gleam` exports. This module is the whole interface between a Script and the
Shelf: a Script decides *what* should happen by returning Effects, the Shelf decides *how*, and
nothing else crosses the boundary. Every capability the Shelf holds is a permission somebody had to
grant once, which is why there is no escape hatch.

It is vendored into `~/.starkit` and overwritten on every install. Do not edit it there.

## `Effect`

Something a Script asks the Shelf to do. See [the four Effects](../guide/effects).

```gleam
pub type Effect {
  Open(app: String)
  Kill(app: String)
  Paste(text: String)
  Notify(message: String)
}
```

## `Need`

A slice of machine state a Script needs in order to decide. Scripts cannot read the machine
themselves, so anything they need has to be declared up front and gathered by the Shelf.

```gleam
pub type Need {
  RunningApps
}
```

## `Context`

What the Shelf gathered, for the Needs a Script declared.

```gleam
pub type Context {
  Context(running_apps: List(String))
}
```

Fields for undeclared Needs hold their empty value rather than being absent, so a Script that forgot
to declare a Need sees nothing rather than failing to compile.

## `Asking`

Whether a Script asks the person for something before it can decide. Declared rather than inferred,
because the Shelf has to know before the Script runs.

```gleam
pub type Asking {
  Decides
  Asks(for: String)
}
```

## `Script`

One Script: a Keyword to summon it by, the other Keywords it answers to, a name to show, the Needs
it declares, whether it Asks, and the decision itself.

```gleam
pub type Script {
  Script(
    keyword: String,
    name: String,
    other_keywords: List(String),
    needs: List(Need),
    asks: Asking,
    run: fn(String, Context) -> List(Effect),
  )

  Fetching(
    keyword: String,
    name: String,
    other_keywords: List(String),
    needs: List(Need),
    asks: Asking,
    run: fn(String, Context) -> Promise(List(Effect)),
  )
}
```

`run` receives the Input typed after the Keyword — empty when nothing was typed — and returns the
Effects to perform. It may reach the network on its own; it may never touch the machine.

Two constructors because there is no synchronous HTTP on this target. Write `Script` unless you
[reach the network](../guide/fetching).

## `empty_context`

The Context a Script sees when it declared no Needs. There for tests.

```gleam
pub fn empty_context() -> Context
```

## The one contract

```gleam
pub fn script() -> Script
```

The registry finds a Script by file name and nothing else, so the function name and its visibility
are not yours to change.

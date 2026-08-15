# Keywords and the loop

## What a Keyword may be

A **Keyword** is a Gleam module name, so `src/scripts/daily_notes.gleam` answers to `daily_notes`:
lowercase letters, digits and underscores, starting with a letter. That one is _canonical_.

`other_keywords` are shorthand typed in the same field (`yt` for `youtube`). They are not file
names, so they may be anything you would type.

An invalid Keyword is not offered rather than sanitised, because a Keyword silently different from
what was typed is a Keyword nobody can find again.

## How a match is picked

What you type is matched in four bands, best first:

1. The canonical Keyword, exactly
2. One of the `other_keywords`, exactly
3. The canonical Keyword, by prefix
4. One of the `other_keywords`, by prefix

A Keyword spelled in full always wins, so `link` cannot run `linkedin`, and a two-letter shorthand
cannot be shadowed by a Script that merely starts with those letters.

## The loop

Saving is the whole flow. The Watcher rewrites `src/registry.gleam` and rebuilds within about
200 ms, so a new Script is in the bar by the next Summon and an already-built one is never built at
Summon time. A build that fails turns the menu bar red immediately, naming the error, instead of
waiting for you to try running something.

```sh
Starkit create <keyword>   # writes src/scripts/<keyword>.gleam if absent, then opens it
Starkit edit <keyword>     # opens it; refuses rather than writing a template over the question
Starkit delete <keyword>   # moves it and its test suite to the Trash
```

## One broken Script does not break the rest

One project, per-Script freshness. A Script whose **Artefact** was built from the source on disk
always runs, even while the project as a whole does not compile. A Script whose source has changed
since its last successful build is **Stale** and is Refused by name.

Breaking `youtube.gleam` does not stop `work` from running.

The reasoning is in
[`docs/adr/0002`](https://github.com/jcalixte/starkit/blob/main/docs/adr/0002-one-project-with-per-script-staleness.md)
in the Starkit repo.

# Reaching the network

A Script owns the network; the Shelf owns the machine and never fetches on your behalf. There is no
synchronous HTTP on this target, so a Script that reads the network is `Fetching` and answers with a
promise.

```gleam
import gleam/fetch
import gleam/http/request
import gleam/javascript/promise.{type Promise}
import starkit.{type Effect, type Script, Asks, Fetching, Notify, Paste}

pub fn script() -> Script {
  Fetching(
    keyword: "link",
    name: "Link from url",
    other_keywords: [],
    needs: [],
    asks: Asks(for: "URL"),
    run: fn(input, _context) { decide(input) },
  )
}

fn decide(input: String) -> Promise(List(Effect)) {
  case request.to(input) {
    Error(_) -> promise.resolve([Notify("Starkit could not read that as a URL.")])
    Ok(asked) -> {
      use sent <- promise.await(fetch.send(asked))
      // …
    }
  }
}
```

The Shelf awaits it and is otherwise indifferent: the same Effects arrive, under the same 5 s
deadline as any other Script. A fetch that never returns is what that deadline is for.

## Every failure becomes a sentence

A `Notify` in the bar is the only place a failure can be shown, so a status code and a decode error
both have to be turned into something a person can read. `link.gleam` and `youtube.gleam` both do
this end to end and are worth copying:

```gleam
fn decide(input: String) -> Promise(List(Effect)) {
  case string.trim(input) {
    "" -> promise.resolve([Notify("Paste a URL, or type one after the Keyword.")])
    typed ->
      case fetchable(typed) {
        Error(why) -> promise.resolve([Notify(why)])
        Ok(url) -> {
          use fetched <- promise.map(page_at(url))
          case fetched {
            Error(why) -> [Notify(why)]
            Ok(html) ->
              case title_in(html) {
                Ok(title) -> [Paste(markdown(title, url))]
                Error(_) -> [Notify("That page has no h1 for Starkit to read.")]
              }
          }
        }
      }
  }
}
```

Note the shape: the functions that can fail return `Result(_, String)`, where the error *is* the
sentence. Nothing has to be phrased twice.

## https and nothing else

`link.gleam` refuses cleartext, and the reason generalises. A title read over http is a title
anything between you and the server can choose, and it is pasted into a note verbatim and trusted
from then on — nothing downstream can tell a page's own heading from one inserted on the way.

## Reading JSON back

`youtube.gleam` asks oEmbed rather than scraping the watch page: a documented endpoint answering
JSON with no key, so the title arrives decoded rather than extracted from HTML. `gleam/json` and
`gleam/dynamic/decode` are both available for that.

Prefer a documented endpoint when one exists. Scanning HTML gets some pages wrong, and the pages it
gets wrong are pinned in `link.gleam`'s test suite rather than fixed, because fixing them means an
HTML parser — a new dependency, and an [ask first](../reference/imports#adding-a-dependency).

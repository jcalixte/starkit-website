# Limits

All of them deliberate.

## What a Script cannot do

- **Touch the machine.** No filesystem access, no process control, no shelling out, no AppleScript.
  Only [Effects](../guide/effects).
- **Use `@external`.** Zero FFI is a measured property of the design, and it is what makes
  `starkit.gleam` the whole interface.
- **Run another Script, or reach into one.** `import scripts/other` is not a supported shape.
- **Outlive 5 seconds.** A Script still running then is killed and the bar says so. A fetch that
  never returns is what that deadline is for.
- **Write to stdout.** `stdout` *is* the protocol: `io.println` lands in front of the JSON reply and
  earns you `Starkit could not read what "x" answered`. `echo` and `io.println_error` go to stderr
  and are safe, which is how you print while debugging.
- **Keep anything between runs.** A fresh `bun` per run, and nothing survives it. No caches, no
  files on the side.
- **Carry configuration outside its Manifest.** There is no config file and no per-Script key
  binding; the only key binding in Starkit summons the bar.
- **Use OTP, actors, or an Erlang-only Hex package.** The target is
  [JavaScript](./imports#the-target-is-javascript).

## Crashing

`panic`, `todo` and an unhandled crash all become a **Refusal** naming the Script, with the stack
trace as the detail, and no Effect is performed: the list goes out only once `run` has returned the
whole of it.

Once it has, the Shelf performs the Effects in order and there is no way back. `clean` guards
against Killing Starkit for exactly that reason, since a `Kill` aimed at itself would end the
process partway down its own list.

## Limits of the app itself

- The chord is ⌃⌘K and cannot be changed. It races Script Kit, Raycast and Alfred, and the loser
  registers nothing without saying so.
- There is no preferences window, no theming, and no per-Script configuration outside its own
  manifest.
- Effects go out and nothing comes back, so no Script can stop and offer you a list to choose from.

## When four words are not enough

Adding an Effect or a Context slice is a design decision, and the smallness of the Vocabulary is the
property being defended — so the bar for a new word is several Scripts needing it and not one. The
same goes for a permission beyond Accessibility, and for a new dependency.

Ask before adding any of them, and update the Vocabulary in the Starkit repo's
[`CONTEXT.md`](https://github.com/jcalixte/starkit/blob/main/CONTEXT.md) in the same change that
adds to it.

---
layout: home

hero:
  name: Starkit
  text: Your own scripts, one chord away.
  tagline: A desktop bar for running Gleam scripts on macOS. ⌃⌘K summons it. Write a module, save the file, and it is in the bar by the next summon.
  image:
    src: /favicon.svg
    alt: Starkit
  actions:
    - theme: brand
      text: Write your first Script
      link: /guide/your-first-script
    - theme: alt
      text: Install Starkit
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/jcalixte/starkit

features:
  - title: One module, one contract
    details: A Script is a Gleam module in ~/.starkit/src/scripts/ exporting pub fn script(). It turns an Input and a Context into a list of Effects. Nothing else is asked of it.
    link: /guide/your-first-script
    linkText: The shape
  - title: Four Effects, no fifth
    details: Open, Kill, Paste, Notify. A Script decides what should happen; the Shelf decides how, and is the only side permitted to touch the machine.
    link: /guide/effects
    linkText: What each one does
  - title: Save is the whole flow
    details: The Watcher rewrites the registry and rebuilds within about 200 ms. A broken Script is refused by name and leaves the others running.
    link: /guide/keywords
    linkText: The loop
---

<script setup lang="ts">
import { site } from "../site"

const features = [
  {
    title: "One module, one contract",
    details:
      "A Script is a Gleam module in ~/.starkit/src/scripts/ exporting pub fn script(). It turns an Input and a Context into a list of Effects. Nothing else is asked of it.",
    link: "/guide/your-first-script",
    linkText: "The shape",
  },
  {
    title: "Six Effects, no escape hatch",
    details:
      "Open, Browse, Kill, Copy, Paste, Notify. A Script decides what should happen; the Shelf decides how, and is the only side permitted to touch the machine.",
    link: "/guide/effects",
    linkText: "What each one does",
  },
  {
    title: "Save is the whole flow",
    details:
      "The Watcher rewrites the registry and rebuilds within about 200 ms. A broken Script is refused by name and leaves the others running.",
    link: "/guide/keywords",
    linkText: "The loop",
  },
]
</script>

<template>
  <section class="starkit-gradient border-b border-base-300">
    <div class="max-w-6xl mx-auto px-4 lg:px-6 py-20 flex flex-col md:flex-row items-center gap-10">
      <div class="flex-1">
        <h1 class="text-4xl md:text-5xl font-bold">Starkit</h1>
        <p class="mt-3 text-2xl md:text-3xl">Your own scripts, one chord away.</p>
        <p class="mt-6 max-w-xl">
          A desktop bar for running Gleam scripts on macOS. ⌃⌘K summons it. Write a module, save the
          file, and it is in the bar by the next summon.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/guide/your-first-script" class="btn btn-primary">
            Write your first Script
          </RouterLink>
          <RouterLink to="/guide" class="btn btn-ghost">Install Starkit</RouterLink>
          <a :href="site.repo" class="btn btn-ghost">GitHub</a>
        </div>
      </div>
      <img src="/favicon.svg" alt="" class="size-48 md:size-60 drop-shadow" />
    </div>
  </section>

  <section class="max-w-6xl mx-auto px-4 lg:px-6 py-16 grid gap-6 md:grid-cols-3">
    <div v-for="feature in features" :key="feature.title" class="card bg-base-200">
      <div class="card-body">
        <h2 class="card-title text-lg">{{ feature.title }}</h2>
        <p class="text-sm opacity-80">{{ feature.details }}</p>
        <div class="card-actions mt-2">
          <RouterLink :to="feature.link" class="link link-primary text-sm">
            {{ feature.linkText }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

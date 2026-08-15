<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useHead } from "@unhead/vue"
import SiteHeader from "./components/SiteHeader.vue"
import SiteSidebar from "./components/SiteSidebar.vue"
import PageNav from "./components/PageNav.vue"
import { findPage, site } from "./site"

const route = useRoute()
const isHome = computed(() => route.path === "/")
const pageTitle = computed(() => findPage(route.path)?.text)

useHead({
  title: computed(() => (pageTitle.value ? `${pageTitle.value} — ${site.title}` : site.title)),
  meta: [
    { name: "description", content: site.description },
    { name: "theme-color", content: "#8ca9ff" },
    { property: "og:site_name", content: site.title },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${site.url}/starkit.png` },
    { property: "og:url", content: computed(() => `${site.url}${route.path}`) },
    { property: "og:title", content: computed(() => pageTitle.value ?? site.title) },
  ],
  link: [{ rel: "canonical", href: computed(() => `${site.url}${route.path}`) }],
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <SiteHeader />

    <main v-if="isHome" class="flex-1">
      <RouterView />
    </main>

    <div v-else class="flex-1 w-full max-w-6xl mx-auto px-4 lg:px-6 flex gap-10">
      <SiteSidebar class="hidden lg:block w-60 shrink-0" />
      <article class="min-w-0 flex-1 py-10">
        <RouterView />
        <PageNav />
      </article>
    </div>

    <footer class="border-t border-base-300 mt-16">
      <div
        class="max-w-6xl mx-auto px-4 lg:px-6 py-8 text-sm opacity-70 flex flex-wrap gap-2 justify-between"
      >
        <p>
          MIT licensed. The compile-checked truth is
          <code>src/starkit.gleam</code>.
        </p>
        <p>© Julien Calixte</p>
      </div>
    </footer>
  </div>
</template>

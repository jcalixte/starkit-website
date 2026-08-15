<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { neighbours, site, sourceFile } from "../site"

const route = useRoute()
const around = computed(() => neighbours(route.path))
const editUrl = computed(() => `${site.editBase}${sourceFile(route.path)}`)
</script>

<template>
  <div class="not-prose mt-12 border-t border-base-300 pt-6 space-y-6">
    <a :href="editUrl" class="link link-hover text-sm opacity-70">Edit this page on GitHub</a>

    <div class="flex flex-wrap gap-4 justify-between">
      <RouterLink v-if="around.prev" :to="around.prev.link" class="btn btn-outline btn-sm">
        ← {{ around.prev.text }}
      </RouterLink>
      <span v-else />
      <RouterLink v-if="around.next" :to="around.next.link" class="btn btn-primary btn-sm">
        {{ around.next.text }} →
      </RouterLink>
    </div>
  </div>
</template>

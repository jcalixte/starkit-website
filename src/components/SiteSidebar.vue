<script setup lang="ts">
import { sidebar } from "../site"
</script>

<template>
  <nav class="py-10 sticky top-16 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
    <div v-for="section in sidebar" :key="section.text" class="mb-6">
      <p class="px-3 pb-1 text-xs uppercase tracking-wide opacity-60">{{ section.text }}</p>
      <ul class="menu menu-sm w-full p-0">
        <li v-for="item in section.items" :key="item.link">
          <RouterLink :to="item.link" active-class="menu-active" exact-active-class="menu-active">
            {{ item.text }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

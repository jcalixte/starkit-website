<script setup lang="ts">
import { nav, sidebar, site } from "../site"
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur">
    <div class="navbar max-w-6xl mx-auto px-4 lg:px-6">
      <div class="navbar-start gap-2">
        <div class="dropdown lg:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-sm px-2" aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu dropdown-content mt-2 w-64 rounded-box bg-base-100 p-2 shadow z-40"
          >
            <li v-for="section in sidebar" :key="section.text">
              <details open>
                <summary>{{ section.text }}</summary>
                <ul>
                  <li v-for="item in section.items" :key="item.link">
                    <RouterLink :to="item.link">{{ item.text }}</RouterLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <RouterLink to="/" class="btn btn-ghost px-2 text-lg gap-2">
          <img src="/favicon.svg" alt="" class="size-6" />
          {{ site.title }}
        </RouterLink>
      </div>

      <div class="navbar-end gap-1">
        <template v-for="item in nav" :key="item.link">
          <a
            v-if="item.link.startsWith('http')"
            :href="item.link"
            class="btn btn-ghost btn-sm hidden sm:inline-flex"
          >
            {{ item.text }}
          </a>
          <RouterLink v-else :to="item.link" class="btn btn-ghost btn-sm hidden sm:inline-flex">
            {{ item.text }}
          </RouterLink>
        </template>

        <a :href="site.repo" class="btn btn-ghost btn-sm px-2" aria-label="GitHub">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
// Side-effect-free: brings vite-ssg's `ssgOptions` augmentation of Vite's UserConfig into scope.
import type {} from "vite-ssg"
import VueRouter from "vue-router/vite"
import vue from "@vitejs/plugin-vue"
import Markdown from "unplugin-vue-markdown/vite"
import tailwindcss from "@tailwindcss/vite"
import { fromHighlighter } from "@shikijs/markdown-exit"
import { createHighlighter } from "shiki"

const highlighter = await createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["gleam", "bash", "shell", "json", "toml", "swift", "markdown"],
})

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },

  plugins: [
    // Must precede vue() — it rewrites the page files it collects from src/pages.
    VueRouter({ extensions: [".vue", ".md"] }),
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      wrapperClasses: "prose prose-starkit max-w-none",
      markdownOptions: { html: true, linkify: true },
      markdownSetup(md) {
        md.use(
          fromHighlighter(highlighter, {
            themes: { light: "github-light", dark: "github-dark" },
          }),
        )
      },
    }),
    tailwindcss(),
  ],

  ssgOptions: {
    // /guide/effects -> guide/effects/index.html, so nginx serves it without an .html suffix.
    dirStyle: "nested",
    formatting: "minify",
    script: "async",
  },
})

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Starkit',
  description: 'Write a Gleam script, save the file, summon it with ⌃⌘K.',
  lang: 'en-GB',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/starkit.png' }],
    ['meta', { name: 'theme-color', content: '#8CA9FF' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Starkit' }],
    ['meta', { property: 'og:url', content: 'https://starkit.app/' }],
    ['meta', { property: 'og:image', content: 'https://starkit.app/starkit.png' }],
  ],

  sitemap: { hostname: 'https://starkit.app' },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Starkit',

    nav: [
      { text: 'Write a Script', link: '/guide/' },
      { text: 'Reference', link: '/reference/vocabulary' },
      { text: 'Download', link: 'https://github.com/jcalixte/starkit/releases/latest' },
    ],

    sidebar: [
      {
        text: 'Write a Script',
        items: [
          { text: 'Install Starkit', link: '/guide/' },
          { text: 'Your first Script', link: '/guide/your-first-script' },
          { text: 'The four Effects', link: '/guide/effects' },
          { text: 'Input and Context', link: '/guide/input-and-context' },
          { text: 'Reaching the network', link: '/guide/fetching' },
          { text: 'Testing a Script', link: '/guide/testing' },
          { text: 'Keywords and the loop', link: '/guide/keywords' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'The Vocabulary', link: '/reference/vocabulary' },
          { text: 'What you can import', link: '/reference/imports' },
          { text: 'Limits', link: '/reference/limits' },
          { text: 'Which files are yours', link: '/reference/files' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/jcalixte/starkit' }],

    editLink: {
      pattern: 'https://github.com/jcalixte/starkit-website/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: { provider: 'local' },

    outline: [2, 3],

    footer: {
      message: 'MIT licensed. The compile-checked truth is <code>src/starkit.gleam</code>.',
      copyright: '© Julien Calixte',
    },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
  },
})

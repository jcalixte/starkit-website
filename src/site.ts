export interface NavLink {
  text: string
  link: string
}

export interface SidebarSection {
  text: string
  items: NavLink[]
}

export const site = {
  title: "Starkit",
  description: "Write a Gleam script, save the file, summon it with ⌃⌘K.",
  url: "https://starkit.app",
  repo: "https://github.com/jcalixte/starkit",
  editBase: "https://github.com/jcalixte/starkit-website/edit/main/src/pages",
}

export const nav: NavLink[] = [
  { text: "Write a Script", link: "/guide/" },
  { text: "Reference", link: "/reference/vocabulary" },
  { text: "Download", link: "https://github.com/jcalixte/starkit/releases/latest" },
]

export const sidebar: SidebarSection[] = [
  {
    text: "Write a Script",
    items: [
      { text: "Install Starkit", link: "/guide/" },
      { text: "Your first Script", link: "/guide/your-first-script" },
      { text: "The four Effects", link: "/guide/effects" },
      { text: "Input and Context", link: "/guide/input-and-context" },
      { text: "Reaching the network", link: "/guide/fetching" },
      { text: "Testing a Script", link: "/guide/testing" },
      { text: "Keywords and the loop", link: "/guide/keywords" },
    ],
  },
  {
    text: "Reference",
    items: [
      { text: "Reference", link: "/reference/" },
      { text: "The Vocabulary", link: "/reference/vocabulary" },
      { text: "What you can import", link: "/reference/imports" },
      { text: "Limits", link: "/reference/limits" },
      { text: "Which files are yours", link: "/reference/files" },
    ],
  },
]

/** Sidebar order, flattened — the reading order used for the prev/next footer. */
export const pages: NavLink[] = sidebar.flatMap((section) => section.items)

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path)

export function findPage(path: string): NavLink | undefined {
  return pages.find((page) => normalise(page.link) === normalise(path))
}

export function neighbours(path: string): { prev?: NavLink; next?: NavLink } {
  const index = pages.findIndex((page) => normalise(page.link) === normalise(path))
  if (index < 0) return {}
  return { prev: pages[index - 1], next: pages[index + 1] }
}

/** Path of the source file behind a route, for the "edit this page" link. */
export function sourceFile(path: string): string {
  if (path === "/") return "/index.vue"
  return path.endsWith("/") ? `${path}index.md` : `${path}.md`
}

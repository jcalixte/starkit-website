import { ViteSSG } from "vite-ssg"
import { routes } from "vue-router/auto-routes"
import App from "./App.vue"
import "./style.css"

export const createApp = ViteSSG(App, { routes, scrollBehavior: () => ({ top: 0 }) })

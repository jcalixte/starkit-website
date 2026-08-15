# Prerender the site, then serve it. Two stages so nginx ships without node or the node_modules
# vite-ssg needs to render every route.
FROM node:24-alpine AS build
WORKDIR /app
# Without this corepack stops to ask before fetching the pnpm version pinned in package.json, and
# the build hangs then fails on a machine with no TTY.
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

FROM node:22-alpine AS base

ENV LASTFM_BASE_URL=$LASTFM_BASE_URL
ENV LASTFM_API_KEY=$LASTFM_API_KEY
ENV LASTFM_SHARED_SECRET=$LASTFM_SHARED_SECRET
ENV LASTFM_APPLICATION_NAME=$LASTFM_APPLICATION_NAME
ENV SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET
ENV GENIUS_CLIENT_ID=$GENIUS_CLIENT_ID
ENV GENIUS_CLIENT_SECRET=$GENIUS_CLIENT_SECRET
ENV GENIUS_CLIENT_ACCESS_TOKEN=$GENIUS_CLIENT_ACCESS_TOKEN

ENV NODE_ENV=$NODE_ENV


# Development stage
FROM base AS development
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "dev"]


FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm && pnpm i --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack

COPY --from=builder /app/.output ./.output

RUN chown -R tanstack:nodejs /app

USER tanstack

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

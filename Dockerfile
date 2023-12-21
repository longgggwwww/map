FROM node:16.14-alpine as dev

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci

USER node

FROM node:16.14-alpine as db

WORKDIR /app

COPY --chown=node:node --from=dev /app .

COPY --chown=node:node . .

RUN npx prisma generate

USER node

FROM node:16.14-alpine as build

WORKDIR /app

COPY --chown=node:node --from=db /app .

RUN npm run build

ENV NODE_ENV=prod

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:16.14-alpine

WORKDIR /app

COPY --chown=node:node --from=build /app .

ENTRYPOINT [ "node", "dist/main.js" ]


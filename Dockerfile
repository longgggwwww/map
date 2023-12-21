FROM node:alpine

WORKDIR /app

COPY package.json .

COPY tsconfig.json .

COPY prisma .

RUN npx prisma generate && npm install && npm run build

COPY . .

EXPOSE 3000

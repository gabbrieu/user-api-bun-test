FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY tsconfig.json .
COPY drizzle.config.ts .
COPY drizzle drizzle

ENV NODE_ENV production
CMD ["bun", "src/server.ts"]

EXPOSE 3000
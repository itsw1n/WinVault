FROM node:20-bookworm-slim AS dev
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential python3 libvips-dev && \
  rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate
RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]

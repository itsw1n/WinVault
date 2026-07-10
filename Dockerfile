FROM node:20-alpine AS dev
RUN apk add --no-cache build-base python3 vips-dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]

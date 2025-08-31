FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm && pnpm install

COPY . .

# Создаем символическую ссылку для Prisma
RUN mkdir -p prisma && cp -r prisma/* prisma/ 2>/dev/null || true

RUN pnpm run build

EXPOSE 4000

CMD ["node", "dist/main.js"]

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run db:generate
RUN pnpm run build

EXPOSE 4000

CMD ["node", "dist/main.js"]

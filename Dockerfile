# Используем образ Node.js версии 20
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код проекта
COPY . .

# Собираем Next.js приложение
RUN npm run build

# Стадия запуска
FROM node:20-alpine AS runner
WORKDIR /app

# Копируем собранное приложение и node_modules
COPY --from=builder /app ./

# Открываем порт 3000
EXPOSE 3000

# Команда запуска
CMD ["npm", "run", "start"]
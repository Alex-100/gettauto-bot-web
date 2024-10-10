# Указываем базовый образ с Node.js для сборки
FROM node:14-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Запускаем сборку проекта
RUN npm run build

# Указываем базовый образ для сервера
FROM nginx:alpine

# Копируем файлы сборки в директорию, обслуживаемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
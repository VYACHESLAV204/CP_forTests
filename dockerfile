# Используем официальный образ Node.js для сборки
FROM node:20 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Собираем React-приложение
RUN npm run build

# Используем Nginx для сервировки собранного приложения
FROM nginx:alpine

# Копируем собранные файлы в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем пользовательский конфиг для Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
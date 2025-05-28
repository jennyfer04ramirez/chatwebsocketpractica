# Etapa 1: build de Angular
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: Nginx sirve los archivos
FROM nginx:alpine
COPY --from=builder /app/dist/angular-client/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

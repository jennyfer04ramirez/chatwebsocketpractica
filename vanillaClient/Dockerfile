FROM nginx:alpine

# Copia todo tu HTML/JS/CSS al root de Nginx
COPY . /usr/share/nginx/html

# Copia tu nginx.conf (ajústalo si está en otra ruta)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

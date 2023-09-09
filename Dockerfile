FROM nginx:1.23.1
RUN mkdir -p /var/www/pblgllgs/html
COPY default.conf /etc/nginx/conf.d/
COPY dist/ /var/www/pblgllgs/html
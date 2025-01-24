FROM node:16.20.2-alpine AS builder_clinic

WORKDIR /app

RUN apk add git \
    && apk add yarn

COPY package.json yarn.lock ./

#RUN yarn install --frozen-lockfile && yarn cache clean
RUN yarn install

COPY . .

#RUN yarn add --dev nodemon && yarn global add nodemon

RUN yarn generate

#CMD ["yarn", "global add", "nodemon"]
#CMD ["nodemon", "--config", "/app/nodemon.json"]

# مرحله 2: اجرا با Nginx
FROM nginx:stable-alpine AS app

WORKDIR /var/www/html

# کپی فایل‌های ساخته‌شده از مرحله قبلی به مسیر Nginx
COPY --from=builder_clinic /app/dist /var/www/html/

# کپی تنظیمات Nginx
COPY ./http/default.conf /etc/nginx/conf.d/default.conf

# مانیتور تغییرات (volume برای تغییرات runtime)
RUN mkdir -p /app && chown -R nginx:nginx /var/www/html

# اکسپوز کردن پورت 80
EXPOSE 80

# تنظیم دستور اجرا
CMD ["nginx", "-g", "daemon off;"]

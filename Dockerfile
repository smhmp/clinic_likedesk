FROM node:16.20.2-alpine AS builder

WORKDIR /app

ARG BUILD_VERSION
ENV BUILD_VERSION=$BUILD_VERSION

RUN set -ex && \
    apk update --no-cache && \
    apk add --no-cache git && \
    rm -rf /var/cache/apk/*

COPY . .

RUN yarn install
RUN yarn generate

FROM nginx:stable-alpine AS app

WORKDIR /var/www/html

COPY --from=builder /app/dist /var/www/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

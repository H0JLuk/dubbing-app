FROM node:15.13.0-alpine as builder

WORKDIR /app

RUN npm install -g npm@7.8.0

COPY ./package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.19.9-alpine

RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/dubbing-training-app-admin
COPY host.conf /etc/nginx/conf.d/

EXPOSE 80
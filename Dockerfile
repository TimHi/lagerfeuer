FROM node:16-alpine as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

FROM nginx as runtime
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/lagerfeuer /usr/share/nginx/html

FROM node:14.15 as node-stage
ARG VUE_APP_API
ARG VUE_APP_API_KEY
ENV VUE_APP_API $VUE_APP_API
ENV VUE_APP_API_KEY $VUE_APP_API_KEY
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as nginx-stage
RUN mkdir /app
COPY --from=node-stage /app/dist /app
COPY docker/nginx.conf /etc/nginx/nginx.conf

# build
FROM node:16-alpine as build
WORKDIR /app
COPY . .
ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL
RUN npm install
RUN npm run build

# deploy
FROM nginx:alpine

# Healthcheck
RUN apk add curl
COPY health/index.html /usr/share/nginx/html/health/index.html
HEALTHCHECK --interval=60s --timeout=1s CMD curl --fail http://localhost:80/health/index.html || exit 1

# Add Default Configuration + Monitoring
COPY default.conf /etc/nginx/conf.d/default.conf

# add static HTML
COPY --from=build /app/build /usr/share/nginx/html

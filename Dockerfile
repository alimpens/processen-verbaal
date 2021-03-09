FROM nginx:alpine

# Healthcheck
RUN apk add curl
COPY health/index.html /usr/share/nginx/html/health/index.html
HEALTHCHECK --interval=60s --timeout=1s CMD curl --fail http://localhost:80/health/index.html || exit 1

# Add Default Configuration + Monitoring
COPY default.conf /etc/nginx/conf.d/default.conf

# Add Static HTML
COPY build /usr/share/nginx/html

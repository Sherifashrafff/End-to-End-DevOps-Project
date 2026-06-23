FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy static files and config template
COPY public/ /usr/share/nginx/html/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# nginx official image runs envsubst on /etc/nginx/templates/*.template at startup
# and writes the result to /etc/nginx/conf.d/ — no custom entrypoint needed.
# BACKEND_HOST and BACKEND_PORT must be set via env when the container starts.

# Drop privileges: nginx master runs as root to bind the port then workers run as nginx (uid 101)
# The 'nginx' image already sets up the nginx user; we just expose non-privileged port 8080.
EXPOSE 8080

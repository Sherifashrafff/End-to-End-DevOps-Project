FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Install prod deps only — dev deps (nodemon) stay out of the image
RUN npm install --omit=dev

FROM node:20-alpine
WORKDIR /app

# Non-root user for least-privilege runtime
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ownership before switching user
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

# Use node directly (not npm start) so SIGTERM reaches the process without an npm wrapper
CMD ["node", "server.js"]

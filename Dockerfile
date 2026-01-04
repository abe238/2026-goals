FROM node:20-alpine AS builder

WORKDIR /app

COPY app/package*.json ./
RUN npm ci

COPY app/ ./
RUN npm run build

FROM node:20-alpine AS runner

RUN adduser --system --uid 1001 appuser

WORKDIR /app

RUN npm install -g serve

COPY --from=builder --chown=appuser:appuser /app/dist ./dist

USER appuser

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy built dependencies and prisma from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Create uploads directory
RUN mkdir -p /app/uploads

# Enable file watching with polling (for Docker Desktop)
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

EXPOSE 5000

CMD ["pnpm", "dev"]

# Build stage
FROM node:20-alpine AS builder

# Install necessary libraries for Prisma to work on Alpine Linux
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma client for the build stage
RUN pnpm prisma generate

# Runtime stage
FROM node:20-alpine

# Re-install necessary libraries for the runtime environment
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy built node_modules and prisma files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy source code and configuration
COPY src ./src
COPY tsconfig.json ./

# Create the uploads directory for file storage
RUN mkdir -p /app/uploads

# Enable file watching with polling (specifically for Docker Desktop environments)
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

# Expose the application port and Prisma Studio port
EXPOSE 5000
EXPOSE 5555

# Ensure Prisma Client is generated and start the development server
CMD ["sh", "-c", "npx prisma generate && pnpm dev"]
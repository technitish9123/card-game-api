# Stage 1: Build environment
FROM node:18-alpine AS builder

# Install build tools and python (needed for some node-gyp dependencies)
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for better layer caching
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies (including devDependencies)
RUN npm ci

# Copy source files
COPY src ./src

# Build TypeScript
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Stage 2: Runtime environment
FROM node:18-alpine

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -D appuser

WORKDIR /usr/src/app

# Copy built files from builder
COPY --from=builder --chown=appuser:appuser /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /usr/src/app/package*.json ./
COPY --from=builder --chown=appuser:appuser /usr/src/app/dist ./dist

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Expose port
EXPOSE ${PORT}

# Run application
CMD ["node", "dist/app.js"]
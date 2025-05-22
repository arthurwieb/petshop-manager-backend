# Use Node 22 as base image
FROM node:22-alpine
# Enable Corepack for managing Yarn versions
RUN corepack enable && corepack prepare yarn@4.6.0 --activate

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies with Yarn
RUN rm -rf node_modules
RUN yarn install --immutable
RUN yarn cache clean

COPY prisma/schema.prisma ./prisma/
RUN yarn prisma generate

# Copy the rest of the app files
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose port
EXPOSE 3001

# Start Fastify server
CMD ["yarn", "dev"]

# Use Node 22 as base image
FROM node:22
# Enable Corepack for managing Yarn versions
RUN corepack enable && corepack prepare yarn@4.6.0 --activate

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --immutable

# Copy the rest of the app files
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose port
EXPOSE 3000

# Start Fastify server
CMD ["yarn", "start"]

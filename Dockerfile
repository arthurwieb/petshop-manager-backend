# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the TypeScript source files
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript files
RUN tsc

# Expose the application port
EXPOSE 3000

# Run the Fastify server (compiled JavaScript)
CMD ["node", "dist/server.js"]

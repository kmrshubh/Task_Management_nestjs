# Use a Node.js base image with the version you need for development
FROM node:18-alpine AS builder

# Install necessary build tools
RUN apk --no-cache add python3 make g++

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt (ensure it's rebuilt for Alpine Linux)
RUN npm rebuild bcrypt --build-from-source

# -------------------------
# Final production image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Copy .env files from the root folder
COPY .env.stage.dev .
COPY .env.stage.prod .

# Install production dependencies
RUN npm ci --only=production

# Expose the port your app runs on (if applicable)
EXPOSE 3000

# Define the command to run your app (in this case, start the NestJS server)
CMD ["npm", "run", "start:prod"]

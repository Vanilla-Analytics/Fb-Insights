# Use the official Node.js 18 image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the built application
RUN npm install -g serve

# Expose the port that Railway will assign
EXPOSE $PORT

# Command to run the application using Railway's PORT environment variable
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
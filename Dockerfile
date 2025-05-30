FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy rest of the code
COPY . .

# Build the application using Vite
RUN npm run build

# Optional: Remove devDependencies to reduce image size
RUN npm prune --production

# Install serve globally to serve the built app
RUN npm install -g serve

# Expose the port
EXPOSE $PORT

# Serve the built app
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]

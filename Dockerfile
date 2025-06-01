# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve the static site
RUN npm install -g serve

# Optional: Prune devDependencies if any
RUN npm prune --production

# Let Railway handle PORT env injection; no need to EXPOSE or set ENV
# Start command is handled by railway.json

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

# Expose the port Railway will inject (doesn't hurt)
EXPOSE 3000

# ENTRYPOINT uses the PORT env injected by Railway at runtime
CMD ["sh", "-c", "serve -s dist -l $PORT"]



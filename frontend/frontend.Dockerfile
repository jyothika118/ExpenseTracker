# Stage 1 — Build Vite React frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build for production
RUN npm run build

# Stage 2 — Serve using NGINX default config
FROM nginx:alpine

# Copy build output to NGINX html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

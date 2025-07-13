# Stage 1: Install & build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package info first for caching
COPY package.json yarn.lock ./
COPY frontend/package.json frontend/
COPY mock-server/package.json mock-server/

# Install deps from root using workspaces
RUN yarn install --frozen-lockfile

# Copy the rest of the files
COPY . .

COPY frontend/.env.production frontend/.env

# Build frontend only
WORKDIR /app/frontend
RUN yarn build

# Stage 2: Serve using nginx
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Build stage
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./

#RUN npm install
RUN npm install && chmod -R 777 node_modules

# Copy source code
COPY . ./

#Ensure vue-cli-service is ececutable
RUN chmod +x node_modules/.bin/vue-cli-service

# Build application
RUN npm run build-prod

# 디버깅: 빌드 후 현재 경로 및 /app 디렉터리 내용 확인
RUN pwd
RUN ls -al

# Production stage
FROM nginx:alpine

# Copy built assets and dependencies from build
COPY --from=build /app/dist usr/share/nginx/html

# Expose port
EXPOSE 80

# Start the application
CMD ["nginx", "-g", "daemon off;"]
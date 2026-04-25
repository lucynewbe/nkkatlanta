# Use Node.js 18 LTS
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy root package.json
COPY package.json ./

# Install root dependencies
RUN npm install

# Copy backend and frontend
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Return to root
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=4000

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]

# Use Node.js LTS as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

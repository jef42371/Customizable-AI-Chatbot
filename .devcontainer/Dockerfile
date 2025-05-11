# Use the official Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /workspace

# Install necessary dependencies for development (like ESLint, Prettier, etc.)
RUN npm install -g typescript eslint prettier

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set default command to start the app in development mode
CMD ["npm", "run", "dev"]

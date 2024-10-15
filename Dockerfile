# Use the official Ubuntu 20.04 image as a base
FROM ubuntu:20.04

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port
EXPOSE 8000

# Command to run your application
CMD ["node", "index.js"]

# Use the official Debian image as a base
FROM debian:bullseye

# Install Node.js, npm, and tzdata
RUN apt-get update && apt-get install -y \
    curl \
    tzdata \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
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

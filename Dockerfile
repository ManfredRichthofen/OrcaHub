# Use an appropriate Node.js base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app listens on
EXPOSE 3001

# Define the command to run your app
CMD ["node", "app.js"]
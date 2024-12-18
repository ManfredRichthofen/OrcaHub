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

# Backend Environment Variables
ENV PORT=3001
ENV READARR_API_URL=https://readarr.jfapp.xyz/api
ENV READARR_API_KEY=YOUR_READARR_API_KEY

ENV KAPOWARR_API_KEY=your_kapowarr_api_key_here
ENV KAPOWARR_BASE_URL=https://readarr.jfapp.xyz


# Frontend Environment Variables
ENV VITE_BACKEND_URL=http://localhost:3001

# Expose the port your app listens on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "start"]
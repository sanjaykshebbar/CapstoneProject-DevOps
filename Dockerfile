# Use the official Node.js image
FROM node:16

# Create app directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application source code, including index.html and background-image.jpg
COPY src/ ./src

# Expose port 3000
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]

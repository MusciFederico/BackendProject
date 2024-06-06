# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /fedemusci/projectbackend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including the necessary build tools
RUN apt-get update && apt-get install -y python3 make g++ && \
    npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "start"]

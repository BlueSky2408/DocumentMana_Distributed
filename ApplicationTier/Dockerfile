# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Bind the port that the app runs on
EXPOSE 3001

# Define the command to run your app
CMD [ "nodemon", "app.js" ]

# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the React project code to the container
COPY . /app/

# Build the React app
#RUN npm run build

# Set environment variables
ENV NODE_ENV=development

# Expose the port on which the React app runs
EXPOSE 3000

# Run the React app
CMD ["npm", "run", "dev"]

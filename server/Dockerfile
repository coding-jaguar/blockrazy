# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 5000

# Step 7: Define the command to run the app using nodemon if you are using it for development
CMD ["npm", "run", "dev"]

# Or for production, use:
# CMD ["npm", "start"]

# FROM node:20-alpine


# WORKDIR /app
# COPY . .
# COPY package*.json ./
# RUN npm install

# CMD ["npm", "run", "dev", "--", "--host"]



# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port (default Vite port is 5173)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]

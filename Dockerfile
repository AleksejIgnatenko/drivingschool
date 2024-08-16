FROM node:alpine

WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Install js-cookie and Ant Design
RUN npm install js-cookie antd

# Copy the entire project to the Docker container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the correct port
EXPOSE 3000

# Run the Next.js application
CMD ["npm", "start"]
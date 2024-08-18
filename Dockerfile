FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install js-cookie antd
COPY . .
RUN npm run build

CMD ["npm", "start"]
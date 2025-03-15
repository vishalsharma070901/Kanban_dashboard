FROM node:20-alpine


WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
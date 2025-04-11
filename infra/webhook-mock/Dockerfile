FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY server.js .

RUN npm install express body-parser

EXPOSE 5000

CMD ["node", "server.js"]

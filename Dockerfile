FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm pkg set type="module"

COPY . .

EXPOSE 4000

CMD [ "npm","start" ]
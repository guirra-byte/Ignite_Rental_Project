FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 1102

CMD ["npm", "run", "dev"]
FROM node:lts

WORKDIR /app

COPY . /app/
RUN npm install

COPY . .

EXPOSE 3000

CMD node app.js

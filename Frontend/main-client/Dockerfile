FROM node:14

COPY package*.json ./

RUN npm install -g serve

RUN mkdir /buzz-front
WORKDIR /buzz-front

RUN mkdir ./build
COPY ./build ./build

EXPOSE 3000

CMD ["serve", "-s", "-n", "build", "-l", "3000"]

FROM node:14.10

WORKDIR /usr/src/app

COPY ./front/package.json ./
COPY ./front/yarn.lock ./

RUN yarn install

COPY . ./

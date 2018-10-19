from node:8
MAINTAINER tunguyenuni@gmail.com


WORKDIR /usr/src/app

EXPOSE 4000

COPY ./package.json ./

RUN npm install -g yarn

RUN yarn

COPY ./ ./

EXPOSE 4000

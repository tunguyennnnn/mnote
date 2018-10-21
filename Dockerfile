from node:9
MAINTAINER tunguyenuni@gmail.com


WORKDIR /usr/src/app

COPY ./server/package* ./

RUN npm install -g sequelize-cli

RUN npm install

EXPOSE 4000

CMD yarn run start:dev

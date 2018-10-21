from node:9
MAINTAINER tunguyenuni@gmail.com


WORKDIR /usr/src/app

EXPOSE 4000

COPY ./server/package* ./


RUN npm install -g yarn

RUN npm install -g sequelize-cli

RUN yarn

EXPOSE 4000

CMD yarn run start:dev

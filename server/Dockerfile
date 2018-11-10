from node:9
MAINTAINER tunguyenuni@gmail.com

WORKDIR /usr/src/app

COPY ./package* ./

RUN npm install -g sequelize-cli

RUN npm install --quite

COPY . .

EXPOSE 4000

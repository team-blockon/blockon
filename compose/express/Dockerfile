FROM node:8-alpine
LABEL maintainer="jun097kim <jun097kim@gmail.com>"

RUN mkdir /app

RUN \
  apk update &&\
  apk add git &&\
  apk add python2 &&\
  apk add g++&&\
  apk add make

COPY . /app

WORKDIR /app/blockon-backend
RUN yarn

WORKDIR /app/blockon-frontend
RUN yarn
RUN yarn build

ADD compose/express/start.sh /start.sh
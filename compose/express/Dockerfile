FROM node:8
LABEL maintainer="jun097kim <jun097kim@gmail.com>"

RUN mkdir /app

RUN \
  apt-get update &&\
  apt-get -y install git

COPY . /app

WORKDIR /app/blockon-backend
RUN yarn

WORKDIR /app/blockon-frontend
RUN yarn
RUN yarn build

ADD compose/express/start.sh /start.sh
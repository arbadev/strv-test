FROM node:7

MAINTAINER l@hustling.me

ENV src /app/

RUN npm install -g yarn

ADD package.json /tmp/package.json

RUN yarn global add mocha-co
RUN cd /tmp && yarn

ADD yarn.lock /tmp/yarn.lock

RUN mkdir -p $src && cp -a /tmp/node_modules $src
WORKDIR $src
COPY . $src

EXPOSE 8443

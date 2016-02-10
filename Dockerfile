FROM ubuntu:14.04

MAINTAINER Pradip Hudekar

RUN groupadd -r lil && useradd -r -g lil lil-api

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates curl \
		numactl \
	&& rm -rf /var/lib/apt/lists/*

ENV NPM_CONFIG_LOGLEVEL info

ENV NODE_VERSION 5.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1

WORKDIR /app

ADD . /app

RUN npm install strapi -g

RUN npm install

EXPOSE 1337

ENTRYPOINT ["strapi", "start"]
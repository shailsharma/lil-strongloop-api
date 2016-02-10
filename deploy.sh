#!/bin/bash

#build image
docker build -t lil-strongloop-api .

# tag image
docker tag lil-strongloop-api:latest lilapi/lil-strongloop-api:latest
#docker tag lil-strongloop-api:latest lilapi/lil-strongloop-api:build-$CIRCLE_BUILD_NUM

docker login -u=$DOCKER_USERNAME -p=$DOCKER_PASSWORD -e=$DOCKER_EMAIL
docker push lilapi/lil-strongloop-api:latest
#docker push lilapi/lil-strongloop-api:build-$CIRCLE_BUILD_NUM


# trigger deployment
curl -X POST https://dashboard.tutum.co/api/v1/service/dcc48807-b304-4581-b8ab-1836f3af5321/trigger/c8069737-d0e5-4d5c-a4c5-50b531848cc3/call/
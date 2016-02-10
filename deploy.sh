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
# curl -X POST https://dashboard.tutum.co/api/v1/service/4edf2588-2eed-4d35-969f-5531f9723b18/trigger/b9f7ef65-d04f-42ec-b166-2a9480ba58ac/call/

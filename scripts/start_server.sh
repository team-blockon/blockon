#!/bin/sh
cd deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
/usr/local/bin/docker-compose -f docker-compose-deploy.yaml down
docker rm -f express
docker rm -f nginx
/usr/local/bin/docker-compose -f docker-compose-deploy.yaml up -d
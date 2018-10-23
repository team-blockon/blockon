#!/bin/sh
cd deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
docker rm -f blockon_express
docker rm -f blockon_nginx
/usr/local/bin/docker-compose -f docker-compose-deploy.yaml down
/usr/local/bin/docker-compose -f docker-compose-deploy.yaml up -d
#!/bin/sh
cd deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
docker rmi -f blockon_express
docker rmi -f blockon_nginx
docker load -i blockon_express.tar
docker load -i blockon_nginx.tar
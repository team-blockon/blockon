#!/bin/sh
cd /opt/codedeploy-agent/deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
docker rm -f blockon_express
docker rm -f blockon_nginx
/usr/local/bin/docker-compose down
/usr/local/bin/docker-compose up -d
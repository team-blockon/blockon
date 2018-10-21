#!/bin/sh
cd deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
docker-compose -f docker-compose-deploy.yaml up -d
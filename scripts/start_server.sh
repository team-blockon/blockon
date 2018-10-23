#!/bin/sh
cd deployment-root/$DEPLOYMENT_GROUP_ID/$DEPLOYMENT_ID/deployment-archive
/usr/local/bin/docker-compose -f down
/usr/local/bin/docker-compose -f up -d
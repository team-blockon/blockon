#!/bin/sh
echo "MONGO_URI=$MONGO_URI" > .env
echo "SECRET_KEY=$SECRET_KEY" >> .env
echo "BLOCKON_URI=$BLOCKON_URI" >> .env
echo "EMAIL_ID=$EMAIL_ID" >> .env
echo "EMAIL_PASSWORD=$EMAIL_PASSWORD" >> .env
mv .env blockon-backend
ls -a blockon-backend
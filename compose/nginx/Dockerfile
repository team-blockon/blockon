FROM nginx:1.15.5-alpine
LABEL maintainer="jun097kim <jun097kim@gmail.com>"

# 기본 설정파일을 새로운 파일로 대체
RUN rm -rf /etc/nginx/conf.d
COPY compose/nginx/conf.d /etc/nginx/conf.d
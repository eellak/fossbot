#!/bin/bash
echo 'Starting Update'
docker-compose stop
docker-compose down
docker-compose rm -f
docker-compose pull
docker-compose up --build -d
echo 'System Starrted'
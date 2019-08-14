#!/bin/bash
echo "Pulling latest and setting up infrastructure services"
docker-compose up postgres localstack aws_cli keycloak
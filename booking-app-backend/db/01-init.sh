#!/bin/bash
set -e
export PGPASSWORD=$DB_PASSWORD;
# Criar banco de dados
psql -v ON_ERROR_STOP=1 --username "$DB_USERNAME" <<-EOSQL
  CREATE DATABASE javadb;
EOSQL
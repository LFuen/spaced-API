#!/bin/bash

npm run migrate -- 0
npm run migrate
psql -U lili -d spaced-repetition -f ./seeds/seed.tables.sql

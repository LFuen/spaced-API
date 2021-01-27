#!/bin/bash

psql -U lili -d spaced-repetition -f ./migrations/003.undo.create_word.sql
psql -U lili -d spaced-repetition -f ./migrations/002.undo.create_language.sql
psql -U lili -d spaced-repetition -f ./migrations/001.undo.create_user.sql

psql -U lili -d spaced-repetition -f ./migrations/001.do.create_user.sql
psql -U lili -d spaced-repetition -f ./migrations/002.do.create_language.sql
psql -U lili -d spaced-repetition -f ./migrations/003.do.create_word.sql

psql -U lili -d spaced-repetition -f ./seeds/seed.tables.sql

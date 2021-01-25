BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Lili',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'Monsieur', 'Mister', 2),
  (2, 1, 'Merci beaucoup', 'Thank you very much', 3),
  (3, 1, 'Bonsoir', 'Good evening', 4),
  (4, 1, 'Je vous en prie', 'You''re welcome', 5),
  (5, 1, 'Fille', 'Girl', 6),
  (6, 1, 'Garçon', 'Boy', 7),
  (7, 1, 'Bonne Nuit', 'Good night', 8),
  (8, 1, 'Au revoir', 'Goodbye', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;

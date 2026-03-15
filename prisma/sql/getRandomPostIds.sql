-- @param {Float} $1:seed
-- @param {Int} $2:limit
WITH seeded AS (SELECT setseed($1))
SELECT id, "detailComment", random() AS rand
FROM "Video", seeded
ORDER BY rand
LIMIT $2;
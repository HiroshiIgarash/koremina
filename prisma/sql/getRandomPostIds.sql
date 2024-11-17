-- @param {Int} $1:seed
-- @param {Int} $2:limit
SELECT id, "detailComment", rand
FROM (SELECT (SELECT setseed($1)::text), id, "detailComment", random() AS rand FROM "Video")
ORDER BY rand
LIMIT $2;
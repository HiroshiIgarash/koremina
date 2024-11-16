-- @param {Int} $1:seed
-- @param {Int} $2:limit
SELECT id, "detailComment", random() AS rand
FROM (SELECT setseed($1)::text, id, "detailComment" FROM "Video")
ORDER BY rand
LIMIT $2;
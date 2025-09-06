-- @param {String} $1:userId
-- @param {Float} $2:seed
-- @param {Int} $3:limit
SELECT 
  b.id as bookmark_id, 
  b."postId", 
  rand
FROM (
  SELECT 
    (SELECT setseed($2)::text),
    b.id, 
    b."postId", 
    random() AS rand 
  FROM "Bookmark" b
  INNER JOIN "Video" v ON b."postId" = v.id
  WHERE b."userId" = $1
  AND NOT EXISTS (
    SELECT 1 FROM "_seenVideos" sv 
    WHERE sv."A" = v.id AND sv."B" = $1
  )
) as random_unseen
ORDER BY rand
LIMIT $3;
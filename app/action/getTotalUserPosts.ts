import prisma from "@/lib/db";

interface getTotalUserPostsProps {
  userId: string;
}

const getTotalUserPosts = async ({ userId }: getTotalUserPostsProps) => {
  const count = await prisma.video.count({
    where: {
      postedUserId: userId,
    },
  });
  return count;
};

export default getTotalUserPosts;

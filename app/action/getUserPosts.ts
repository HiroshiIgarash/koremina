import prisma from "@/lib/db";

interface getUserPostsProps {
  userId: string;
  take?: number;
  skip?: number;
}

const getUserPosts = async ({ userId, take, skip }: getUserPostsProps) => {
  const posts = await prisma.video.findMany({
    where: {
      postedUserId: userId,
    },
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedUser: true,
      liver: {
        select: {
          name: true,
        },
      },
      Bookmark: true,
      seenUsers: true,
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
          comments: true,
        },
      },
    },
    take,
    skip,
  });

  return posts;
};

export default getUserPosts;
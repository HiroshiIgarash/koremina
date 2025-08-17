import prisma from "@/lib/db";

const getReactionsByPostId = async (id: string) => {
  const post = await prisma.video.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      good: {
        select: {
          id: true,
        },
      },
      bad: {
        select: {
          id: true,
        },
      },
      love: {
        select: {
          id: true,
        },
      },
      funny: {
        select: {
          id: true,
        },
      },
      cry: {
        select: {
          id: true,
        },
      },
      angel: {
        select: {
          id: true,
        },
      },
    },
  });

  return post;
};

export default getReactionsByPostId;

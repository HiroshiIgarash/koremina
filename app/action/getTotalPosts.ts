import prisma from "@/lib/db";

interface getTotalPostsProps {
  filterLiver?: string;
}

const getTotalPosts = async ({ filterLiver }: getTotalPostsProps = {}) => {
  const count = await prisma.video.count({
    where: filterLiver
      ? {
          liver: {
            some: {
              id: filterLiver,
            },
          },
        }
      : {},
  });
  return count;
};

export default getTotalPosts;

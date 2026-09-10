import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface getTotalPostsProps {
  filterLiver?: string;
}

const getTotalPosts = async ({ filterLiver }: getTotalPostsProps = {}) => {
  "use cache";
  cacheTag("get-post");
  cacheLife("max");

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

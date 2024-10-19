import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

interface getPostsProps {
  take?: number;
  skip?: number;
  filterLiver?: string;
}

const getPosts = unstable_cache(
  async ({ take, skip, filterLiver }: getPostsProps = {}) => {
    const posts = await prisma.video.findMany({
      where: filterLiver
        ? {
            liver: {
              some: {
                id: filterLiver,
              },
            },
          }
        : {},
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
  },
  [],
  {
    tags: ["get-post"],
  }
);

export default getPosts;

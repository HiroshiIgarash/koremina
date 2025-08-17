import prisma from "@/lib/db";
import { Video } from "@prisma/client";

const Page = async () => {
  const posts = await prisma.video.findMany({
    where: {
      detailComment: {
        not: "",
      },
    },
  });
  return (
    <div>
      {posts
        .toSorted((b, a) => a.detailComment!.length - b.detailComment!.length)
        .map((post, index) => (
          <p key={post.id} className="flex">
            <span>
              {index + 1}/{posts.length}
            </span>{" "}
            ({post.detailComment!.length}){post.detailComment}
          </p>
        ))}
    </div>
  );
};

export default Page;

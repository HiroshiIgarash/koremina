import { MetadataRoute } from "next";
import getPosts from "./action/getPosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://koremina.vercel.app"; // URLは.envに記載
  const lastModified = new Date();
  const allPosts = await getPosts();

  const postPaths = allPosts.map((post) => {
    return {
      url: `${baseURL}/post/${post.id}`,
      lastModified: post.postedAt,
    };
  });

  const staticPaths = [
    {
      url: baseURL,
      lastModified,
    },
    {
      url: `${baseURL}/about`,
      lastModified,
    },
    {
      url: `${baseURL}/faq`,
      lastModified,
    },
    {
      url: `${baseURL}/policy`,
      lastModified,
    },
  ];

  return [...staticPaths,...postPaths];
}

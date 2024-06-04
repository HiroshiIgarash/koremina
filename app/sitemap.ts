import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = 'https://koremina.vercel.app'; // URLは.envに記載
  const lastModified = new Date();

  const staticPaths = [{
    url: baseURL,
    lastModified
  }, {
    url: `${baseURL}/about`,
    lastModified
  }, {
    url: `${baseURL}/faq`,
    lastModified
  }, {
    url: `${baseURL}/policy`,
    lastModified
  },
];

  return [ ...staticPaths ];
}
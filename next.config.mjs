/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'lh3.googleusercontent.com'
    }, {
      hostname: 'i.ytimg.com'
    }, {
      hostname: 'yt3.ggpht.com'
    }, {
      hostname: 'pbs.twimg.com'
    }, {
      hostname: '1oe7z4chqcuzcgh4.public.blob.vercel-storage.com'
    }
    ]
  }
};

export default nextConfig;

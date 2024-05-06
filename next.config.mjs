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
    }
    ]
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" }
    ]
  },
  experimental: {
    // styled-components is used by the Sanity Studio embed
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BITLY_API_KEY: process.env.BITLY_API_KEY,
    BITLY_GROUP_GUID: process.env.BITLY_GROUP_GUID,
    BITLY_DOMAIN: process.env.BITLY_DOMAIN,
  },
};

export default nextConfig;
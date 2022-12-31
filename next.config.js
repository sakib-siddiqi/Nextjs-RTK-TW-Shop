/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com", "priyoshop.com",'cdn.shopify.com'],
  },
};

module.exports = nextConfig;

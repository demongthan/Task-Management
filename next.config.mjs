/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["localhost", "https://img.clerk.com", "img.clerk.com"],
      },
};

export default nextConfig;

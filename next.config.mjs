/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["localhost", "https://img.clerk.com", "img.clerk.com"],
      },
      publicRuntimeConfig: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
    }
};

export default nextConfig;

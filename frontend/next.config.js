/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    WEB3_PROVIDER: process.env.NEXT_PUBLIC_WEB3_PROVIDER,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
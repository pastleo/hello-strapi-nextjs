/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_HOST: 'http://localhost:1337',
  }
}

module.exports = nextConfig

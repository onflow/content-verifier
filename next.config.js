/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ipfs.io',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'ipfs.thirdwebcdn.com',
            port: '',
            pathname: `/**`
          }
        ],
      },

}

module.exports = nextConfig

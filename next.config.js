/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // remotePatterns: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'res.cloudinary.com','images.unsplash.com' ],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        // pathname: '/.*',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // pathname: '/.*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        //pathname: '/.*',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // pathname: '/.*',
      }
    ]
  },
}

module.exports = nextConfig

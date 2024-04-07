/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['https://openweathermap.org', 'https://images.unsplash.com/'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        // port: '',
        // pathname: '/account123/**',
      },
      
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  }

};

export default nextConfig;

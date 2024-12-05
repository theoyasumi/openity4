/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  ...(process.env.NODE_ENV === 'development' 
    ? {} 
    : { 
        trailingSlash: true
      }
  )
};

module.exports = nextConfig;
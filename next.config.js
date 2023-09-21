/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "instagram.fnag1-4.fna.fbcdn.net",
      "mdbcdn.b-cdn.net",
      "flowbite.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

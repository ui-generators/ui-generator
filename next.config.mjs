/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'images.clerk.dev',
  //       port: '',
  //       pathname: '/account123/**',
  //     },
  //   ],
  // },

  images: {
    domains: [
      "images.clerk.dev",
      "img.clerk.com",
      "lh5.googleusercontent.com",
      "lh3.googleusercontent.com",
      "resizer.otstatic.com",
    ],
  },

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
};

export default nextConfig;

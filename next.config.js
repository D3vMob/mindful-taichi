
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '', // You can leave this empty if it's the default port
        pathname: '/**', // This allows all paths under 'i.ytimg.com'
      },
      {
        protocol: 'https',
        hostname: 'mtc-images.s3.ap-northeast-1.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  transpilePackages: ['lucide-react']
};

export default config;

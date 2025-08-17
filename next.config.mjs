/** @type {import('next').NextConfig} */
import * as nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
 i18n: nextI18NextConfig.default.i18n,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

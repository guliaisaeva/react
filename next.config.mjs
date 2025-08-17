/** @type {import('next').NextConfig} */
import nextI18NextConfig from './next-i18next.config';

const nextConfig = {
  i18n: nextI18NextConfig.i18n,

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

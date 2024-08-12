// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

import withPWA from "next-pwa";

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true, // Next.js の設定
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//     ],
//   },
// };

// const pwaConfig = {
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   // disable: process.env.NODE_ENV === "development", // 開発環境でPWAを無効化
// };

// // PWA の設定を適用してエクスポート
// export default withPWA({
//   ...nextConfig,
//   ...pwaConfig,
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Next.js の設定
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development", // PWA を一時的に無効化
})(nextConfig);

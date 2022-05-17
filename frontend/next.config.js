/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "d2lduww19xwizo.cloudfront.net",
      "d2qjpcnl86rsan.cloudfront.net",
      "firebasestorage.googleapis.com",
      "i.ibb.co",
      "profile.line-scdn.net",
    ],
  },
});

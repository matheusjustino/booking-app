/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: !isProd,
});

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['page.tsx', 'page.jsx'],
};

module.exports = withPWA(nextConfig);

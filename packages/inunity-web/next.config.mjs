import pwa from 'next-pwa'

const withPWA = pwa({
    dest: 'public',
});


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // experimental: { optimizeCss: true }

};

export default withPWA(nextConfig);
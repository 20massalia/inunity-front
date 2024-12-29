import pwa from 'next-pwa'

const withPWA = pwa({
    dest: 'public',
});


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // experimental: { optimizeCss: true }
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8082/v1/:path*",
            },
        ];
    },
};


export default withPWA(nextConfig);



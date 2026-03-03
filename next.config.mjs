/** @type {import('next').NextConfig} */
const nextConfig = {
    // Exclude remotion folder from Next.js build - it's a separate project
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
            };
        }
        return config;
    },
};

export default nextConfig;

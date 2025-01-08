const nextConfig = {
    // output: 'standalone',
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**'
            }
        ]
    }
};

export default nextConfig;
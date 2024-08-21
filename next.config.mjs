/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com`,
                    pathname: '/**',
                },
            ],
        },
};

export default nextConfig;

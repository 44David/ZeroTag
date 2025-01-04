import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME, 
        port: "",
      }
    ]
  }

};  

export default nextConfig;

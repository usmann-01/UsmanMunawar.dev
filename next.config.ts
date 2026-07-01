import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CR-005: the standalone /about page was folded into the home page. Redirect
  // the old URL to the home About anchor so existing links don't 404.
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/#about',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
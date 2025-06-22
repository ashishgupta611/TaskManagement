import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // ... other config
  serverRuntimeConfig: {
    // Will only be available on the server side
    RSS_PARSER: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};

export default nextConfig;

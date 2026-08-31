import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.2.5'],
};
// next.config.js
module.exports = {
  allowedDevOrigins: ['192.168.2.12'],
}
export default nextConfig;

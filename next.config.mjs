/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage (avatars, fichiers produits)
      { protocol: "https", hostname: "*.supabase.co" },
      // Avatars OAuth Google
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

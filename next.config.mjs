/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
  },
  logging: {
    fetches: {
      fetchUrl: true, // this shows the fetch logs in terminal, very helpful to understand cache behaviour
    },
  },
};

export default nextConfig;

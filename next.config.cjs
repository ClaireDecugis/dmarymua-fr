module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/accueil",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["www.dmarymua.fr"],
  },
};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/:locale/arsenal", destination: "/:locale/a-propos", permanent: true },
      { source: "/:locale/interets", destination: "/:locale/a-propos", permanent: true },
      { source: "/:locale/parcours", destination: "/:locale/a-propos", permanent: true },
      { source: "/:locale/parcours-pro", destination: "/:locale/a-propos", permanent: true },
      { source: "/:locale/parcours-scolaire", destination: "/:locale/a-propos", permanent: true },
      { source: "/:locale/simulateur", destination: "/:locale/projets", permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

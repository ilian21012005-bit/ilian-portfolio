const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import("next").NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
	},
	async redirects() {
		return [
			{
				source: "/:locale/projets/clip-buffer",
				destination: "/:locale/projets/karu",
				permanent: true,
			},
			{
				source: "/:locale/arsenal",
				destination: "/:locale/a-propos",
				permanent: true,
			},
			{
				source: "/:locale/interets",
				destination: "/:locale/a-propos",
				permanent: true,
			},
			{
				source: "/:locale/parcours",
				destination: "/:locale/a-propos",
				permanent: true,
			},
			{
				source: "/:locale/parcours-pro",
				destination: "/:locale/a-propos",
				permanent: true,
			},
			{
				source: "/:locale/parcours-scolaire",
				destination: "/:locale/a-propos",
				permanent: true,
			},
			{
				source: "/:locale/simulateur",
				destination: "/:locale/projets",
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains",
					},
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'none'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
					},
				],
			},
		];
	},
};

module.exports = withNextIntl(nextConfig);

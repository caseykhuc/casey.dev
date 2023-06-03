/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true },
  // Support MDX files as pages:
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  // Support loading `.md`, `.mdx`:
  webpack(config, options) {
    config.module.rules.push(
      ...[
        {
          test: /\.mdx?$/,
          use: [
            // The default `babel-loader` used by Next:
            options.defaultLoaders.babel,
            {
              loader: "@mdx-js/loader",
              /** @type {import('@mdx-js/loader').Options} */
              options: {
                /* jsxImportSource: …, otherOptions… */
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif|mp4)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "/_next",
                name: "static/media/[name].[hash].[ext]",
              },
            },
          ],
        },
      ]
    );

    return config;
  },
  images: {
    loader: "akamai",
    path: "",
    disableStaticImages: true,
  },
};

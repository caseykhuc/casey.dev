import Head from "next/head";

type MetaProps = {
  title: string;
  keywords: string;
  description: string;
  baseUrl: string;
  path: string;
  image: string;
};

const Meta = ({
  title,
  keywords,
  description,
  baseUrl,
  path,
  image,
}: MetaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.svg" />

      {/* Open Graph - Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl + path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter*/}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${baseUrl + path}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Blog",
  keywords: "Next.js, React, TypeScript, Tailwind CSS, MDX",
  description: "",
  baseUrl: "",
  path: "/",
  image: "/home.png",
};

export default Meta;

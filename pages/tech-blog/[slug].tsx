/** @jsxImportSource theme-ui */
import fs from "fs";
import type { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import { useEffect } from "react";
import { Text } from "theme-ui";

import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/vs2015.css";

hljs.registerLanguage("typescript", typescript);

import BlogMeta from "components/BlogMeta";
import Meta from "components/Meta";
import getMdx from "utils/getMdx";

const components = {
  tocitemh2: (props) => <Text variant="caps" {...props} />,
  // Image: () => <Image src="assets/images/social-media-thumbnail.png" />,
  img: ({ src, title, ...rest }) => {
    if (src.endsWith(".mov") || src.endsWith(".mp4")) {
      // console.log("video/" + src.split(".").pop());
      return (
        <>
          <video
            controls
            sx={{
              mx: "auto",
              maxWidth: "100%",
            }}
            {...rest}
          >
            <source
              src={require("assets/videos/" + src).default}
              type="video/mp4"
            />
          </video>
          {title && (
            <figcaption
              sx={{ pt: 2, fontStyle: "italic", textAlign: "center" }}
            >
              {title}
            </figcaption>
          )}
        </>
      );
    }

    return (
      <>
        <img
          src={
            src.startsWith("http")
              ? src
              : require("assets/images/" + src).default
          }
          {...rest}
          sx={{
            mx: "auto",
            display: "block",
            maxWidth: "100%",
          }}
        />
        {title && (
          <figcaption sx={{ pt: 1, fontStyle: "italic", textAlign: "center" }}>
            {title}
          </figcaption>
        )}
      </>
    );
  },
  Video: ({ src, title, ...rest }) => {
    return (
      <>
        <video
          controls
          sx={{
            mx: "auto",
            maxWidth: "100%",
          }}
          {...rest}
        >
          <source
            src={require("assets/videos/" + src).default}
            type="video/mp4"
          />
        </video>
        {title && (
          <figcaption sx={{ pt: 2, fontStyle: "italic", textAlign: "center" }}>
            {title}
          </figcaption>
        )}
      </>
    );
  },
};

const Post: NextPage | any = ({
  source,
  meta,
  slug,
}: {
  source: any;
  meta: any;
  slug: string;
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <Meta
        title={meta.title}
        path={`/tech-blog/${slug}`}
        description={meta.description}
        image={meta.thumbnailUrl}
      />
      <BlogMeta {...meta} />
      <MDXRemote {...source} components={components} />
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const blogsDirectory = path.join("tech-blogs");

  const files = fs.readdirSync(blogsDirectory);

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false, // if access path/slug that doesn't exist -> 404 page
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { mdxSource } = await getMdx("tech-blogs", slug);

  return { props: { source: mdxSource, meta: mdxSource.frontmatter, slug } };
};

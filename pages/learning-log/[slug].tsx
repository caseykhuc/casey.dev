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
  img: ({ src, title, ...rest }) => {
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

const Log: NextPage | any = ({
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

  const mainCategory = meta.title.includes("_")
    ? meta.title.split("_")[0].toLowerCase()
    : null;

  const dateString = new Date(meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Meta
        title={
          mainCategory ? meta.title.slice(mainCategory.length + 1) : meta.title
        }
        path={`/learning-log/${slug}`}
        description={meta.description}
        image={meta.thumbnailUrl}
      />
      <BlogMeta
        {...meta}
        title={
          mainCategory ? meta.title.slice(mainCategory.length + 1) : meta.title
        }
        tags={mainCategory ? [mainCategory, ...meta.tags] : meta.tags}
        dateString={dateString}
      />
      <MDXRemote {...source} components={components} />
    </>
  );
};

export default Log;

export const getStaticPaths = async () => {
  const blogsDirectory = path.join("learning-logs");

  const files = fs.readdirSync(blogsDirectory);

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".mdx", "").replace(".md", ""),
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
  const { mdxSource, isMarkdown } = await getMdx("learning-logs", slug);

  const {
    title,
    date,
    Date,
    tags: metaTags,
    mainImageUrl,
    excerpt,
    isDraft,
  } = mdxSource.frontmatter;

  // @ts-ignore
  const tags = (metaTags || []).filter(
    (tag: string) => !["note", "pro", "learning-log", "published"].includes(tag)
  );

  const meta = {
    title: title || slug,
    tags,
    mainImageUrl: mainImageUrl || null,
    excerpt: excerpt || "",
    date: date || Date?.toString() || "2024-04-10",
    slug,
    isDraft: !!isDraft,
  };

  return {
    props: {
      source: { ...mdxSource, frontmatter: meta },
      meta,
      slug,
      isMarkdown,
    },
  };
};

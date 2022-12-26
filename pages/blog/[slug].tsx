import fs from "fs";
import type { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import { useEffect } from "react";

import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/vs2015.css";

hljs.registerLanguage("typescript", typescript);

import { Heading, Text } from "theme-ui";
import BlogHeader from "../../src/components/BlogHeader";
import Meta from "../../src/components/Meta";
import getMdx from "../../utils/getMdx";
import BlogMeta from "../../src/components/BlogMeta";

const components = {
  BlogHeader,
  "tocitemh2": (props) => <Text variant="caps" {...props} />,
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
        path={`/blog/${slug}`}
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
  const blogsDirectory = path.join("blogs");

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
  const mdxSource = await getMdx("blogs", slug);

  return { props: { source: mdxSource, meta: mdxSource.frontmatter, slug } };
};

import { useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";

import "highlight.js/styles/vs2015.css";

hljs.registerLanguage("typescript", typescript);

import BlogHeader from "../../src/components/BlogHeader";
// import TableOfContents from '../../src/components/TableOfContents';
import TableOfContentsItem from "../../src/components/TableOfContentsItem";

const components = {
  BlogHeader,
  // TableOfContents,
  TableOfContentsItem,
};

export default function Article({ source }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}

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

export const getStaticProps = async ({ params: { slug } }) => {
  const article = fs.readFileSync(path.join("blogs", slug + ".mdx"));

  const { data: metaData, content } = matter(article);

  const mdxSource = await serialize(content, { scope: metaData });
  return { props: { source: mdxSource } };
};

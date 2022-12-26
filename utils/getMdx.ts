import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";

export default async function getMdx(dirPath: string, slug: string) {
  const source = fs.readFileSync(path.join(dirPath, slug + ".mdx"), "utf8");

  return await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
        rehypeToc,
      ],
      format: "mdx",
    },
  });
}

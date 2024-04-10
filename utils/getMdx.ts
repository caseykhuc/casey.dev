import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import remarkGfm from "remark-gfm";

const getFile = (path: string) => {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (e) {
    return null;
  }
};

export default async function getMdx(dirPath: string, slug: string) {
  try {
    const source =
      getFile(path.join(dirPath, slug + ".mdx")) ||
      getFile(path.join(dirPath, slug + ".md"));

    // Remove any paragraph under Heading 3 "Related" or "Metadata" or "Context" at the beginning of the file
    const purify = (source: string) => {
      if (source.includes("#### Post")) {
        return source.split("#### Post")[1];
      }

      let output = "";

      if (source.includes("#### Related")) {
        // remove #### Related along with the followed paragraph
        output = source.replace(/#### Related[\s\S]*?####/g, "####");
      }

      return output
        .replace("#### Summary", "# Summary")
        .replace("#### Takeaways", "# Takeaways")
        .replace("#### Personal thoughts", "# Personal thoughts");
    };

    const isMarkdown = getFile(path.join(dirPath, slug + ".mdx")) === null;

    return {
      isMarkdown,
      mdxSource: await serialize(purify(source), {
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
            [
              rehypeToc,
              {
                customizeTOC: (toc) => {
                  if (toc.children[0].children.length > 0) {
                    return toc;
                  }
                  return false;
                },
              },
            ],
          ],
          remarkPlugins: [remarkGfm],
          format: isMarkdown ? "md" : "mdx",
        },
      }),
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

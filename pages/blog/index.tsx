/** @jsxImportSource theme-ui */
import fs from "fs";
import type { InferGetStaticPropsType, NextPage } from "next";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import path from "path";
import { Badge, Paragraph, Themed } from "theme-ui";

type PostMeta = {
  title: string;
  tags: string[];
  mainImageUrl?: string;
  excerpt: string;
  dateString: string;
  slug: string;
  isDraft: boolean;
};

const Blog: NextPage | any = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <section>
        {posts
          .filter((post) => !post.isDraft)
          .map(({ slug, title, excerpt, dateString, tags }) => (
            <div sx={{ mb: 6 }} key={slug}>
              <div>{dateString}</div>

              <Themed.h2 sx={{ mb: 2, mt: 2 }}>
                <Link href={`/blog/${slug}`} passHref>
                  <Themed.a
                    sx={{
                      color: "text",
                    }}
                  >
                    {title}
                  </Themed.a>
                </Link>
              </Themed.h2>
              <Paragraph>{excerpt}</Paragraph>
              <div sx={{ my: 2 }}>
                {tags.map((tag) => (
                  <Badge key={tag} variant="tag" mr={2} paddingX={2}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const blogsDirectory = path.join("blogs");

  const files = fs.readdirSync(blogsDirectory);

  const blogPosts = await Promise.all(
    files.map(async (file) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("blogs", file),
        "utf-8"
      );
      const {
        frontmatter: {
          title,
          dateString,
          tags,
          mainImageUrl,
          excerpt,
          isDraft,
        },
      }: any = await serialize(markdownWithMeta, {
        parseFrontmatter: true,
      });
      return {
        title,
        tags,
        mainImageUrl: mainImageUrl || null,
        excerpt: excerpt || "",
        dateString,
        slug: file.replace(".mdx", ""),
        isDraft: !!isDraft,
      } as PostMeta;
    })
  );

  return {
    props: {
      posts: blogPosts.sort(
        (a, b) =>
          new Date(b.dateString).valueOf() - new Date(a.dateString).valueOf()
      ),
    },
  };
}

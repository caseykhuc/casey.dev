/** @jsxImportSource theme-ui */
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import { Badge, Paragraph, Themed } from "theme-ui";

export default function Blog({ posts }) {
  return (
    <>
      <section>
        {posts.map(
          ({
            slug,
            metaData: { title, excerpt, dateString, mainImageUrl, tags },
          }) => (
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
          )
        )}
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const blogsDirectory = path.join("blogs");

  const files = fs.readdirSync(blogsDirectory);

  const blogPosts = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const article = fs.readFileSync(path.join("blogs", fileName));
    const { data: metaData } = matter(article);
    return { slug, metaData };
  });

  return {
    props: {
      posts: blogPosts.sort(
        (a, b) =>
          new Date(b.metaData.dateString).valueOf() -
          new Date(a.metaData.dateString).valueOf()
      ),
    },
  };
};

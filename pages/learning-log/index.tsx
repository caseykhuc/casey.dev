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
  mainCategory?: string;
  mainImageUrl?: string;
  excerpt: string;
  date: string;
  slug: string;
  isDraft: boolean;
};

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const LearningLog: NextPage | any = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const mainCategories: string[] = posts
    .map((post) => post.mainCategory)
    .filter(Boolean)
    .filter(onlyUnique);

  return (
    <>
      <section>
        {[...mainCategories, "Others"].map((category, index) => (
          <div
            key={category}
            style={{
              marginTop: index === 0 ? 0 : 60,
            }}
          >
            <Themed.h1
              sx={{
                textTransform: "capitalize",
                color: "primary",
              }}
            >
              {category}
            </Themed.h1>
            <div>
              {posts
                .filter(
                  (post) =>
                    post.mainCategory === category ||
                    (category === "Others" && !post.mainCategory)
                )
                .map(({ slug, title, excerpt, date, tags }) => {
                  const dateString = new Date(date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );

                  return (
                    <div sx={{ mb: 6 }} key={slug}>
                      <div>{dateString}</div>
                      <Themed.h3 sx={{ mb: 2, mt: 2 }}>
                        <Link href={`/learning-log/${slug}`} passHref>
                          <Themed.a
                            sx={{
                              color: "text",
                            }}
                          >
                            {title}
                          </Themed.a>
                        </Link>
                      </Themed.h3>
                      <Paragraph>{excerpt}</Paragraph>
                      <div sx={{ my: 2 }}>
                        {tags.map((tag) => (
                          <Badge key={tag} variant="tag" mr={2} paddingX={2}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default LearningLog;

export async function getStaticProps() {
  const blogsDirectory = path.join("learning-logs");

  const files = fs.readdirSync(blogsDirectory);

  const learningLogs = await Promise.all(
    files.map(async (fileName) => {
      const markdownWithMeta = fs.readFileSync(
        path.join("learning-logs", fileName),
        "utf-8"
      );
      const {
        frontmatter: {
          title: metaTitle,
          date,
          Date,
          tags: metaTags,
          mainImageUrl,
          excerpt,
          isDraft,
        },
      }: any = await serialize(markdownWithMeta, {
        parseFrontmatter: true,
      });

      const processedFileName = fileName.replace(".mdx", "").replace(".md", "");
      let title = metaTitle || processedFileName;
      const tags = (metaTags || []).filter(
        (tag: string) =>
          !["note", "pro", "learning-log", "published"].includes(tag)
      );

      const mainCategory = title.includes("_")
        ? title.split("_")[0].toLowerCase()
        : null;

      if (mainCategory) {
        title = title.slice(mainCategory.length + 1);
      }

      return {
        title,
        tags,
        mainImageUrl: mainImageUrl || null,
        excerpt: excerpt || "",
        date: date || Date?.toString() || "2024-04-10",
        slug: processedFileName,
        isDraft: !!isDraft,
        mainCategory,
      } as PostMeta;
    })
  );

  return {
    props: {
      posts: learningLogs.sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      ),
    },
  };
}

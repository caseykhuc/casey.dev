/** @jsxImportSource theme-ui */
import { Badge, Flex, Themed, Text } from "theme-ui";

type Props = {
  dateString: string;
  mainImageUrl?: string;
  tags: string[];
  title: string;
};

export default function BlogMeta({
  dateString,
  mainImageUrl,
  tags,
  title,
}: Props) {
  return (
    <div sx={{ mb: 7 }}>
      <Themed.h1>{title}</Themed.h1>
      <Flex
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Text sx={{ color: "GrayText" }}>{dateString}</Text>
        <Flex
          style={{ maxWidth: 400 }}
          sx={{
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          {tags.map((tag) => (
            <Badge key={tag} variant="tag" paddingX={2}>
              {tag}
            </Badge>
          ))}
        </Flex>
      </Flex>
      {mainImageUrl && (
        <div sx={{ width: "100%", pt: 32 }}>
          <img
            sx={{ width: "100%" }}
            src={
              mainImageUrl.startsWith("http")
                ? mainImageUrl
                : require("assets/images/" + mainImageUrl).default
            }
            alt="cover-image"
          />
        </div>
      )}
    </div>
  );
}

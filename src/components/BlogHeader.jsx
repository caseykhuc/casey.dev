import Image from "next/image";

const BlogHeader = ({ title, dateString, mainImageUrl }) => {
  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h1>{title}</h1>
      <Image style={{ width: "600px" }} src={mainImageUrl} alt="" />
      <p>Posted on {dateString}</p>
    </div>
  );
};

export default BlogHeader;

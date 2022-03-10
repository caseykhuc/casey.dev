const BlogHeader = ({ title, dateString, mainImageUrl }) => {
  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h1>{title}</h1>
      <img style={{ width: "600px" }} src={mainImageUrl} />
      <p>Posted on {dateString}</p>
    </div>
  );
};

export default BlogHeader;


const TableOfContentsItem = ({ topic, children }) => {
  return (
    <section id={topic.toLowerCase()} className='section-heading'>
      <h2>{topic}</h2>
      <div>{children}</div>
    </section>
  );
};

export default TableOfContentsItem;

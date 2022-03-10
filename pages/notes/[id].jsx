/** @jsxImportSource theme-ui */
import { useRouter } from "next/router";

export default ({ note }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div sx={{ variant: "containers.page" }}>
      <h1>Note: {note.id} </h1>
      <h2>{note.title} </h2>
    </div>
  );
};

export async function getServerSideProps({ params, req, res }) {
  const response = await fetch(`http://localhost:3000/api/note/${params.id}`);

  if (!response.ok) {
    res.writeHead(302, { Location: "/notes" });
    res.end();
    return {
      props: {},
    };
  }
  const { data } = await response.json();

  console.log({ data });

  return {
    props: { note: data },
  };
}

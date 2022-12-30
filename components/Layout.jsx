/** @jsxImportSource theme-ui */
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div
      sx={{
        maxWidth: "container",
        mx: "auto",
        px: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav />
      <main
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

/** @jsxImportSource theme-ui */
import { Divider } from "theme-ui";

const ExternalLink = ({ href, children }) => (
  <a
    sx={{
      color: "gray",
      ":hover": {
        color: "secondary",
      },
      textDecoration: "none",
    }}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <>
      <Divider sx={{ my: 5, color: "muted" }} />
      <div
        sx={{
          color: "gray",
          display: "flex",
          justifyContent: "space-between",
          mb: 7,
        }}
      >
        <div
          sx={{
            flexBasis: 300,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <div>
            Email:{" "}
            <span sx={{ color: "secondary" }}>khuctrang1812@gmail.com</span>
          </div>
          <div>
            Tel: <span sx={{ color: "secondary" }}>+84 394 552 851</span>
          </div>
        </div>
        <div
          sx={{
            flexBasis: 300,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <div>
            <ExternalLink href="https://github.com/khuctrang">
              GitHub
            </ExternalLink>
          </div>
          <div>
            <ExternalLink href="https://www.linkedin.com/in/casey-trang-khuc-804966148/">
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>
    </>
  );
}

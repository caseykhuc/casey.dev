/** @jsxImportSource theme-ui */
import { useRouter } from "next/router";
import NextLink from "next/link";

export default function NavItem({ href, children }) {
  const router = useRouter();
  const isActive =
    href === "/" ? router.pathname === href : router.asPath.startsWith(href);

  return (
    <NextLink href={href}>
      <a
        sx={{
          px: 3,
          py: 2,
          mr: 3,
          fontSize: 2,
          cursor: "pointer",
          borderRadius: 6,
          ":hover": {
            backgroundColor: "muted",
          },
          color: isActive ? "text" : "gray",
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        <span className="capsize">{children}</span>
      </a>
    </NextLink>
  );
}

/** @jsxImportSource theme-ui */
import { Flex, useColorMode } from "theme-ui";
import NavItem from "./NavItem";

const Nav = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = () => {
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <Flex
      as="nav"
      py={5}
      sx={{
        alignItems: "baseline",
      }}
    >
      <div sx={{ ml: -3 }}>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/blog">Blog</NavItem>
      </div>

      <div sx={{ ml: "auto" }}>
        <button
          onClick={toggleColorMode}
          sx={{
            fontWeight: "bold",
            fontSize: 1,
            backgroundColor: "muted",
            py: 2,
            px: 3,
            color: "text",
            cursor: "pointer",
            border: 0,
            borderRadius: 4,
            ":hover": {
              outlineColor: "primary",
              outlineStyle: "solid",
            },
            transition: "all 0.15s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </Flex>
  );
};

export default Nav;

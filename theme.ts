import "typeface-source-sans-pro";
import { Theme } from "theme-ui";
import { deep, dark, swiss } from "@theme-ui/presets";

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  fonts: {
    ...swiss.fonts,
  },
  config: {
    initialColorModeName: "swiss",
  },
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        ...dark.colors,
      },
      deep: {
        ...deep.colors,
      },
    },
  },
  space: [0, 4, 8, 12, 16, 24, 32, 64, 96, 128],
  sizes: {
    container: 850,
  },
  fontSizes: [16, 18, 20, 24, 28, 36, 44],
  lineHeights: {
    // I want a line height of 32px for the body
    // because that's a nice number for incremental margings.
    // The font size for the body is 20px so 32/20 = 1.6
    body: 1.6,
    heading: 1.2,
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 600,
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
      marginTop: 6,
      marginBottom: 2,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
      marginTop: 6,
      marginBottom: 0,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    p: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 2,
      marginTop: 3,
      marginBottom: 0,
    },
    a: {
      color: "primary",
      textDecoration: "none",
      ":active, :hover": {
        color: "primary",
      },
    },
    ul: {
      fontSize: 2,
      marginTop: 3,
      marginBottom: 0,
      paddingLeft: 6,
      listStyleType: "disc",
      ul: {
        marginTop: 0,
      },
    },
    // not sure where the rest of these styles came from but they can stay
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      fontSize: 0,
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
  badges: {
    primary: {
      color: "background",
      bg: "primary",
    },
    tag: {
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 0 1px",
      borderRadius: "8px",
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: "bold",
    },
    input: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: "none",
      },
    },
    select: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: "none",
      },
    },
    textarea: {
      borderColor: "gray",
      "&:focus": {
        borderColor: "primary",
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: "none",
      },
    },
    slider: {
      bg: "muted",
    },
  },
};

export default theme;

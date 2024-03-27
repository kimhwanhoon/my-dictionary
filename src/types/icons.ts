export type IconProps = {
  light: { base: { line: string; fill: string } };
  dark: { base: { line: string; fill: string } };
};

export const footerIconColor = {
  light: {
    base: {
      line: "#d3d8ec",
      fill: "#fff",
    },
    selected: {
      line: "#aba5f7",
      fill: "#8980f2",
    },
  },
  dark: {
    base: {
      line: "#888",
      fill: "transparent",
    },
    selected: {
      line: "#fff",
      fill: "transparent",
    },
  },
};

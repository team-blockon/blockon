import Typography from "typography";

const typography = new Typography({
  googleFonts: [
    {
      name: "Nunito",
      styles: ["400", "700"]
    },
    {
      name: "Open Sans",
      styles: ["400", "600"]
    }
  ],
  headerFontFamily: ["Nunito", "Helvetica", "sans-serif"],
  bodyFontFamily: ["Open Sans", "Helvetica", "sans-serif"],
  includeNormalize: false
});

export default typography.toString();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "280px",
        md: "768px",
        lg: "1393px",
        xl: "1440px",
      },

      colors: {
        normalBlack: "#161616",
        grayBox: "#212121",
        containerGray: "#2C2C2C",
        projectBg: "#373737",
        borderCol: "#3C3C3C",
        pp_bg: "#2B2B2B",
        arrowIcon: "#696969",
      },

      animation: {
        scroll: "scroll 10s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  variants: {
    animation: ["responsive", "hover"],
  },
  plugins: [],
};

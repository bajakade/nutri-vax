/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        /* ------------------ LIGHT MODE ------------------ */
        background: "#ffffff",
        foreground: "#000000",

        card: "#ffffff",
        "card-foreground": "#000000",

        popover: "#ffffff",
        "popover-foreground": "#000000",

        primary: "#006600",
        "primary-foreground": "#ffffff",

        secondary: "#f0f0f0",
        "secondary-foreground": "#000000",

        muted: "#f5f5f5",
        "muted-foreground": "#666666",

        accent: "#00A651",
        "accent-foreground": "#ffffff",

        destructive: "#DC3545",
        "destructive-foreground": "#ffffff",

        success: "#28A745",
        "success-foreground": "#ffffff",

        warning: "#FD7E14",
        "warning-foreground": "#ffffff",

        border: "rgba(0, 0, 0, 0.1)",
        input: "transparent",
        "input-background": "#f8f8f8",
        "switch-background": "#cbced4",

        /* Charts */
        "chart-1": "#006600",
        "chart-2": "#00A651",
        "chart-3": "#28A745",
        "chart-4": "#FD7E14",
        "chart-5": "#DC3545",

        /* Sidebar */
        sidebar: "#006600",
        "sidebar-foreground": "#ffffff",
        "sidebar-primary": "#00A651",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#005500",
        "sidebar-accent-foreground": "#ffffff",
        "sidebar-border": "#005500",
        "sidebar-ring": "#00A651",

        /* ------------------ DARK MODE ------------------ */
        dark: {
          background: "oklch(0.145 0 0)",
          foreground: "oklch(0.985 0 0)",

          card: "oklch(0.145 0 0)",
          "card-foreground": "oklch(0.985 0 0)",

          popover: "oklch(0.145 0 0)",
          "popover-foreground": "oklch(0.985 0 0)",

          primary: "oklch(0.985 0 0)",
          "primary-foreground": "oklch(0.205 0 0)",

          secondary: "oklch(0.269 0 0)",
          "secondary-foreground": "oklch(0.985 0 0)",

          muted: "oklch(0.269 0 0)",
          "muted-foreground": "oklch(0.708 0 0)",

          accent: "oklch(0.269 0 0)",
          "accent-foreground": "oklch(0.985 0 0)",

          destructive: "oklch(0.396 0.141 25.723)",
          "destructive-foreground": "oklch(0.637 0.237 25.331)",

          border: "oklch(0.269 0 0)",
          input: "oklch(0.269 0 0)",
          ring: "oklch(0.439 0 0)",

          /* Dark charts */
          "chart-1": "oklch(0.488 0.243 264.376)",
          "chart-2": "oklch(0.696 0.17 162.48)",
          "chart-3": "oklch(0.769 0.188 70.08)",
          "chart-4": "oklch(0.627 0.265 303.9)",
          "chart-5": "oklch(0.645 0.246 16.439)",

          /* Dark sidebar */
          sidebar: "oklch(0.205 0 0)",
          "sidebar-foreground": "oklch(0.985 0 0)",
          "sidebar-primary": "oklch(0.488 0.243 264.376)",
          "sidebar-primary-foreground": "oklch(0.985 0 0)",
          "sidebar-accent": "oklch(0.269 0 0)",
          "sidebar-accent-foreground": "oklch(0.985 0 0)",
          "sidebar-border": "oklch(0.269 0 0)",
          "sidebar-ring": "oklch(0.439 0 0)",
        },
      },

      /* Radius mapping from your CSS */
      borderRadius: {
        sm: "calc(0.625rem - 4px)", // approx sm
        md: "calc(0.625rem - 2px)",
        lg: "0.625rem",
        xl: "calc(0.625rem + 4px)",
      },

      fontWeight: {
        normal: "400",
        medium: "500",
      },
    },
  },

  plugins: [],
};

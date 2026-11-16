/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: "#FAFAF8",
          darkBg: "#0F1115",
          ink: "#171717",
          darkInk: "#F3F4F6",
          card: "#F1F2F4",
          darkCard: "#181B22",
          cardBorder: "#E5E7EB",
          darkCardBorder: "#262A36",
          accent: "#315CF5",
          accentHover: "#2046DB",
          accentLight: "#EBF0FF",
          muted: "#6B7280",
          darkMuted: "#9CA3AF",
          surface: "#FFFFFF",
          darkSurface: "#14171E",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        editorial: '72ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#111827',
        muted: {
          DEFAULT: '#F9FAFB',
          foreground: '#6B7280',
          border: '#E5E7EB',
        },
        primary: {
          DEFAULT: '#111827',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          subtle: '#EFF6FF',
          foreground: '#1D4ED8',
        },
        surface: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        'content': '1240px',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tighter': '-0.025em',
        'tight': '-0.015em',
      }
    },
  },
  plugins: [],
}

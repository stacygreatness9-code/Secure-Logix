export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0f172a',
        'gold': '#fbbf24',
        'secure': '#10b981',
        'accessing': '#f59e0b',
        'breach': '#ef4444',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
    },
  },
  plugins: [],
}

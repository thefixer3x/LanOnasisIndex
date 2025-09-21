export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0a1930',
        'primary-light': '#0f233a',
        'primary-dark': '#050f1c',
        'primary-darker': '#030a14',
        secondary: '#00b4ff',
        accent: '#39ff14',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'sf-pro': ['"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

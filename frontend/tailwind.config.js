/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4A90E2', dark: '#1A3A52', darker: '#0F2742', light: '#E8F5FF' },
        navy: { DEFAULT: '#1A3A52', dark: '#0F2742' },
        gold: { DEFAULT: '#D4A574', light: '#F5E6D3' },
        dark: { DEFAULT: '#031A2D', card: '#0A2944' },
        charcoal: '#2C3E50',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        ui: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'scale-in': 'scaleIn 0.4s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(74,144,226,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(74,144,226,0.7)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
    },
  },
  plugins: [],
}

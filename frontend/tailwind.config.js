// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Palette
        'sphynx-black': '#050505', // Deepest black, not 000
        'sphynx-rich': '#0F0F0F',  // Slightly lighter for cards/sections
        'sphynx-gold': '#C5A059',  // Muted, metallic champagne gold (Classier)
        'sphynx-gold-light': '#E5C585', 
        'sphynx-light': '#F2F2F2', // Soft white, not harsh #FFF
        'sphynx-gray': '#888888',
      },
      fontFamily: {
        // Make sure you import 'Playfair Display' and 'Inter' in your CSS
        'display': ['Playfair Display', 'serif'], 
        'body': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.2em', // Wide spacing for uppercase text
      },
      height: {
        'screen-90': '90vh',
      }
    },
  },
  plugins: [],
}
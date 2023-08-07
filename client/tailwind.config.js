/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        background: '#FFFFFF', // White background color
        primary: '#FF5722', // Primary color used for call-to-action elements
        blue: '#2979FF', // Blue color for accent elements
        lightOrange: '#FFF2E9', // Light orange color for special elements and background
        lightGray: '#F2F2F2', // Light gray background color
        mediumGray: '#4a5568', // Medium gray color for secondary text
        redGoogle: "#DB4437",
        blueFacebook: "#3B5998",
      },
    },
  },
  content: ['./index.html', './src/**/*.{js,jsx}'],

  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,jsx}'],

  plugins: [],
};

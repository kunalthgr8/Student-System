/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        'custom-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
    colors: {
      "nav-color": "#033B4A",
      "nav-active": "#9DABAF",
      "button-color": "#10847E",
      "logout-color": "#EE1B1B",
      "text-green": "#2DA95C",
      "nav-white": "white",
      "back-color": "#c2d1d6;",
      "heading-color": "gray",
      "ad-color": "#026077",
      "offer-active": "#d9d9d9,",
      "black-heading": "#424242",
      "primary-color": "#673ab7",
      "primary-light-color": "#ede7f6",
      "secondary-color": "#2196f3"
    },
  },
  plugins: [],
};
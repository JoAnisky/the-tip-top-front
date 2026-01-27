/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
        colors: {
            "ttt-white" : "#FCFAF9",
            "ttt-black" : "#050505",
            "ttt-grey-placeholders" : "#B8B8B8",
            "ttt-dark-grey" : "#19191A",
            "ttt-light-grey" : "#333333",
            "ttt-grey-stroke" : "#4C4C4C",
            "ttt-status-red" : "#C40000",
            "ttt-status-green" : "#0B6033",
            "ttt-green-light" : "#677C2D",
            "ttt-green-dark" : "#4F7A16",
            "ttt-orange" : "#DD6835",
            "ttt-form-background" : "#232323",
        },
        fontFamily: {
            'open': ['Open Sans', 'sans-serif'],
            'lato': ['Lato', 'sans-serif'],
            'cream': ['CreamCake', 'cursive'],
        },
        screens: {
            // aligner les breakpoints Tailwind sur les variables SCSS
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1440px'
        },
    },
  },
  plugins: [],
}
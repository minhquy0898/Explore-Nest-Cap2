/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#35405a',
        cusCheck: '#20bf55',
        hightlight: '#faa935',
      },
      keyframes: {
        customRipple: {
          '0%': {
            boxShadow: '0 0 0 0 rgb(238 175 6 / 30%), 0 0 0 0.5em rgb(241 170 8 / 30%), 0 0 0 0.7em rgb(237 124 8 / 30%), 0 0 0 1em rgb(241 137 13 / 30%)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgb(217 145 28 / 30%), 0 0 0 0.5em rgb(233 165 10 / 10%), 0 0 0 1em rgb(230 146 10 / 10%), 0 0 0 1.5em rgb(235 149 10 / 0%)',
          },
        },
      },
      animation: {
        customRipple: 'customRipple 5s linear infinite',
      },
      boxShadow: {
        'custom': '0px 7px 29px rgba(100, 100, 111, 0.2)',
      },
      fontSize: {
        '8px': '8px',
        '12px': '12px'
      },
      backgroundColor: {
        'custom-blue': '#0d192e',
      },
    },
  },
  plugins: [],
};

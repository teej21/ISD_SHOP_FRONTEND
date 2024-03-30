/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'special_case': '930px'
      },
      colors: {
        'login_input': '#EDE9E9',
        'f_pw': '#9A917A'
      },
      width: {
        '3/10': '30%',
        '4/10':'40%',
        '6/10': '60%',
        '8/10': '80%'
      },
      height: {
        '3/10': '30%',
        '4/10':'40%',
        '6/10': '60%',
        '8/10': '80%'
      },
      margin: {
        '3/10': '30%',
        '4/10':'40%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%'
      },
      boxShadow: {
        'shadow_primary': '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
      },
      borderColor: {
        'primary':'#e5e7eb',
      },
      fontFamily: {
        aladin: ["Aladin"],
        beau: ["Beau Rivage"],
      },
      gridTemplateColumns:{
        'gridFlexible2': 'repeat(auto-fit, minmax(320px, 1fr))',
        'smallGrid': 'repeat(auto-fit, minmax(150px, 1fr))',
      },
      gridTemplateRows:{
        'gridFlexible': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
}

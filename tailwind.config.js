/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      lg: '1020px'
    },
    extend: {
    fontSize : {
      xl : '1.2rem',
    },
    colors: {
      musta: '#121212',
      tummaharmaa: '#2A2A2A',
      pinkki: '#3BD98F',
      sininen: '#4344A8',
      koralli: '#3DBFF2',
      keltainen: '#F2AB27',
      valkoinen: '#F2F2F2',
      vaaleansininen: '#A3A0F2',
      lime: '#AEBF2C',
      harmaa: '#8F8A72',
      vaaleanharmaa: '#A6A085',
      tummanharmaa: '#595859',
      vihreä: '#A89643'
    },
    margin: {
      0.5: '1px'
    },
    letterSpacing: {
      normal: '.025em',
      wide: '.3em',
      wider: '.5em',
      widest: '.6em'

    }
  }
  },
  plugins: [require("daisyui")],
}

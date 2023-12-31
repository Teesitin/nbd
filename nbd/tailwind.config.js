/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte-blocks/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  plugins: [require('flowbite/plugin'), require('flowbite-typography')],

  
  theme: {
		fontFamily: {
			telex: ['Telex', 'Arial', 'sans-serif'],
      roboto: ['Roboto', 'Arial', 'sans-serif'],
		},
    extend: {
      scale: {
        '101': '1.01',
      },
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        'scorpion': {
          '50': '#f6f6f6', //Text
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#575757',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#262626', //Background
        },
      }
    },
  },

  variants: {
    extend: {
      scale: ['hover'],
    }
  }, 
}


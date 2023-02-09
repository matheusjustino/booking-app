/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			primary: 'Poppins',
		},
		extend: {
			colors: {
				primary: '#f5385d',
			},
			height: {
				inherit: 'inherit',
			},
		},
	},
	plugins: [],
};

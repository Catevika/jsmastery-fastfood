/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
// Remove deprecated color aliases to silence Tailwind warnings
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			...colors,
			colors: {
				primary: '#FE8C00',
				white: {
					DEFAULT: '#ffffff',
					100: '#fafafa',
					200: '#FE8C00',
				},
				gray: {
					100: '#878787',
					200: '#878787',
				},
				dark: {
					100: '#181C2E',
				},
				error: '#F14141',
				success: '#2F9B65',
			},
			fontFamily: {
				quicksand: ['Quicksand-Regular', 'sans-serif'],
				'quicksand-bold': ['Quicksand-Bold', 'sans-serif'],
				'quicksand-semibold': ['Quicksand-SemiBold', 'sans-serif'],
				'quicksand-light': ['Quicksand-Light', 'sans-serif'],
				'quicksand-medium': ['Quicksand-Medium', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

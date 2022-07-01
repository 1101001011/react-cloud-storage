const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary-dark)',
				primary_light: 'var(--primary-light)',
			},
		},
	},
	plugins: [
		plugin(({ addComponents, addUtilities }) => {
			addComponents({
				'.btn-primary': {
					display: 'block',
					padding: '10px 10px',
					fontSize: '16px',
					fontWeight: '600',

					'&:hover': {
						opacity: '0.9',
					}
				},
				'.input': {
					padding: '8px 16px',
					border: '1px solid rgb(209 213 219)',
					borderRadius: '10px',

					'&:focus': {
						outline: 'none',
					},
				},
			})
			addUtilities({
				'.h-550': {
					height: '550px'
				},
				'.h-loader': {
					height: '3px'
				},
				'.text-l': {
					fontSize: '15px'
				},
				'.shadow-primary': {
					boxShadow: '0 6px 12px -1px rgb(0, 0, 0, 0.3)'
				},
				'.grid-item': {
					gridTemplateColumns: '40px 1fr'
				}
			})
		}),
	],
}

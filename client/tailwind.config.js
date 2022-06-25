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
		plugin(({ addComponents }) => {
			addComponents({
				'.btn-primary': {
					display: 'block',
					background:
						'linear-gradient(50deg, var(--primary-dark), var(--primary-light))',
					color: 'white',
					padding: '10px 50px',
					fontSize: '16px',
					fontWeight: '600',
					borderRadius: '10px',
					alignSelf: 'flex-start',

					'&:hover': {
						opacity: '0.9',
					}
				},
				'.input': {
					padding: '8px 16px',
					border: '1px solid rgb(209 213 219)',
					borderRadius: '10px',
					margin: '8px 0',

					'&:focus': {
						outline: 'none',
					},
				},
			})
		}),
	],
}

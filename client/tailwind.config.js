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
				'.h-max-min-540': {
					maxHeight: '540px',
					minHeight: '540px'
				},
				'.h-loader': {
					height: '3px'
				},
				'.w-search-input': {
					maxWidth: '700px'
				},
				'.text-l': {
					fontSize: '15px'
				},
				'.shadow-primary': {
					boxShadow: '0 6px 12px -1px rgb(0, 0, 0, 0.3)'
				},
				'.grid-primary': {
					gridTemplateColumns: '16rem 1fr 19rem'
				},
				'.grid-item': {
					gridTemplateColumns: '45px 1fr'
				}
			})
		}),
	],
}

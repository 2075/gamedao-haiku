import { Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		secondary: true
	}
}

export default function Button(theme: Theme) {
	return {
		MuiButton: {
			variants: [
				// {
				// 	props: { variant: 'outlined' },
				// 	style: {
				// 		color: 'primary' ? theme.palette.common.white : theme.palette.text.secondary,
				// 	},
				// },
				// {
				// 	props: { variant: 'secondary' },
				// 	style: {
				// 		color: theme.palette.common.white,
				// 	},
				// },
			],

			styleOverrides: {
				root: {
					borderRadius: Number(theme.shape.borderRadius) * 10,
					'&:hover': {
						boxShadow: 'none',
					},
				},

				sizeLarge: {
					height: 48,
				},

				containedInherit: {
					boxShadow: theme.customShadows.z8,
					'&:hover': {
						backgroundColor: theme.palette.grey[400],
					},
				},

				containedPrimary: {
					boxShadow: theme.customShadows.primary,
					color: theme.palette.grey[800],
				},
				containedSecondary: {
					boxShadow: theme.customShadows.secondary,
					color: theme.palette.grey[800],
				},
				containedInfo: {
					boxShadow: theme.customShadows.info,
					color: theme.palette.grey[800],
				},
				containedSuccess: {
					boxShadow: theme.customShadows.success,
					color: theme.palette.grey[800],
				},
				containedWarning: {
					boxShadow: theme.customShadows.warning,
					color: theme.palette.grey[800],
				},
				containedError: {
					boxShadow: theme.customShadows.error,
					color: theme.palette.grey[800],
				},

				// 	// outlined
				// 	outlinedInherit: {
				// 		border: `1px solid ${theme.palette.grey[500_32]}`,
				// 		'&:hover': {
				// 			backgroundColor: theme.palette.action.hover,
				// 		},
				// 	},
				// 	textInherit: {
				// 		'&:hover': {
				// 			backgroundColor: theme.palette.action.hover,
				// 		},
				// 	},
			},
		},
	}
}

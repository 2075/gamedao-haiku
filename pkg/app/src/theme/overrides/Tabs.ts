import { Theme } from '@mui/material/styles'

export default function Tabs(theme: Theme) {
	return {
		MuiTab: {
			styleOverrides: {
				root: {
					padding: 0,
					fontWeight: theme.typography.fontWeightMedium,
					// borderTopLeftRadius: theme.shape.borderRadius,
					// borderTopRightRadius: theme.shape.borderRadius,
					'&.Mui-selected': {
						color: theme.palette.primary.main,
					},
					'&:not(:last-of-type)': {
						marginRight: theme.spacing(5),
					},
					'@media (min-width: 600px)': {
						minWidth: 48,
					},
				},
				labelIcon: {
					minHeight: 48,
					flexDirection: 'row',
					'& > *:first-of-type': {
						marginBottom: 0,
						marginRight: theme.spacing(1),
					},
				},
				wrapper: {
					flexDirection: 'row',
					whiteSpace: 'nowrap',
				},
				textColorInherit: {
					opacity: 1,
					// color: theme.palette.text.secondary,
					color: theme.palette.text.primary,
				},
			},
		},
		MuiTabPanel: {
			styleOverrides: {
				root: {
					padding: 0,
					borderRadius: '50%',
				},
			},
			// variants: [
			// 	{
			// 		props: { variant: 'glass' },
			// 		style: {
			// 			backgroundColor: `#00000011`, //theme.palette.background.neutral,
			// 			backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.1), rgba(0,0,0,.3))`,
			// 			backdropFilter: `blur(10px)`,
			// 		},
			// 	},
			// ],
		},
		MuiTabScrollButton: {
			styleOverrides: {
				root: {
					width: 48,
					borderRadius: '50%',
				},
			},
		},
		MuiTabIndicator: {
			styleOverrides: {
				root: {
					color: theme.palette.text.primary,
					borderWidth: '10px',
				},
			},
		},
	}
}

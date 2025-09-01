import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: 'data-toolpad-color-scheme',
	},
	colorSchemes: {
		light: {
			palette: {
				background: {
					default: '#F0F0F0',
				},
			},
		},
		dark: {
			palette: {
				background: {
					default: '#2A4364',
					paper: '#112E4D',
				},
			},
		},
	}
});

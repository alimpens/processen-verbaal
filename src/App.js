import React from 'react';
import {
	GlobalStyle,
	ThemeProvider
} from '@amsterdam/asc-ui';

function App() {
	return (
		<ThemeProvider>
			<GlobalStyle />
			CONTENT
		</ThemeProvider>
	);
}

export default App;
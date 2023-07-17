import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
	fonts: {
	    heading: `'Open Sans', sans-serif`,
	    body: `'Raleway', sans-serif`,	
	}
});

root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { theme } from "../chakra/theme";
import { DataProvider } from "../context/useData";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<DataProvider>
				<Component {...pageProps} />
			</DataProvider>
		</ChakraProvider>
	);
}

export default MyApp;

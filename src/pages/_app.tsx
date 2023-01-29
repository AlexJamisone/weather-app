import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { theme } from "../chakra/theme";
import { DataForcastProvider } from "../context/useDataForecast";
import { DataDailyProvider } from "../context/useDataDaily";
import { LoadingProvider } from "../context/useLoader";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<DataForcastProvider>
				<DataDailyProvider>
					<LoadingProvider>
						<Component {...pageProps} />
					</LoadingProvider>
				</DataDailyProvider>
			</DataForcastProvider>
		</ChakraProvider>
	);
}

export default MyApp;

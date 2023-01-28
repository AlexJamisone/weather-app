import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { theme } from "../chakra/theme";
import { DataForcastProvider } from "../context/useDataForecast";
import { DataDailyProvider } from "../context/useDataDaily";
import { SettingsProvider } from "../context/useSettingsContext";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<DataForcastProvider>
				<DataDailyProvider>
					<SettingsProvider>
						<Component {...pageProps} />
					</SettingsProvider>
				</DataDailyProvider>
			</DataForcastProvider>
		</ChakraProvider>
	);
}

export default MyApp;

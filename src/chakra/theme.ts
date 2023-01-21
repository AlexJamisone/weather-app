import { extendTheme, type ThemeConfig} from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
    disableTransitionOnChange: false
};

const colors = {
	mainBg: 'red'
}


export const theme = extendTheme({ config, colors });

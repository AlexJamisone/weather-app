import Header from "./Header";
import { Center, useColorMode } from "@chakra-ui/react";
import Search from "./Search";
import Forecast from "./Forecast";
import City from "./City";
const Main = () => {
	const { colorMode } = useColorMode();
	return (
		<Center flexDirection="column" gap={10}>
			<Header />
			<Center
				as="main"
				justifyContent="start"
				flexDirection="column"
				overflow="hidden"
				gap={10}
				border={[
					"none",
					`${
						colorMode === "light"
							? "2px solid #1212"
							: "2px solid #fff7f2"
					}`,
				]}
				w={["80vw", 650]}
				h={450}
				rounded={50}
			>
				<Search />
				<Forecast />
			</Center>
		</Center>
	);
};

export default Main;

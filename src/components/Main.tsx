import { Center, useColorMode } from "@chakra-ui/react";
import Forecast from "./Forecast";
import Header from "./Header";
import Search from "./Search";
const Main = () => {
	const { colorMode } = useColorMode();
	return (
		<Center
			flexDirection="column"
			gap={[0, 10]}
			overflowY={["scroll", "hidden"]}
		>
			<Header />
			<Center
				as="main"
				justifyContent="start"
				flexDirection="column"
				overflow="hidden"
				gap={[5, 10]}
				border={[
					"none",
					`${
						colorMode === "light"
							? "2px solid #1212"
							: "2px solid #fff7f2"
					}`,
				]}
				w={["95vw", 650]}
				h={['100vh',550]}
				rounded={50}
			>
				<Search />
				<Forecast />
			</Center>
		</Center>
	);
};

export default Main;

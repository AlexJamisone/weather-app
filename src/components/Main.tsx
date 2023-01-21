import Header from "./Header";
import { Center, Box } from "@chakra-ui/react";
import Search from "./Search";
type Props = {};

const Main = (props: Props) => {
	return (
		<Center flexDirection="column" gap={10}>
			<Header />
			<Box
				as="main"
				display="flex"
				justifyContent="center"
				border={["none", "2px solid #1212"]}
				w={["90vw", 650]}
				h={450}
				rounded={50}
			>
				<Search />
			</Box>
		</Center>
	);
};

export default Main;

import Header from "./Header";
import { Center, Box } from "@chakra-ui/react";
import Search from "./Search";
import CardWeather from "./CardWeather";
import Forcast from "./Forcast";
type Props = {};

const Main = (props: Props) => {
	return (
		<Center flexDirection="column" gap={10}>
			<Header />
			<Center
				as="main"
				justifyContent='start'
				flexDirection='column'
				gap={10}
				border={["none", "2px solid #1212"]}
				w={["90vw", 650]}
				h={450}
				rounded={50}
			>
				<Search />
				<Forcast/>
			</Center>
		</Center>
	);
};

export default Main;

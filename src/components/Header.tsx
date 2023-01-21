import { Center, Text } from "@chakra-ui/react";

interface HeaderProps {}

const Header = () => {
	return (
		<Center as="header" h={[70, 90]} backgroundColor="">
			<Text as="h1" fontSize={[36, 54, 64]} fontWeight={100}>
				One Weather
			</Text>
		</Center>
	);
};

export default Header;

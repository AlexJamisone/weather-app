import { Center, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
const Header = () => {
	return (
		<Center as="header" h={[70, 90]} backgroundColor="">
			<Text
				as={motion.h1}
				fontSize={[36, 54, 64]}
				fontWeight={100}
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1}}
				transitionDuration={'1000ms'}
				
			>
				One Weather
			</Text>
		</Center>
	);
};

export default Header;

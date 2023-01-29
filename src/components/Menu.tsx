import {
	Box,
	ButtonGroup,
	Center,
	IconButton,
	Text,
	useColorMode,
	useDisclosure,
	Stack,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsGeoAlt } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { RiLightbulbLine, RiMoonLine, RiStarFill } from "react-icons/ri";
import { useLoaderContext } from "../context/useLoader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import City from "./City";
import SaveCity from "./SaveCity";

interface MenuProps {
	search: string;
	handlGeolocation: () => void;
	handlSearch: (city: string) => Promise<void>;
}

const Menu = ({ handlGeolocation, handlSearch, search }: MenuProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { loading } = useLoaderContext();
	const { loadingData, loadingGeolocation } = loading;

	const [isLenght, setIsLenght] = useState<boolean>(false);
	const { isOpen, onToggle, onClose } = useDisclosure();
	const [citys, setCity] = useLocalStorage<string[]>("citys", []);

	useEffect(() => {
		setIsLenght(citys.length > 0);
	}, [citys]);

	return (
		<Center mt={[3, 1]} flexDirection={["column", "row"]} flexWrap="wrap">
			<VStack direction={["column", "row"]} w={["100%"]}>
				<Stack gap={3} direction={["column", "row"]} w={"100%"}>
					<IconButton
						aria-label="Enter"
						icon={<IoEnterOutline />}
						onClick={() => handlSearch(search)}
						isLoading={loadingData}
						w={["100%", "0"]}
					/>
					<IconButton
						aria-label="Geolocation"
						icon={<BsGeoAlt />}
						onClick={handlGeolocation}
						isLoading={loadingGeolocation}
						w={["100%", "0"]}
					/>
					<IconButton
						aria-label="Theme"
						icon={
							colorMode === "light" ? (
								<RiMoonLine />
							) : (
								<RiLightbulbLine />
							)
						}
						w={["100%", "0"]}
						onClick={toggleColorMode}
					/>
					<ButtonGroup position="relative" w={["100%", "40px"]}>
						<IconButton
							aria-label="Saves"
							icon={<RiStarFill />}
							onClick={onToggle}
							w={["100%", "0"]}
						/>
						<Box
							position="absolute"
							bottom={"-20%"}
							right={["0", "-20%"]}
							w={23}
							h={23}
							borderRadius={50}
							backgroundColor="red.400"
							fontWeight={500}
							display={"flex"}
							justifyContent="center"
							alignItems="center"
							transition={"opacity .2s linear"}
							opacity={`${isLenght ? 1 : 0}`}
							zIndex={10}
							cursor="default"
						>
							<Text suppressHydrationWarning>{citys.length}</Text>
						</Box>
					</ButtonGroup>
					<SaveCity
						handlSearch={handlSearch}
						citys={citys}
						setCity={setCity}
						isOpen={isOpen}
						onClose={onClose}
					/>
				</Stack>
				<City citys={citys} setCity={setCity} />
			</VStack>
		</Center>
	);
};

export default Menu;

import { IconButton, useColorMode } from "@chakra-ui/react";
import { BsGeoAlt } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { RiLightbulbLine, RiMoonLine } from "react-icons/ri";
import SaveCity from "./SaveCity";

interface MenuProps {
	search: string;
	loading: boolean;
	handlGeolocation: () => void;
	handlSearch: (city: string) => Promise<void>;
}

const Menu = ({
	handlGeolocation,
	handlSearch,
	loading,
	search,
}: MenuProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<IconButton
				aria-label="Enter"
				icon={<IoEnterOutline />}
				onClick={() => handlSearch(search)}
				isLoading={loading}
			/>
			<IconButton
				aria-label="Geolocation"
				icon={<BsGeoAlt />}
				onClick={handlGeolocation}
			/>
			<IconButton
				aria-label="Theme"
				icon={
					colorMode === "light" ? <RiMoonLine /> : <RiLightbulbLine />
				}
				onClick={toggleColorMode}
			/>
			<SaveCity handlSearch={handlSearch}/>
		</>
	);
};

export default Menu;

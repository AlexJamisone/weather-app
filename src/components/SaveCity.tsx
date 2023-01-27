import {
	Box,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Tag,
	TagCloseButton,
	TagLabel,
	useDisclosure,
	IconButton,
} from "@chakra-ui/react";
import { RiStarFill } from "react-icons/ri";
import City from "./City";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SaveCityProps {
	handlSearch: (city: string) => Promise<void>;
}

const SaveCity = ({ handlSearch }: SaveCityProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [citys, setCity] = useLocalStorage<string[]>("citys", []);

	const deletCity = (exisctingCity: string) => {
		localStorage.removeItem(exisctingCity);
		setCity(citys?.filter((str) => str !== exisctingCity));
	};
	return (
		<>
			<IconButton
				aria-label="Saves"
				icon={<RiStarFill />}
				onClick={onToggle}
				position="relative"
				_before={{
					content: `"${citys.length !== 0 ? citys.length : "0"}"`,
					position: `absolute`,
					bottom: "-20%",
					right: "-20%",
					width: "20px",
					height: "20px",
					backgroundColor: "red.400",
					opacity: `${citys.length !== 0 ? 1 : 0}`,
					transition: "all .1s linear",
					borderRadius: "50px",
				}}
			/>
			<Drawer isOpen={isOpen} onClose={onClose} placement="right">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Сохраненые города</DrawerHeader>
					<DrawerBody>
						{citys?.map((item: string, index: number) => (
							<Tag
								borderRadius="full"
								key={index}
								size={["ld"]}
								p={2}
								mx={2}
								alignContent="center"
							>
								<TagLabel
									onClick={() => {
										onClose();
										handlSearch(item);
									}}
								>
									{item}
								</TagLabel>
								<TagCloseButton
									onClick={() => deletCity(item)}
								/>
							</Tag>
						))}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<City citys={citys} setCity={setCity} />
		</>
	);
};

export default SaveCity;

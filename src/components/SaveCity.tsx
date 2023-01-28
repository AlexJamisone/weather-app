import {
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
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { RiStarFill } from "react-icons/ri";
import City from "./City";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BsSearch } from "react-icons/bs";

interface SaveCityProps {
	handlSearch: (city: string) => Promise<void>;
}

const SaveCity = ({ handlSearch }: SaveCityProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [citys, setCity] = useLocalStorage<string[]>("citys", []);
	const [searchCity, setSearchCity] = useState<string>("");

	const deletCity = (exisctingCity: string) => {
		localStorage.removeItem(exisctingCity);
		setCity(citys?.filter((str) => str !== exisctingCity));
	};

	const filtredCity = citys.filter((city) =>
		city.toLowerCase().includes(searchCity.toLowerCase())
	);
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
						<InputGroup mb={5}>
							<InputLeftElement>
								<BsSearch />
							</InputLeftElement>
							<Input
								placeholder="Поиск по избранным"
								onChange={(e) => setSearchCity(e.target.value)}
							/>
						</InputGroup>
						{filtredCity?.map((item: string, index: number) => (
							<Tag
								borderRadius="full"
								key={index}
								size={["ld"]}
								p={2}
								m={2}
								alignContent="center"
								cursor='pointer'
							>
								<TagLabel
									onClick={() => {
										setSearchCity('')
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

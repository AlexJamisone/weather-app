import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Tag,
	TagCloseButton,
	TagLabel,
	useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { RiStarFill } from "react-icons/ri";
import { useLocalStorage } from "../hooks/useLocalStorage";
import City from "./City";

interface SaveCityProps {
	handlSearch: (city: string) => Promise<void>;
}

const SavedCity = ({ handlSearch }: SaveCityProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [citys, setCity] = useLocalStorage<string[]>("citys", []);
	const [searchCity, setSearchCity] = useState<string>("");

	const [city, setcitys] = useState<string[] | undefined>([]);

	useEffect(() => {
		if (typeof window !== undefined) {
			const valu = localStorage.getItem("citys");
			if (valu) {
				return setcitys(JSON.parse(valu));
			}
		}
	}, []);

	const deletCity = (exisctingCity: string) => {
		localStorage.removeItem(exisctingCity);
		setcitys(city?.filter((str) => str !== exisctingCity));
	};

	const filtredCity = city?.filter((city) =>
		city.toLowerCase().includes(searchCity.toLowerCase())
	);

	console.log("from btn", city);
	return (
		<Box display="grid" gridTemplateColumns={"repeat(2, 1fr)"}>
			<IconButton
				aria-label="Saves"
				icon={<RiStarFill />}
				onClick={onToggle}
				position="relative"
				_before={{
					content: `"${city?.length !== 0 ? city?.length : "0"}"`,
					position: `absolute`,
					bottom: "-20%",
					right: "-20%",
					width: "20px",
					height: "20px",
					backgroundColor: "red.400",
					opacity: `${city?.length !== 0 ? 1 : 0}`,
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
								cursor="pointer"
							>
								<TagLabel
									onClick={() => {
										setSearchCity("");
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
		</Box>
	);
};

export default SavedCity;

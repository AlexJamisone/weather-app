import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	InputGroup,
	InputLeftElement,
	Tag,
	TagCloseButton,
	TagLabel
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SaveCityProps {
	handlSearch: (city: string) => Promise<void>;
	citys: string[];
	setCity: Dispatch<SetStateAction<string[]>>;
	isOpen: boolean;
	onClose: () => void;
}
const SaveCity = ({
	handlSearch,
	citys,
	setCity,
	isOpen,
	onClose,
}: SaveCityProps) => {

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
		</>
	);
};

export default SaveCity;

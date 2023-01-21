import {
	InputLeftElement,
	Input,
	InputGroup,
	IconButton,
    useToast,
} from "@chakra-ui/react";
import { BsSearch, BsGeoAlt } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { useState } from "react";

interface Coords {
	lat: number;
	lon: number;
}

const Search = () => {
    const toast = useToast()
	const [search, setSearch] = useState<string>("");
	const [coords, setCoords] = useState<Coords>();
	const handlGeolocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
                toast({
                    title: 'You have given access to geolocation ✔',
                    isClosable: true,
                    duration: 3000,
                    status: 'success'
                })
				setCoords({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			},
			(msg) => {
                console.log(msg);
                toast({
                    title: 'You have denied access to geolocation!',
                    status: 'error',
                    isClosable: true,
                    duration: 3000
                })
            }
		);
	};
    console.log(coords)
	return (
		<InputGroup mt={5} w={400} gap={3}>
			<InputLeftElement>
				<BsSearch />
			</InputLeftElement>
			<Input
				placeholder="Найди свой город"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<IconButton aria-label="Enter" icon={<IoEnterOutline />} />
			<IconButton
				aria-label="Geolocation"
				icon={<BsGeoAlt />}
				onClick={handlGeolocation}
			/>
		</InputGroup>
	);
};

export default Search;

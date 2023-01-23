import {
	InputLeftElement,
	Input,
	InputGroup,
	IconButton,
	useToast,
} from "@chakra-ui/react";
import { BsSearch, BsGeoAlt } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getWeatherData } from "../utils/getWeatherData";

interface Coords {
	lat: number;
	lon: number;
}

const Search = () => {
	const toast = useToast();
	const [search, setSearch] = useState<string>("");
	const [coords, setCoords] = useState<Coords>();
	const [loading, setLoading] = useState(false);
	const [dataGeolocation, setDataGeolocation] = useState([]);
	const [dataSearch, setDataSearch] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				if (coords === undefined) {
					return;
				} else {
					const response = await getWeatherData(
						"geolocation",
						null,
						coords.lat,
						coords.lon
					);
					setDataGeolocation(response);
				}
			} catch (error) {
				console.log("inside useEffect", error);
			}
		};
		getData();
	}, [coords]);

	const handlGeolocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				toast({
					title: "You have given access to geolocation ✔",
					isClosable: true,
					duration: 3000,
					status: "success",
				});
				setCoords({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			},
			(error) => {
				console.log(error);
				toast({
					title: "You have denied access to geolocation!",
					status: "error",
					isClosable: true,
					duration: 3000,
				});
			}
		);
	};

	const handlSearch = async (city: string) => {
		try {
			setLoading(true)
			const response = await getWeatherData("search", city)
			setDataSearch(response)
			setSearch('')
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	};

	console.log(dataSearch);
	return (
		<InputGroup mt={5} w={400} gap={3}>
			<InputLeftElement>
				<BsSearch />
			</InputLeftElement>
			<Input
				placeholder="Найди свой город"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
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
		</InputGroup>
	);
};

export default Search;

import {
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDataContext } from "../context/useData";
import { getWeatherData } from "../utils/getWeatherData";
import Menu from "./Menu";

interface Coords {
	lat: number;
	lon: number;
}

const Search = () => {
	const toast = useToast();
	const { setData } = useDataContext();

	const [search, setSearch] = useState<string>("");
	const [coords, setCoords] = useState<Coords>();
	const [loading, setLoading] = useState<boolean>(false);

	const [error, setError] = useState<boolean>(false);

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
					setData(response);
				}
			} catch (error) {
				console.log("inside useEffect", error);
			}
		};
		getData();
	}, [coords]);

	const handlGeolocation = () => {
		setError(false);
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
			if (city.length <= 0) {
				setError(true);
			} else {
				setLoading(true);
				const town = city.trim().toLowerCase();
				const response = await getWeatherData("search", town);
				setData(response);
				setSearch("");
				setLoading(false);
			}
		} catch (error) {
			console.log("handlSearch", error);
		}
	};
	return (
		<>
			<FormControl
				isInvalid={error}
				width="none"
			>
				<InputGroup
					mt={5}
					w={["100%", 300]}
					gap={3}
					flexDirection={["column", "row"]}
					flexWrap='wrap'
				>
					<InputLeftElement>
						<BsSearch />
					</InputLeftElement>
					<Input
						placeholder="Найди свой город"
						onChange={(e) => {
							setError(false);
							setSearch(e.target.value);
						}}
						value={search}
						onKeyUp={(e) => {
							e.key === "Enter" ? handlSearch(search) : null;
						}}
					/>
					{error ? (
						<FormErrorMessage
							position={["relative", "absolute"]}
							bottom={"-50%"}
							fontWeight={600}
							mt={"0"}
						>
							Пожалуйста введи свой город
						</FormErrorMessage>
					) : null}
					<Menu
						handlGeolocation={handlGeolocation}
						handlSearch={handlSearch}
						loading={loading}
						search={search}
					/>
				</InputGroup>
			</FormControl>
		</>
	);
};

export default Search;

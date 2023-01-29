import {
	Center,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDataDailyContext } from "../context/useDataDaily";
import { useDataForcastContext } from "../context/useDataForecast";
import { useLoaderContext } from "../context/useLoader";
import { getForecastData } from "../utils/getForecastData";
import Menu from "./Menu";

interface Coords {
	lat: number;
	lon: number;
}

const Search = () => {
	const toast = useToast();
	const { setDataForcast } = useDataForcastContext();
	const { setDataDaily } = useDataDailyContext();
	const { setLoading } = useLoaderContext();

	const [search, setSearch] = useState<string>("");
	const [coords, setCoords] = useState<Coords>();

	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const getData = async () => {
			try {
				if (coords === undefined) {
					return;
				} else {
					setLoading({ loadingGeolocation: true });
					const forecast = await getForecastData(
						"forecast",
						"geolocation",
						null,
						coords.lat,
						coords.lon
					);
					setDataForcast(forecast);
					const weather = await getForecastData(
						"weather",
						"geolocation",
						null,
						coords.lat,
						coords.lon
					);
					setDataDaily(weather);
					setLoading({ loadingGeolocation: false });
				}
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [coords]);

	const handlGeolocation = () => {
		setLoading({ loadingGeolocation: true });
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
				setLoading({ loadingGeolocation: false });
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
				setLoading({ loadingData: true });
				const town = city.trim().toLowerCase();
				const forecast = await getForecastData(
					"forecast",
					"search",
					town
				);
				setDataForcast(forecast);
				const weather = await getForecastData(
					"weather",
					"search",
					town
				);
				setDataDaily(weather);
				setSearch("");
				setLoading({ loadingData: false });
			}
		} catch (error) {
			console.log("handlSearch", error);
		}
	};
	return (
		<Center flexDirection='column'>
			<FormControl isInvalid={error}>
				<InputGroup
					mt={5}
					w={["100%", 300]}
					gap={3}
					flexDirection={["column", "row"]}
					flexWrap="wrap"
				>
					<InputLeftElement>
						<BsSearch />
					</InputLeftElement>
					<Input
						mb={3}
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
							top={"80%"}
							fontWeight={600}
							mt={"0"}
						>
							Пожалуйста введи свой город
						</FormErrorMessage>
					) : null}
				</InputGroup>
			</FormControl>
			<Menu
				handlGeolocation={handlGeolocation}
				handlSearch={handlSearch}
				search={search}
			/>
		</Center>
	);
};

export default Search;

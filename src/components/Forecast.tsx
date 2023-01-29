import { Box, Center, IconButton, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDataDailyContext } from "../context/useDataDaily";
import { useDataForcastContext } from "../context/useDataForecast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getForecastByDay } from "../utils/getForecastByDay";
import { getForecastData } from "../utils/getForecastData";
import CardWeather from "./CardWeather";
import DailyWeather from "./DailyForecast";
import WeatherNow from "./WeatherNow";

const Forecast = () => {
	const { dataForcast, setDataForcast } = useDataForcastContext();
	const { setDataDaily } = useDataDailyContext();

	const container = useRef<HTMLDivElement>(null);
	const [citys] = useLocalStorage("citys", []);
	const [loading, setLoading] = useState(false);
	const [selctedDay, setSelctedDay] = useState<string>();

	useEffect(() => {
		if (citys.length !== 0) {
			const getData = async () => {
				try {
					setLoading(true);
					const forecast = await getForecastData(
						"forecast",
						"search",
						citys.at(-1)
					);
					setDataForcast(forecast);
					const weather = await getForecastData(
						"weather",
						"search",
						citys.at(-1)
					);
					setDataDaily(weather);
					setLoading(false);
				} catch (error) {
					console.log(error);
				}
			};
			getData();
		} else {
			return;
		}
	}, []);

	const forecast = dataForcast.list?.filter(
		(_, index) => index === 0 || index % 8 === 0
	);

	const forecastByDay = getForecastByDay(dataForcast?.list, selctedDay);

	const handlWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (!container.current) {
			return;
		}
		let scrollLeft = container.current.scrollLeft;
		if (e.deltaY < 0) {
			scrollLeft -= 200;
		} else {
			scrollLeft += 200;
		}
		container.current.scrollTo({
			left: scrollLeft,
			behavior: "smooth",
		});
	};

	const handlDay = (day: string) => {
		setSelctedDay(day);
	};

	return (
		<>
			{Object.keys(dataForcast).length === 0 && !loading ? (
				<Text>Введите свой город или предоставте геоданные</Text>
			) : loading ? (
				<Spinner />
			) : (
				<Center
					w={["100%", "100%"]}
					px={[0, 5]}
					flexDirection="column"
					gap={[5, 3]}
				>
					<Box
						ref={container}
						display="flex"
						w={["100%"]}
						h={"100%"}
						overflowX="scroll"
						gap={5}
						onWheel={handlWheel}
						sx={{
							"::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						{selctedDay === undefined ? (
							forecast?.map((day, index) => (
								<Box
									onClick={() => handlDay(day.dt.toString())}
									key={index}
									w={["100vw", ""]}
								>
									<CardWeather data={day} />
								</Box>
							))
						) : (
							<>
								<IconButton
									aria-label="Back"
									icon={<IoArrowBackSharp />}
									onClick={() => setSelctedDay(undefined)}
								/>
								<DailyWeather data={forecastByDay} />
							</>
						)}
					</Box>
					<WeatherNow />
				</Center>
			)}
		</>
	);
};

export default Forecast;

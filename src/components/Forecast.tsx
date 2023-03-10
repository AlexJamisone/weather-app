import { Box, Center, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDataDailyContext } from "../context/useDataDaily";
import { useDataForcastContext } from "../context/useDataForecast";
import { useLoaderContext } from "../context/useLoader";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getForecastByDay } from "../utils/getForecastByDay";
import { getForecastData } from "../utils/getForecastData";
import CardWeather from "./CardWeather";
import DailyWeather from "./DailyForecast";
import WeatherNow from "./WeatherNow";

const Forecast = () => {
	const { dataForcast, setDataForcast } = useDataForcastContext();
	const { setDataDaily } = useDataDailyContext();
	const { loading } = useLoaderContext();
	const { loadingData, loadingGeolocation } = loading;

	const container = useRef<HTMLDivElement>(null);
	const [citys] = useLocalStorage("citys", []);
	const [selctedDay, setSelctedDay] = useState<string>();

	useEffect(() => {
		if (citys.length !== 0) {
			const getData = async () => {
				try {
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
				} catch (error) {
					console.log(error);
				}
			};
			getData();
		} else {
			return;
		}
	}, []);

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

	const forecastCard = dataForcast.list?.filter(
		(_, index) => index === 0 || index % 8 === 0
	);

	const forecastByDay = getForecastByDay(dataForcast?.list, selctedDay);

	return (
		<>
			{Object.keys(dataForcast).length === 0 && !loadingData ? (
				<Text>?????????????? ???????? ?????????? ?????? ?????????????????????? ??????????????????</Text>
			) : loadingData || loadingGeolocation ? (
				<Spinner />
			) : dataForcast.cod === "404" ? (
				<Text>???????????? ???????? ?????????? ???? ????????????</Text>
			) : (
				<Center
					w={["100%", "100%"]}
					px={[0, 5]}
					flexDirection="column"
					gap={[1, 3]}
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
							forecastCard?.map((day, index) => (
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

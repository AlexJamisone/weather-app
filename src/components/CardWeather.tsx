import { Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/ru";
import { ListForecast } from "../types/types";
import WeatherIcons from "./WeatherIcons";

interface CardWeatherProps {
	data: ListForecast
}

const CardWeather = ({data}: CardWeatherProps) => {
	const {main, dt, weather} = data
	return (
		<Grid
			as={motion.div}
			minW={[150]}
			h={[150]}
			border={["1px solid #dfe2df"]}
			rounded={"50px"}
			templateColumns="repeat(2, 1fr)"
			p={5}
			cursor="pointer"
		>
			<GridItem>{moment.unix(dt).format("dd D")}</GridItem>
			<GridItem colStart={2}>
				<WeatherIcons main={weather[0].main} size={30} />
			</GridItem>
			<GridItem colStart={2}>{Math.round(main.temp)}℃</GridItem>
			<GridItem fontSize={15}>{weather[0].description}</GridItem>
		</Grid>
	);
};

export default CardWeather;

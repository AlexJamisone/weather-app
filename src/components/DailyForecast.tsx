import { Box, useMediaQuery, Text } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/ru";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ListForecast } from "../types/types";

interface DailyWeatherProps {
	data: ListForecast[][];
}

const DailyForecast = ({ data }: DailyWeatherProps) => {
	const isMobile = useMediaQuery("(max-width: 478px)");

	const XYAxis = data.map((arr) =>
		arr.map((day) => {
			return {
				x: moment.unix(day.dt).format("D dd LT"),
				"Температура ℃": Math.round(day.main.temp),
			};
		})
	);
	const chartData = [...XYAxis[0]];
	return (
		<Box overflow="hidden">
				<LineChart
					data={chartData}
					width={isMobile[0] ? 300 : 500}
					height={isMobile[0] ? 125 : 150}
					margin={{
						bottom: 0,
						left: 0,
						right: isMobile ? 0 : 35,
						top: 0,
					}}
				>
					<XAxis dataKey="x"/>
					<YAxis dataKey="Температура ℃" width={25}/>
					<Line type="natural" dataKey="Температура ℃" />
					<Tooltip
						contentStyle={{
							fontSize: "12px",
							height: "50px",
							backgroundColor: "inherit",
							fontWeight: 900,
						}}
					/>
				</LineChart>
		</Box>
	);
};

export default DailyForecast;

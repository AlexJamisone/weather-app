import { Center } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/ru";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ListForecast } from "../types/types";

interface DailyWeatherProps {
	data: ListForecast[][];
}

// rename this

const DailyForecast = ({ data }: DailyWeatherProps) => {
	const toArrSingl = data.map((arr) =>
		arr.map((day) => {
			return {
				x: moment.unix(day.dt).format("D dd LT"),
				"Температура ℃": Math.round(day.main.temp),
			};
		})
	);
	const fromArr = [...toArrSingl[0]];
	return (
		<Center>
			<LineChart
				data={fromArr}
				width={500}
				height={150}
				margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
			>
				<XAxis dataKey="x" width={500} />
				<YAxis dataKey="Температура ℃" width={100} />
				<Line type="monotone" dataKey="Температура ℃" />
				<Tooltip />
			</LineChart>
		</Center>
	);
};

export default DailyForecast;

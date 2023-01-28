import { ListForecast } from "../types/types";
import { LineChart, XAxis, YAxis, Line, Tooltip } from "recharts";
import moment from "moment";
import "moment/locale/ru";
import { Center, IconButton } from "@chakra-ui/react";
import { GoSettings } from "react-icons/go";

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
		<Center justifyContent="start" alignItems="flex-start">
            <IconButton aria-label="Settings" icon={<GoSettings/>}/>
			<LineChart
				data={fromArr}
				width={500}
				height={125}
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

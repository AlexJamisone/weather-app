import { chunk, groupBy } from "lodash";
import { ListForecast } from "../types/types";
export const getForecastByDay = (
	dateList: ListForecast[],
	selctedDay: string | undefined
): ListForecast[][] => {
	const split = chunk(dateList, 8);
	const group = groupBy(split, (split) => split[0].dt);
	const filterObject = Object.fromEntries(
		Object.entries(group).filter((day) =>
			day.includes(selctedDay as string)
		)
	);
	return Object.values(filterObject).map((item) =>
		item[0].map((item2) => item2)
	);
};

import {
	RiDrizzleLine, RiFoggyLine, RiRainyLine,
	RiSnowyLine, RiSunCloudyLine, RiSunLine, RiThunderstormsLine
} from "react-icons/ri";

import { Icon } from "@chakra-ui/react";

interface WeatherLike {
	main: string;
	size?: number;
}

const WeatherIcons = ({ main, size }: WeatherLike) => {
	if (!main) {
		return null;
	}
	const weatherLike = () => {
		switch (main) {
			case "Thunderstorm":
				return <Icon as={RiThunderstormsLine} fontSize={[`${size}`]} />;
			case "Drizzle":
				return <Icon as={RiDrizzleLine} fontSize={[`${size}`]} />;
			case "Rain":
				return <Icon as={RiRainyLine} fontSize={[`${size}`]} />;
			case "Snow":
				return <Icon as={RiSnowyLine} fontSize={[`${size}`]} />;
			case "Mist" ||
				"Smoke" ||
				"Haze" ||
				"Dust" ||
				"Fog" ||
				"Sand" ||
				"Dust" ||
				"Ash" ||
				"Squall" ||
				"Tornado":
				return <Icon as={RiFoggyLine} fontSize={[`${size}`]} />;
			case "Clear":
				return <Icon as={RiSunLine} fontSize={[`${size}`]} />;
			case "Clouds":
				return <Icon as={RiSunCloudyLine} fontSize={[`${size}`]} />;
			default:
				break;
		}
	};
	return <>{weatherLike()}</>;
};

export default WeatherIcons;

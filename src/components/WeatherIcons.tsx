import {
	RiThunderstormsLine,
	RiDrizzleLine,
	RiRainyLine,
	RiSnowyLine,
	RiFoggyLine,
	RiSunLine,
	RiSunCloudyLine,
} from "react-icons/ri";

interface WeatherLike {
	main: string;
	size?: number;
}

const WeatherIcons = ({ main, size }: WeatherLike) => {
	const weatherLike = () => {
		switch (main) {
			case "Thunderstorm":
				return <RiThunderstormsLine size={size} />;
			case "Drizzle":
				return <RiDrizzleLine size={size} />;
			case "Rain":
				return <RiRainyLine size={size} />;
			case "Snow":
				return <RiSnowyLine size={size} />;
			case "Atmosphere":
				return <RiFoggyLine size={size} />;
			case "Clear":
				return <RiSunLine size={size} />;
			case "Clouds":
				return <RiSunCloudyLine size={size} />;
			default:
				break;
		}
	};
	return <>{weatherLike()}</>;
};

export default WeatherIcons;

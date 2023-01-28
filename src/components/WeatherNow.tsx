import { useDataDailyContext } from "../context/useDataDaily";
import { Text } from "@chakra-ui/react";

const WeatherNow = () => {
	const { dataDaily } = useDataDailyContext();
	return (
        <Text>{dataDaily?.main?.temp}</Text>
    );
};

export default WeatherNow;

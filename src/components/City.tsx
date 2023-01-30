import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { RiStarFill } from "react-icons/ri";
import { useDataForcastContext } from "../context/useDataForecast";

interface CityProps {
	citys: string[];
	setCity: Dispatch<SetStateAction<string[]>>;
}

const City = ({ citys, setCity }: CityProps) => {
	const { dataForcast } = useDataForcastContext();
	const saveCity = (newCity: string) => {
		if (citys?.includes(newCity)) {
			setCity(citys?.filter((str) => str !== newCity));
		} else {
			setCity([...citys, newCity]);
		}
	};
	return (
		<>
			{Object.keys(dataForcast).length !== 0 && dataForcast.cod !== '404' ? (
				<HStack>
					<Text
						display="flex"
						alignContent="center"
						as="h2"
						fontSize={32}
						fontWeight={300}
						cursor="default"
					>
						{dataForcast?.city?.name}
					</Text>
					<Icon
						as={RiStarFill}
						boxSize={"30px"}
						cursor="pointer"
						transition={'fill .1s linear'}
						fill={`${
							citys?.includes(dataForcast?.city?.name)
								? "yellow.400"
								: ""
						}`}
						onClick={() => saveCity(dataForcast?.city?.name)}
					/>
				</HStack>
			) : null}
		</>
	);
};

export default City;

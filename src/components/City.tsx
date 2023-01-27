import { HStack, Icon, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { RiStarFill } from "react-icons/ri";
import { useDataContext } from "../context/useData";

interface CityProps {
	citys: string[];
    setCity: Dispatch<SetStateAction<string[]>>
}

const City = ({citys, setCity}: CityProps) => {
	const { data } = useDataContext();
	const saveCity = (newCity: string) => {
		if (citys?.includes(newCity)) {
			setCity(citys?.filter((str) => str !== newCity));
		} else {
			setCity([...citys, newCity]);
		}
	};
	return (
		<>
			{Object.keys(data).length !== 0 ? (
				<HStack>
					<Text
						display="flex"
						alignContent="center"
						as="h2"
						fontSize={32}
						fontWeight={300}
					>
						{data?.city?.name}
					</Text>
					<Icon
						as={RiStarFill}
						boxSize={"30px"}
						fill={`${
							citys?.includes(data?.city?.name)
								? "yellow.400"
								: ""
						}`}
						onClick={() => saveCity(data?.city?.name)}
					/>
				</HStack>
			) : null}
		</>
	);
};

export default City;

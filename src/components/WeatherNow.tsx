import {
	Box,
	Center,
	HStack,
	Icon,
	IconButton,
	Text,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { useDataDailyContext } from "../context/useDataDaily";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Settings from "./Settings";
import WeatherIcons from "./WeatherIcons";

export interface FilterState {
	wind: boolean;
	sunset: boolean;
	humidity: boolean;
}

const WeatherNow = () => {
	const { dataDaily } = useDataDailyContext();
	const { main, weather, wind, sys } = dataDaily;
	const { isOpen, onClose, onToggle } = useDisclosure();

	const [settings, setSettings] = useLocalStorage<FilterState>("settings", {
		humidity: false,
		sunset: false,
		wind: false,
	});

	const { humidity, sunset, wind: isWind } = settings;

	const handleFilterChange = (name: string, value: boolean) => {
		setSettings({ ...settings, [name]: value });
	};

	return (
		<Box w={["100%"]} display="flex" flexDirection="column">
			<Center gap={3}>
				<Text as="h3" fontSize={[14, 16]} fontWeight={400}>
					Погода Сейчас
				</Text>
				<IconButton
					aria-label="Settings"
					icon={<GoSettings />}
					onClick={onToggle}
				/>
			</Center>
			<Box
				display="flex"
				justifyContent="flex-end"
				alignItems="center"
				cursor="default"
				gap={5}
				mr={[0, 3]}
				fontSize={12}
				w={["100%"]}
			>
				<VStack>
					{humidity ? (
						<Text>{`Влажность ${Math.round(
							main?.humidity
						)} %`}</Text>
					) : null}
					{isWind ? (
						<Text>{`Скорость ветра ${Math.round(
							wind?.speed
						)} м/с`}</Text>
					) : null}
				</VStack>
				{sunset ? (
					<Box>
						<HStack>
							<Text>{`Восход в ${moment
								.unix(sys?.sunrise)
								.format("LT")}`}</Text>
							<Icon as={BsSunrise} fontSize={[35]} />
						</HStack>
						<HStack>
							<Text>{`Закат в ${moment
								.unix(sys?.sunset)
								.format("LT")}`}</Text>
							<Icon as={BsSunset} fontSize={[35]} />
						</HStack>
					</Box>
				) : null}
				<VStack>
					<Text>{`Max: ${Math.round(main?.temp_max)} ℃`}</Text>
					<Text>{`Min: ${Math.round(main?.temp_min)} ℃`}</Text>
				</VStack>
				<VStack>
					<WeatherIcons main={weather?.[0].main} size={45} />
					<Text fontSize={[9]} textTransform="uppercase">
						{weather?.[0]?.description}
					</Text>
				</VStack>
				<VStack>
					<HStack
						borderBottom="1px solid #dfe2df"
						_dark={{
							border: "1px solid #12121",
						}}
					>
						<Text fontSize={[35, 55]}>
							{Math.round(main?.temp)}
						</Text>
						<Text fontSize={[40]}>℃</Text>
					</HStack>
					<Text fontSize={[12]}>{`Ощущается ${Math.round(
						main?.feels_like
					)} ℃`}</Text>
				</VStack>
			</Box>
			<Box
				display="flex"
				justifyContent="flex-start"
				flexDirection="row"
			></Box>
			<Settings
				isOpen={isOpen}
				onClose={onClose}
				settings={settings}
				handleFilterChange={handleFilterChange}
				setSettings={setSettings}
			/>
		</Box>
	);
};

export default WeatherNow;

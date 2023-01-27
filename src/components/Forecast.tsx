import { Box, Center, Text } from "@chakra-ui/react";
import CardWeather from "./CardWeather";
import { useRef } from "react";
import { useDataContext } from "../context/useData";

const Forecast = () => {
	const { data } = useDataContext();
	const container = useRef<HTMLDivElement>(null);
	const forecast = data.list?.filter(
		(_, index) => index === 0 || index % 8 === 0
	);

	const handlWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		if (!container.current) {
			return;
		}
		let scrollLeft = container.current.scrollLeft;
		if (e.deltaY < 0) {
			scrollLeft -= 200;
		} else {
			scrollLeft += 200;
		}
		container.current.scrollTo({
			left: scrollLeft,
			behavior: "smooth",
		});
	};
	return (
		<>
			{data === undefined ? (
				<Text>Введите свой город или предоставте геоданные</Text>
			) : (
				<Center w={"100%"} px={5}>
					<Box
						ref={container}
						display="flex"
						w={["100%"]}
						overflowX="scroll"
						gap={5}
						onWheel={handlWheel}
						sx={{
							"::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						{forecast?.map((item, index) => (
							<Box key={index}>
								<CardWeather data={item} />
							</Box>
						))}
					</Box>
				</Center>
			)}
		</>
	);
};

export default Forecast;

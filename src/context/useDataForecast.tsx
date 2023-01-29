import React, {
	createContext, Dispatch,
	SetStateAction, useContext,
	useState
} from "react";
import { DataApiForecast } from "../types/types";

interface DataForecastContext {
	dataForcast: DataApiForecast;
	setDataForcast: Dispatch<SetStateAction<DataApiForecast>>;
}

const ContextData = createContext<DataForecastContext>({} as DataForecastContext);

export const DataForcastProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [dataForcast, setDataForcast] = useState<DataApiForecast>({} as DataApiForecast);

	return (
		<ContextData.Provider value={{ dataForcast, setDataForcast }}>
			{children}
		</ContextData.Provider>
	);
};

export const useDataForcastContext = () => useContext(ContextData);

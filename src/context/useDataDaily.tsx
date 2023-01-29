import React, {
	createContext, Dispatch,
	SetStateAction, useContext,
	useState
} from "react";
import { ListForecast } from "../types/types";

interface DataDailyContext {
	dataDaily: ListForecast;
	setDataDaily: Dispatch<SetStateAction<ListForecast>>;
}

const ContextData = createContext<DataDailyContext>({} as DataDailyContext);

export const DataDailyProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [dataDaily, setDataDaily] = useState<ListForecast>({} as ListForecast);

	return (
		<ContextData.Provider value={{ dataDaily, setDataDaily }}>
			{children}
		</ContextData.Provider>
	);
};

export const useDataDailyContext = () => useContext(ContextData);

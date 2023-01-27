import React, {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { DataApi } from "../types/types";

interface UserDataContex {
	data: DataApi;
	setData: Dispatch<SetStateAction<DataApi>>;
}

const ContextData = createContext<UserDataContex>({} as UserDataContex);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<DataApi>({} as DataApi);

	return (
		<ContextData.Provider value={{ data, setData }}>
			{children}
		</ContextData.Provider>
	);
};

export const useDataContext = () => useContext(ContextData);

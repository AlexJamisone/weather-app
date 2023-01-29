import {
	createContext, Dispatch, FC,
	ReactNode, SetStateAction, useContext,
	useState
} from "react";

interface Loading {
	loadingData?: boolean;
	loadingGeolocation?: boolean;
}

interface LoadingContext {
	loading: Loading;
	setLoading: Dispatch<SetStateAction<Loading>>;
}

const LoadingContext = createContext<LoadingContext>({} as LoadingContext);

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [loading, setLoading] = useState<Loading>({
		loadingData: false,
		loadingGeolocation: false,
	});
	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoaderContext = () => useContext(LoadingContext);

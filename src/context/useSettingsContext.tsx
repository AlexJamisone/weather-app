import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	FC,
	ReactNode,
	useState,
} from "react";

interface SettingsState {
	wind: boolean;
	sunset: boolean;
	humidity: boolean;
}

interface SettingsContextType {
	settings: SettingsState;
	setSettings: Dispatch<SetStateAction<SettingsState>>;
}

const ContextSettings = createContext<SettingsContextType>({} as SettingsContextType);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [settings, setSettings] = useState<SettingsState>({
		humidity: false,
		sunset: false,
		wind: false,
	});
	return (
		<ContextSettings.Provider value={{ settings, setSettings }}>
			{children}
		</ContextSettings.Provider>
	);
};

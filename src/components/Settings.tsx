import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerOverlay,
	Checkbox,
} from "@chakra-ui/react";
import { FilterState } from "./WeatherNow";
import { Dispatch, SetStateAction } from "react";

interface SettingsProps {
	isOpen: boolean;
	onClose: () => void;
	settings: FilterState;
	handleFilterChange: (name: string, value: boolean) => void;
	setSettings: Dispatch<SetStateAction<FilterState>>;
}

const Settings = ({
	isOpen,
	onClose,
	settings,
	handleFilterChange,
}: SettingsProps) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="left">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Настройка отображения</DrawerHeader>
				<DrawerBody display="flex" flexDirection="column">
					<Checkbox
						isChecked={settings.humidity}
						onChange={(e) =>
							handleFilterChange("humidity", e.target.checked)
						}
					>
						Влажность
					</Checkbox>
					<Checkbox
						isChecked={settings.sunset}
						onChange={(e) =>
							handleFilterChange("sunset", e.target.checked)
						}
					>
						Рассвет/Закат
					</Checkbox>
					<Checkbox
						isChecked={settings.wind}
						onChange={(e) =>
							handleFilterChange("wind", e.target.checked)
						}
					>
						Ветер
					</Checkbox>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default Settings;

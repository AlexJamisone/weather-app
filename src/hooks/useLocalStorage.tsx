import { useState, useEffect } from "react";

type LocalStorageData<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const useLocalStorage = <T,>(
	key: string,
	initialValue: T
): LocalStorageData<T> => {
	const [state, setState] = useState<T>(() => {
		if (typeof window !== "undefined") {
			const storedValue = localStorage.getItem(key);
			if (storedValue) {
				return JSON.parse(storedValue);
			}
		}
		return initialValue;
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem(key, JSON.stringify(state));
		}
	}, [key, state]);

	return [state, setState];
};

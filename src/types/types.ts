export interface ListForecast {
    clouds: {
		all: number;
	};
	dt: number;
	main: {
		feels_like: number;
		temp: number;
		grnd_level: number;
		humidity: number;
		pressure: number;
		sea_level: number;
		temp_kf: number;
		temp_max: number;
		temp_min: number;
	};
	weather: Array<{
		description: string;
		id: number;
		main: string;
	}>;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	sys: {
		sunrise: number
		sunset: number
	}
}

export interface DataApiForecast {
    cod: string
    city: {
        id: number
        name: string
        sunrise: number
        sunset: number
    }
    list: ListForecast[]
}
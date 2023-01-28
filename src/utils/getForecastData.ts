export const getForecastData = async (
	forecast: "forecast" | "weather",
	type: "geolocation" | "search",
	search?: string | null,
	lat?: number | null,
	lon?: number | null
) => {
	try {
		const geolocation_url_forcast = `https://api.openweathermap.org/data/2.5/${forecast}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_URL}&units=metric&lang=ru`;

		const search_url_forcast = `https://api.openweathermap.org/data/2.5/${forecast}?q=${search}&appid=${process.env.NEXT_PUBLIC_API_URL}&units=metric&lang=ru`;

		switch (type) {
			case "geolocation":
				const geolocation = await fetch(geolocation_url_forcast);
				return await geolocation.json();
			case "search":
				const search = await fetch(search_url_forcast);
				return await search.json();
		}
	} catch (error) {
		console.log(error);
	}
};

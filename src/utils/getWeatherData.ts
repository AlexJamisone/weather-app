export const getWeatherData = async (
	type: "geolocation" | "search",
	search?: string | null,
	lat?: number | null,
	lon?: number | null
) => {
    try {
        const geolocation_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_URL}&units=metric&lang=ru&cnt=10`;

        const search_url = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${process.env.NEXT_PUBLIC_API_URL}&units=metric&lang=ru&cnt=10`;

        switch (type) {
            case 'geolocation':
                const geolocation = await fetch(geolocation_url)
                return await geolocation.json()
            case 'search':
                const search = await fetch(search_url)
                return await search.json()
        }
    } catch (error) {
        console.log(error)
    }
};

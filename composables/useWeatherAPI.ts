import { ref } from 'vue';

interface WeatherData {
    temperature: number;
    weatherCode: number;
    humidity: number;
    windSpeed: number;
}

const WEATHER_CODES: Record<number, { emoji: string; description: string }> = {
    0: { emoji: '☀️', description: 'Clear sky' },
    1: { emoji: '🌤️', description: 'Mainly clear' },
    2: { emoji: '⛅', description: 'Partly cloudy' },
    3: { emoji: '☁️', description: 'Overcast' },
    45: { emoji: '🌫️', description: 'Foggy' },
    48: { emoji: '🌫️', description: 'Foggy' },
    51: { emoji: '🌦️', description: 'Light drizzle' },
    53: { emoji: '🌦️', description: 'Drizzle' },
    55: { emoji: '🌧️', description: 'Heavy drizzle' },
    61: { emoji: '🌧️', description: 'Light rain' },
    63: { emoji: '🌧️', description: 'Rain' },
    65: { emoji: '🌧️', description: 'Heavy rain' },
    71: { emoji: '🌨️', description: 'Light snow' },
    73: { emoji: '🌨️', description: 'Snow' },
    75: { emoji: '🌨️', description: 'Heavy snow' },
    77: { emoji: '🌨️', description: 'Snow grains' },
    80: { emoji: '🌦️', description: 'Light showers' },
    81: { emoji: '🌧️', description: 'Showers' },
    82: { emoji: '🌧️', description: 'Heavy showers' },
    85: { emoji: '🌨️', description: 'Light snow showers' },
    86: { emoji: '🌨️', description: 'Snow showers' },
    95: { emoji: '⛈️', description: 'Thunderstorm' },
    96: { emoji: '⛈️', description: 'Thunderstorm with hail' },
    99: { emoji: '⛈️', description: 'Thunderstorm with hail' },
};

export function useWeatherAPI() {
    const weatherData = ref<WeatherData | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchWeather = async () => {
        loading.value = true;
        error.value = null;

        try {
            const lat = 50.95;
            const lon = 7.45;
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
            );

            if (!response.ok) throw new Error('Weather fetch failed');

            const data = await response.json();
            weatherData.value = {
                temperature: Math.round(data.current.temperature_2m),
                weatherCode: data.current.weather_code,
                humidity: data.current.relative_humidity_2m,
                windSpeed: Math.round(data.current.wind_speed_10m),
            };
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            console.error('Weather API error:', err);
        } finally {
            loading.value = false;
        }
    };

    const getWeatherInfo = (code: number) => {
        return WEATHER_CODES[code] || { emoji: '❓', description: 'Unknown' };
    };

    return {
        weatherData,
        loading,
        error,
        fetchWeather,
        getWeatherInfo,
    };
}

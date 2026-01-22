<template>
    <div class="widget weather-widget">
        <div class="widget-title">Wetter Immelkeppel</div>
        <div v-if="loading && !weatherData" class="widget-content">Loading...</div>
        <div v-else-if="error" class="widget-content">{{ error }}</div>
        <div v-else-if="weatherData" class="widget-content">
            <div class="weather-info">
                <div class="weather-temp">{{ weatherData.temperature }}°C</div>
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <div class="weather-desc">{{ weatherInfo.emoji }} {{ weatherInfo.description }}</div>
                    <div class="weather-details">💧 {{ weatherData.humidity }}% • 💨 {{ weatherData.windSpeed }} km/h</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useInterval } from '../composables/useInterval';
    import { useWeatherAPI } from '../composables/useWeatherAPI';

    const { weatherData, loading, error, fetchWeather, getWeatherInfo } = useWeatherAPI();

    const weatherInfo = computed(() => {
        if (!weatherData.value) return { emoji: '❓', description: 'Unknown' };
        return getWeatherInfo(weatherData.value.weatherCode);
    });

    onMounted(() => {
        fetchWeather();
        useInterval(fetchWeather, 600000); // Update every 10 minutes
    });
</script>

<style scoped>
    .widget-title {
        font-size: 12px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 5px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
    }

    .widget-content {
        color: white;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.4;
    }

    .weather-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .weather-temp {
        font-size: 32px;
        font-weight: 100;
        color: white;
        margin-bottom: 20px;
    }

    .weather-desc {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
    }

    .weather-details {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 4px;
    }
</style>

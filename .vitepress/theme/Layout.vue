<template>
    <div class="screensaver-app">
        <VantaBackground ref="vantaBgRef" />
        <ClockDisplay />

        <div class="widgets-container">
            <HockeyWidget />
            <WeatherWidget />
            <HistoryWidget />
        </div>

        <RedditNotification />
        <CommercialOverlay @commercial-start="onCommercialStart" @commercial-end="onCommercialEnd" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import VantaBackground from '../../components/VantaBackground.vue';
    import ClockDisplay from '../../components/ClockDisplay.vue';
    import HockeyWidget from '../../components/HockeyWidget.vue';
    import WeatherWidget from '../../components/WeatherWidget.vue';
    import HistoryWidget from '../../components/HistoryWidget.vue';
    import RedditNotification from '../../components/RedditNotification.vue';
    import CommercialOverlay from '../../components/CommercialOverlay.vue';

    const vantaBgRef = ref<InstanceType<typeof VantaBackground> | null>(null);

    const onCommercialStart = () => {
        vantaBgRef.value?.pauseEffect();
    };

    const onCommercialEnd = () => {
        vantaBgRef.value?.resumeEffect();
    };
</script>

<style scoped>
    .screensaver-app {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        font-family: 'Roboto', sans-serif;
    }

    .widgets-container {
        position: fixed;
        bottom: 30px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 15px 60px;
        z-index: 10;
        gap: 15px;
    }

    @media (max-width: 768px) {
        .widgets-container {
            flex-direction: column;
            padding: 10px 20px;
            gap: 10px;
        }
    }
</style>

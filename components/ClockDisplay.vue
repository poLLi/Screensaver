<template>
    <div class="clock-display">
        <div class="time">{{ currentTime }}</div>
        <div class="date">{{ currentDate }}</div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useInterval } from '../composables/useInterval';

    const currentTime = ref('00:00:00');
    const currentDate = ref('Loading...');

    const updateClock = () => {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTime.value = `${hours}:${minutes}:${seconds}`;

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        currentDate.value = now.toLocaleDateString('en-US', options);
    };

    // Update immediately
    updateClock();

    onMounted(() => {
        updateClock();
        useInterval(updateClock, 1000);
    });
</script>

<style scoped>
    .clock-display {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 10;
        color: white;
    }

    .time {
        font-size: 140px;
        font-weight: 100;
        text-shadow:
            0 0 30px rgba(0, 0, 0, 0.5),
            0 0 60px rgba(0, 0, 0, 0.3);
        letter-spacing: 12px;
        margin-bottom: 20px;
    }

    .date {
        font-size: 36px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        letter-spacing: 3px;
    }

    @media (max-width: 768px) {
        .time {
            font-size: 60px;
            letter-spacing: 4px;
        }

        .date {
            font-size: 18px;
            letter-spacing: 1px;
        }
    }
</style>

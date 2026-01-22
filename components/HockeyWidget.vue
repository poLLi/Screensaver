<template>
    <div class="widget hockey-widget">
        <div class="widget-title">
            <img src="https://www.haie.de/wp-content/themes/haie/dist/img/del-teams/kec.svg?version=2023-09" class="title-logo" alt="Kölner Haie" />
            Kölner Haie
        </div>
        <div v-if="currentGame" class="widget-content">
            <div class="game-info">
                <div class="game-status">
                    <span style="color: #ff4444; font-weight: 400">🔴 LIVE NOW</span>
                </div>
                <div class="game-opponent">
                    {{ currentGame.awayTeam.name }}
                </div>
                <div class="game-time">{{ currentGame.location === 'Home' ? '🏠 Home' : '✈️ Away' }}</div>
            </div>
        </div>
        <div v-else-if="nextGame" class="widget-content">
            <div class="game-info">
                <div class="game-status">Next Game {{ countdown }}</div>
                <div class="game-opponent">
                    {{ nextGame.awayTeam.name }}
                </div>
                <div class="game-time">{{ nextGame.date }} • {{ nextGame.time }}</div>
                <div class="game-status">{{ nextGame.location === 'Home' ? '🏠 Home' : '✈️ Away' }}</div>
            </div>
        </div>
        <div v-else class="widget-content">
            <div class="game-info">
                <div class="game-status">No upcoming games</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useInterval } from '../composables/useInterval';
    import { games } from '../data/gameSchedule';

    const now = ref(new Date());

    const updateNow = () => {
        now.value = new Date();
    };

    const currentGame = computed(() => {
        return games.find((game) => {
            const gameDate = new Date(game.dateTime);
            const timeDiff = now.value.getTime() - gameDate.getTime();
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            return hoursDiff >= 0 && hoursDiff <= 3;
        });
    });

    const nextGame = computed(() => {
        return games.find((game) => {
            const gameDate = new Date(game.dateTime);
            return gameDate > now.value;
        });
    });

    const countdown = computed(() => {
        if (!nextGame.value) return null;

        const gameDate = new Date(nextGame.value.dateTime);
        const daysUntil = Math.ceil((gameDate.getTime() - now.value.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntil === 0) return 'Today';
        if (daysUntil === 1) return 'Tomorrow';
        return `in ${daysUntil} days`;
    });

    onMounted(() => {
        useInterval(updateNow, 60000); // Update every minute
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
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .title-logo {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .widget-content {
        color: white;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.4;
    }

    .game-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .game-opponent {
        font-size: 18px;
        color: rgba(250, 202, 202, 0.9);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .game-status {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.479);
        margin-top: 2px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .game-time {
        font-size: 16px;
        font-weight: 300;
        color: white;
    }
</style>

<template>
    <div ref="overlayRef" class="commercial-overlay" :class="overlayClass">
        <div v-for="i in 6" :key="i" class="commercial-slice" :style="getSliceStyle(i)"></div>
        <div class="commercial-content">
            <img v-if="currentTeam" :src="currentTeam.logo" :alt="currentTeam.name" class="commercial-logo" />
            <div v-if="currentTeam" class="commercial-text" :style="getTextStyle()">{{ currentTeam.name }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useInterval } from '../composables/useInterval';
    import { teams } from '../data/teams';

    const overlayRef = ref<HTMLElement | null>(null);
    const currentTeamIndex = ref(0);
    const isActive = ref(false);
    const isExiting = ref(false);

    const currentTeam = computed(() => teams[currentTeamIndex.value]);

    const overlayClass = computed(() => ({
        active: isActive.value,
        exit: isExiting.value,
    }));

    const getSliceStyle = (index: number) => {
        const positions = ['-10%', '8%', '26%', '44%', '62%', '80%'];
        const delays = ['0s', '0.08s', '0.16s', '0.24s', '0.32s', '0.4s'];
        return {
            left: positions[index - 1],
            animationDelay: delays[index - 1] + ' !important',
            background: currentTeam.value?.gradient || '',
        };
    };

    const getTextStyle = () => {
        return {
            textShadow: `0 4px 8px rgba(0, 0, 0, 0.6), 0 0 40px ${currentTeam.value?.glowColor || 'rgba(227, 6, 19, 0.4)'}`,
        };
    };

    const playCommercial = () => {
        // Reset state
        isActive.value = false;
        isExiting.value = false;

        // Small delay then activate
        setTimeout(() => {
            isActive.value = true;
        }, 50);

        // Start exit animation
        setTimeout(() => {
            isExiting.value = true;
        }, 3500);

        // Reset and move to next team
        setTimeout(() => {
            isActive.value = false;
            isExiting.value = false;
            currentTeamIndex.value = (currentTeamIndex.value + 1) % teams.length;
        }, 4500);
    };

    onMounted(() => {
        // Play first 2 commercial after 10 and 20 seconds
        setTimeout(playCommercial, 10000);
        setTimeout(playCommercial, 20000);

        // Then every 15 minutes
        useInterval(playCommercial, 900000);
    });
</script>

<style scoped>
    .commercial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        pointer-events: none;
        overflow: hidden;
        opacity: 0;
    }

    .commercial-overlay.active {
        opacity: 1;
        pointer-events: auto;
    }

    .commercial-slice {
        position: absolute;
        width: 20%;
        height: 200%;
        top: -50%;
        background: linear-gradient(180deg, #1a1a3e 0%, #3d1e4f 15%, #e30613 35%, #ff6b7a 50%, #ffffff 55%, #ff6b7a 60%, #e30613 65%, #3d1e4f 85%, #1a1a3e 100%);
        transform: translateX(-150%) translateY(-150%) rotate(45deg);
        transform-origin: center;
        transition: background 0.3s ease;
    }

    .commercial-overlay.active .commercial-slice {
        animation: sliceSlideIn 1s cubic-bezier(0.85, 0, 0.15, 1) forwards;
    }

    .commercial-overlay.active.exit .commercial-slice {
        animation: sliceSlideOut 0.8s cubic-bezier(0.85, 0, 0.15, 1) forwards;
    }

    .commercial-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 10;
        opacity: 0;
    }

    .commercial-overlay.active .commercial-content {
        animation: contentFadeIn 0.6s ease-out 0.7s forwards;
    }

    .commercial-overlay.active.exit .commercial-content {
        animation: contentFadeOut 0.5s ease-in forwards;
    }

    .commercial-logo {
        width: 600px;
        height: auto;
        filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5));
        margin-bottom: 30px;
    }

    .commercial-text {
        font-size: 52px;
        font-weight: 300;
        color: #ffffff;
        text-shadow:
            0 4px 8px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(227, 6, 19, 0.4);
        letter-spacing: 12px;
        text-transform: uppercase;
        transition: text-shadow 0.3s ease;
    }

    @keyframes sliceSlideIn {
        0% {
            transform: translateX(-150%) translateY(-150%) rotate(45deg);
        }
        100% {
            transform: translateX(0) translateY(0) rotate(45deg);
        }
    }

    @keyframes sliceSlideOut {
        0% {
            transform: translateX(0) translateY(0) rotate(45deg);
        }
        100% {
            transform: translateX(150%) translateY(150%) rotate(45deg);
        }
    }

    @keyframes contentFadeIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes contentFadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }

    @media (max-width: 768px) {
        .commercial-logo {
            width: 300px;
        }

        .commercial-text {
            font-size: 28px;
            letter-spacing: 6px;
        }
    }
</style>

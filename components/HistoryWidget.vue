<template>
    <div class="widget history-widget">
        <div class="widget-title">� Today in History</div>
        <div v-if="loading && !historyEvent" class="widget-content">Loading...</div>
        <div v-else-if="error" class="widget-content">{{ error }}</div>
        <div v-else-if="historyEvent" class="widget-content">
            <div class="history-info">
                <div class="history-event">
                    <span class="history-year">{{ historyEvent.year }}:</span> {{ historyEvent.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useInterval } from '../composables/useInterval';
    import { useHistoryAPI } from '../composables/useHistoryAPI';

    const { historyEvent, loading, error, fetchHistory } = useHistoryAPI();

    onMounted(() => {
        fetchHistory();
        useInterval(fetchHistory, 300000); // Update every 5 minutes
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

    .history-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 8px;
    }

    .history-event {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.5;
    }

    .history-year {
        font-size: 16px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 1px;
    }
</style>

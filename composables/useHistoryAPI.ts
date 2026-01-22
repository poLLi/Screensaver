import { ref } from 'vue';

interface HistoryEvent {
    year: string;
    text: string;
}

export function useHistoryAPI() {
    const historyEvent = ref<HistoryEvent | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchHistory = async () => {
        loading.value = true;
        error.value = null;

        try {
            const now = new Date();
            const month = now.getMonth() + 1;
            const day = now.getDate();

            const response = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);

            if (!response.ok) throw new Error('History fetch failed');

            const data = await response.json();

            if (data.data?.Events && data.data.Events.length > 0) {
                const events = data.data.Events;
                const randomEvent = events[Math.floor(Math.random() * events.length)];
                historyEvent.value = {
                    year: randomEvent.year,
                    text: randomEvent.text,
                };
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            console.error('History API error:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        historyEvent,
        loading,
        error,
        fetchHistory,
    };
}

import { onUnmounted } from 'vue';

export function useInterval(callback: () => void, delay: number) {
    // Start interval immediately
    const intervalId = window.setInterval(callback, delay);

    // Clean up on unmount
    onUnmounted(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    });

    return {
        stop: () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        },
    };
}

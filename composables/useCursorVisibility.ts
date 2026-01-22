import { onMounted, onUnmounted } from 'vue';

export function useCursorVisibility() {
    let cursorTimeout: number | null = null;

    const showCursor = () => {
        const app = document.querySelector('.screensaver-app');
        if (!app) return;

        app.classList.add('show-cursor');

        if (cursorTimeout) {
            clearTimeout(cursorTimeout);
        }

        cursorTimeout = window.setTimeout(() => {
            app.classList.remove('show-cursor');
        }, 2000);
    };

    onMounted(() => {
        document.addEventListener('mousemove', showCursor);
    });

    onUnmounted(() => {
        document.removeEventListener('mousemove', showCursor);
        if (cursorTimeout) {
            clearTimeout(cursorTimeout);
        }
    });
}

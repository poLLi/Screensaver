<template>
    <div ref="vantaRef" class="vanta-background"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    const vantaRef = ref<HTMLElement | null>(null);
    let vantaEffect: any = null;
    let colorIndex = 0;
    let nextColorIndex = 1;
    let transitionProgress = 0;

    const colors = [
        0x1a1a2e, // Deep blue
        0x2e1a3e, // Purple
        0x1a2e3e, // Teal
        0x1a3e2e, // Green-blue
        0x3e1a2e, // Magenta
        0x2e3e1a, // Olive
    ];

    // Helper function to interpolate between two colors
    function interpolateColor(color1: number, color2: number, factor: number) {
        const r1 = (color1 >> 16) & 0xff;
        const g1 = (color1 >> 8) & 0xff;
        const b1 = color1 & 0xff;

        const r2 = (color2 >> 16) & 0xff;
        const g2 = (color2 >> 8) & 0xff;
        const b2 = color2 & 0xff;

        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);

        return (r << 16) | (g << 8) | b;
    }

    const updateColor = () => {
        if (!vantaEffect) return;

        transitionProgress += 0.01;

        if (transitionProgress >= 1) {
            transitionProgress = 0;
            colorIndex = nextColorIndex;
            nextColorIndex = (nextColorIndex + 1) % colors.length;
        }

        const currentColor = interpolateColor(colors[colorIndex], colors[nextColorIndex], transitionProgress);

        vantaEffect.setOptions({
            color: currentColor,
        });
    };

    onMounted(() => {
        // Wait for VANTA to be available from CDN
        const initVanta = () => {
            if (typeof window === 'undefined' || !vantaRef.value) return;

            const VANTA = (window as any).VANTA;
            if (!VANTA || !VANTA.WAVES) {
                console.log('Waiting for VANTA to load...');
                setTimeout(initVanta, 100);
                return;
            }

            try {
                vantaEffect = VANTA.WAVES({
                    el: vantaRef.value,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x1a1a2e,
                    shininess: 30.0,
                    waveHeight: 20.0,
                    waveSpeed: 0.25,
                    zoom: 0.65,
                });

                console.log('Vanta initialized successfully');

                // Start color transition
                setInterval(updateColor, 100);
            } catch (err) {
                console.error('Failed to initialize Vanta:', err);
            }
        };

        initVanta();
    });

    onUnmounted(() => {
        if (vantaEffect) {
            vantaEffect.destroy();
        }
    });
</script>

<style scoped>
    .vanta-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
</style>

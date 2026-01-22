<template>
    <Transition name="slide">
        <div v-if="showNotification && latestPost" class="reddit-notification">
            <div class="notification-content">
                <div class="reddit-header">
                    <span class="reddit-icon">🔴</span>
                    <span class="subreddit">r/NHL - New Post</span>
                </div>

                <div class="post-content">
                    <img v-if="latestPost.thumbnail && latestPost.thumbnail.startsWith('http')" :src="latestPost.thumbnail" alt="Post thumbnail" class="post-thumbnail" />
                    <div class="post-details">
                        <a :href="latestPost.url" target="_blank" rel="noopener noreferrer" class="post-title">{{ latestPost.title }}</a>
                        <div class="post-meta">
                            <span class="author">u/{{ latestPost.author }}</span>
                            <span class="stats"> ⬆️ {{ latestPost.ups }} | 💬 {{ latestPost.num_comments }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useInterval } from '../composables/useInterval';
    import { useRedditAPI } from '../composables/useRedditAPI';

    const { latestPost, fetchReddit } = useRedditAPI();
    const showNotification = ref(false);
    let hideTimeout: number | null = null;

    const checkReddit = async () => {
        const hasNewPost = await fetchReddit();

        if (hasNewPost) {
            showNotification.value = true;

            // Auto-hide after 30 seconds
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = window.setTimeout(() => {
                showNotification.value = false;
            }, 30000);
        }
    };

    onMounted(() => {
        checkReddit();
        useInterval(checkReddit, 300000); // Check every 5 minutes
    });
</script>

<style scoped>
    .reddit-notification {
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        max-width: 400px;
        backdrop-filter: blur(10px);
        background: rgba(255, 69, 0, 0.15);
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 8px 32px rgba(255, 69, 0, 0.3);
        border: 1px solid rgba(255, 69, 0, 0.3);
        color: white;
    }

    .reddit-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 15px;
        font-weight: bold;
    }

    .reddit-icon {
        font-size: 1.2rem;
    }

    .subreddit {
        color: #ff4500;
    }

    .post-content {
        display: flex;
        gap: 15px;
    }

    .post-thumbnail {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        flex-shrink: 0;
    }

    .post-details {
        flex: 1;
        min-width: 0;
    }

    .post-title {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 10px;
        line-height: 1.3;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: white;
        text-decoration: none;
        transition: color 0.2s;
    }

    .post-title:hover {
        color: #ff4500;
        text-decoration: underline;
    }

    .post-meta {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 0.85rem;
        opacity: 0.9;
    }

    .author {
        color: #64c8ff;
    }

    .slide-enter-active {
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .slide-leave-active {
        transition: all 0.3s ease-out;
    }

    .slide-enter-from {
        transform: translateX(-100%) translateY(-50%);
        opacity: 0;
    }

    .slide-leave-to {
        transform: translateX(-100%) translateY(-50%);
        opacity: 0;
    }

    @media (max-width: 768px) {
        .reddit-notification {
            left: 10px;
            right: 10px;
            max-width: none;
        }
    }
</style>

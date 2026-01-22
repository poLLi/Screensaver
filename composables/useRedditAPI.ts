import { ref } from 'vue';

interface RedditPost {
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    url: string;
    ups: number;
    num_comments: number;
}

export function useRedditAPI() {
    const latestPost = ref<RedditPost | null>(null);
    const lastSeenPostId = ref<string>('');
    const isInitialized = ref(false);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchReddit = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch('https://www.reddit.com/r/nhl.json');

            if (!response.ok) throw new Error('Reddit fetch failed');

            const data = await response.json();

            if (data.data?.children && data.data.children.length > 0) {
                // Filter out pinned/stickied posts
                const posts = data.data.children.filter((child: any) => !child.data.stickied);

                if (posts.length > 0) {
                    const firstPost = posts[0].data;

                    // On first load, just set the baseline without showing notification
                    if (!isInitialized.value) {
                        lastSeenPostId.value = firstPost.id;
                        isInitialized.value = true;
                        return false; // Don't show notification on initial load
                    }

                    // Only update if it's a new post
                    if (firstPost.id !== lastSeenPostId.value) {
                        latestPost.value = {
                            id: firstPost.id,
                            title: firstPost.title,
                            author: firstPost.author,
                            thumbnail: firstPost.thumbnail,
                            url: `https://www.reddit.com${firstPost.permalink}`,
                            ups: firstPost.ups,
                            num_comments: firstPost.num_comments,
                        };
                        lastSeenPostId.value = firstPost.id;
                        return true; // New post found
                    }
                }
            }
            return false; // No new post
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error';
            console.error('Reddit API error:', err);
            return false;
        } finally {
            loading.value = false;
        }
    };

    return {
        latestPost,
        loading,
        error,
        fetchReddit,
    };
}

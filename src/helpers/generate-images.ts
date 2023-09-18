const authToken = process.env.UNSPLASH_CLIENT_ID || "dQwnOSfmu2difq_7TZErkxBtmsJeEBpwJt49GKcF0VI";

export async function generateImages(keyword: string) {

    try {
        const url = `https://api.unsplash.com/search/photos/?query=${keyword}&orientation=landscape`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${authToken}`,
            },
        });

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const data = await response.json();
        const imageUrls = data.results.map((result) => result.urls.raw);

        return imageUrls;
    } catch (error) {
        console.error(`UnsplashAPI error: ${error}`);
        return null;
    }
}

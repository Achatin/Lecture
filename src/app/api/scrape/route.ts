import axios from "axios";
import { load } from "cheerio";

export async function POST(req: Request) {
    try {
        let { url }: {string} = await req.json();
        url = removeLocalization(url);
            
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);

        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');

        return new Response(JSON.stringify({ title, description, ogImage, url }), {
            headers: { 'Content-Type': 'application/json' },
         });
    } catch (e) {
        console.error('Error scraping metadata:', e);
    }
}

function removeLocalization(url: string) {
    const urlParts = new URL(url);

    const hostParts = urlParts.host.split('.');

    if (hostParts.length > 1) hostParts.shift();

    const updatedUrl = urlParts.protocol + '//' + hostParts.join('.') + urlParts.pathname + urlParts.search;

    return updatedUrl;
}
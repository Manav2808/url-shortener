import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function generateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "Please enter a URL" });

    const shortUrl = nanoid(7);
    await URL.create({
        shortUrl: shortUrl,
        url: body.url
    });

    return res.status(200).json({ id: shortUrl });
}

export default generateNewShortUrl;
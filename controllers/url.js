import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function generateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.json({ error: "No URL entered" });
    }

    const url = await URL.findOne({ url: body.url });
    if (url) {
        return res.json({ id: url.shortUrl });
    }

    const shortUrl = nanoid(7);
    await URL.create({
        shortUrl: shortUrl,
        url: body.url
    });

    return res.status(200).json({ id: shortUrl });
}

export default generateNewShortUrl;
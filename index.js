import express from "express";
import mongoose from "mongoose";
import urlRouter from "./routes/url.js";
import URL from "./models/url.js";

const app = express();
const PORT = 3000;
const MONGODB_URL = "mongodb://127.0.0.1:27017/short-urls"

app.use(express.json());

app.use('/url', urlRouter);
app.use('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;

    const url = await URL.findOne({ shortUrl: shortUrl });

    res.redirect(url.url);
})

try {
    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log("Connected to MongoDB");
            app.listen(PORT, () => {
                console.log(`Server started on PORT: ${PORT}`);
            })
        })
} catch (error) {
    console.log(error);
}
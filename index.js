import express from "express";
import mongoose from "mongoose";
import urlRouter from "./routes/url.js";
import URL from "./models/url.js";
import path from "path";

const app = express();
const PORT = 3000;
const MONGODB_URL = "mongodb://127.0.0.1:27017/short-urls"

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

app.use(express.json());
app.use('/url', urlRouter);

app.get('/', async (req, res) => {
    const allUrls = await URL.find({}, { _id: 0, shortUrl: 1, url: 1 });
    return res.render('home', { allUrls });
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;

    const url = await URL.findOne({ shortUrl: shortUrl });

    if (url) {
        return res.redirect(url.url);
    }

    return res.render('error');

});

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
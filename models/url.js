import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
    {
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const URL = mongoose.model('url', urlSchema);

export default URL;
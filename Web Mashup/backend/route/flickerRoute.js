import express from "express";
import needle from "needle";
const router = express.Router();
import url from "url"


router.get("/", async (req, res) => {
    const API_BASE_URL = process.env.FLICKER_API_URL
    const API_KEY_NAME = process.env.FLICKER_KEY_NAME
    const API_KEY_VALUE = process.env.FLICKER_KEY_VALUE
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })
        const apiRes = await needle("get", `${API_BASE_URL}?${params}`)
        const data = apiRes.body;
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
    }
})

export default router;
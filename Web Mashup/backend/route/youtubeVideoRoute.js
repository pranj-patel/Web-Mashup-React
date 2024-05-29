import express from "express"; // Importing the express module
import needle from "needle"; // Importing needle for making HTTP requests
const router = express.Router(); // Creating a new router object
import url from "url"; // Importing the url module to parse URLs

// Define a GET route on the root path
router.get("/", async (req, res) => {
    // Extracting environment variables for the YouTube API base URL, API key name, and API key value
    const API_BASE_URL = process.env.YT_API_URL;
    const API_KEY_NAME = process.env.YT_KEY_NAME;
    const API_KEY_VALUE = process.env.YT_KEY_VALUE;

    try {
        // Constructing the query parameters for the YouTube API request
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE, // Adding the API key name and value to the query parameters
            ...url.parse(req.url, true).query // Parsing the query parameters from the incoming request URL and spreading them into the params object
        });

        // Making a GET request to the YouTube API with the constructed query parameters
        const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
        const data = apiRes.body; // Extracting the response body

        // Sending the response body as JSON with a 200 status code
        res.status(200).json(data);

    } catch (error) {
        // Logging any errors that occur during the request
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" }); // Sending a 500 status code with an error message
    }
});

export default router; // Exporting the router to be used in other parts of the application

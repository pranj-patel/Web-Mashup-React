import express from "express"; // Importing the express module
import dotenv from "dotenv"; // Importing dotenv for environment variables
import cors from "cors"; // Importing cors for handling Cross-Origin Resource Sharing
import path from "path"; // Importing path for working with file and directory paths

// Load environment variables from a .env file into process.env
dotenv.config();

// Resolve the absolute path of the current module
const __dirname = path.resolve();

// Create an instance of Express
const app = express();

// Importing route handlers
import topPlaceRouter from "./route/topPlacesRoute.js";
import flickerRoute from "./route/flickerRoute.js";
import ytRoute from "./route/youtubeVideoRoute.js";

// Enable CORS middleware to allow cross-origin requests
app.use(cors());

// Define the port number from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Define middleware for handling routes
app.use("/api/topPlace", topPlaceRouter); // Mount the topPlaceRouter at the /api/topPlace path
app.use("/api/flicker", flickerRoute); // Mount the flickerRoute at the /api/flicker path
app.use("/api/yt", ytRoute); // Mount the ytRoute at the /api/yt path

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, './frontend/dist')));

// Serve index.html for any other unmatched routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', "dist", 'index.html'));
});

// Serve JavaScript files from the frontend/dist/js directory with the correct content type
app.use('/js', express.static(path.join(__dirname, '/frontend/dist/js'), {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

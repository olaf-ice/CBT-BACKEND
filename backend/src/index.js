import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./config/app.js";

// Load environment variables early
dotenv.config();

const startServer = async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 8000;

        const server = app.listen(port, () => {
            console.log(`✅ Server running on http://localhost:${port}`);
        });

        // Correct server error handler
        server.on("error", (err) => {
            console.error("Server error:", err);
        });

    } catch (error) {
        console.error("Startup failed:", error);
        process.exit(1);
    }
};

startServer();

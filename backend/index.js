/**
 * VibeCheck API (CPE 411L)
 *
 * This server:
 * - runs on your computer (localhost)
 * - listens on a port (default: 3000)
 * - responds to browser requests (endpoints) using JSON
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS lets your frontend page call your backend API.
app.use(cors());

// This allows Express to read JSON bodies (used for POST requests).
app.use(express.json());

// Import route modules
const fortuneRoutes = require("./routes/fortune");
const jokesRoutes = require("./routes/jokes");
const vibeRoutes = require("./routes/vibe");
const smashRoutes = require("./routes/smash");
const secretRoutes = require("./routes/secret");

// Import error handling middleware
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

// Register routes
app.use("/api/fortune", fortuneRoutes);
app.use("/api/joke", jokesRoutes);
app.use("/api/vibe", vibeRoutes);
app.use("/api/smash", smashRoutes);
app.use("/api/smashes", smashRoutes);
app.use("/api/secret", secretRoutes);

// Error handling middleware (MUST be registered AFTER all routes)
app.use(notFoundHandler);  // Catches 404 errors
app.use(errorHandler);     // Catches all other errors

// Start server
app.listen(PORT, () => {
    console.log(`VibeCheck API running at http://localhost:${PORT}`);
});
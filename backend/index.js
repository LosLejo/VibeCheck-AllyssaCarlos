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

// Register routes
app.use("/api/fortune", fortuneRoutes);
app.use("/api/joke", jokesRoutes);
app.use("/api/vibe", vibeRoutes);
app.use("/api/smash", smashRoutes);
app.use("/api/smashes", smashRoutes);
app.use("/api/secret", secretRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`VibeCheck API running at http://localhost:${PORT}`);
});
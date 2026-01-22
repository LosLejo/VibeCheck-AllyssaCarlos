const express = require("express");
const router = express.Router();

// Vibe data map
let vibeMap = {
    happy: { emoji: "😄", message: "Keep going - you're shipping greatness!" },
    tired: { emoji: "🥱", message: "Hydrate. Stretch. Then commit." },
    stressed: { emoji: "😵‍💫", message: "Breathe. One bug at a time." },
};

// GET /api/vibe?mood=happy|tired|stressed
router.get("/", (req, res) => {
    const mood = (req.query.mood || "").toLowerCase();
    const vibe = vibeMap[mood];

    if (!vibe) {
        return res.json({
            mood: mood || "unknown",
            emoji: "🤔",
            message: "Try mood=happy, tired, or stressed.",
        });
    }

    res.json({ mood, ...vibe });
});

// GET /api/vibe/all -> returns all available vibes
router.get("/all", (req, res) => {
    const vibes = Object.keys(vibeMap).map(mood => ({
        mood,
        ...vibeMap[mood]
    }));
    res.json({ vibes, count: vibes.length });
});

// POST /api/vibe -> add new vibe mood
router.post("/", (req, res) => {
    const { mood, emoji, message } = req.body;

    if (!mood || !emoji || !message) {
        return res.status(400).json({ error: "mood, emoji, and message are required" });
    }

    const moodLower = mood.toLowerCase();

    if (vibeMap[moodLower]) {
        return res.status(409).json({ error: "Mood already exists. Use PUT to update." });
    }

    vibeMap[moodLower] = { emoji, message };
    res.status(201).json({ message: "Vibe added", mood: moodLower, vibe: vibeMap[moodLower] });
});

// PUT /api/vibe/:mood -> update existing vibe
router.put("/:mood", (req, res) => {
    const mood = req.params.mood.toLowerCase();
    const { emoji, message } = req.body;

    if (!vibeMap[mood]) {
        return res.status(404).json({ error: "Mood not found" });
    }

    if (emoji) vibeMap[mood].emoji = emoji;
    if (message) vibeMap[mood].message = message;

    res.json({ message: "Vibe updated", mood, vibe: vibeMap[mood] });
});

// DELETE /api/vibe/:mood -> delete vibe
router.delete("/:mood", (req, res) => {
    const mood = req.params.mood.toLowerCase();

    if (!vibeMap[mood]) {
        return res.status(404).json({ error: "Mood not found" });
    }

    const deleted = vibeMap[mood];
    delete vibeMap[mood];
    res.json({ message: "Vibe deleted", mood, vibe: deleted });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");

// Smash counter (stored in memory for now)
let smashes = 0;

// POST /api/smash -> increases counter and returns the updated value
router.post("/", (req, res) => {
    smashes += 1;
    res.json({ smashes });
});

// GET /api/smashes -> returns current counter
router.get("/", (req, res) => {
    res.json({ smashes });
});

// PUT /api/smash/set -> set counter to specific value
router.put("/set", (req, res) => {
    const { value } = req.body;

    if (value === undefined || typeof value !== "number" || value < 0) {
        return res.status(400).json({ error: "Valid non-negative number required" });
    }

    smashes = value;
    res.json({ message: "Counter set", smashes });
});

// DELETE /api/smash -> reset counter to zero
router.delete("/", (req, res) => {
    const previousValue = smashes;
    smashes = 0;
    res.json({ message: "Counter reset", previousValue, smashes });
});

module.exports = router;

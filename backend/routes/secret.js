const express = require("express");
const router = express.Router();

// GET /api/secret?code=411L -> hidden message if code is correct
router.get("/", (req, res) => {
    const code = req.query.code;

    if (code === "411L") {
        return res.json({ message: "🎉 Secret unlocked: +10 luck on your next merge!" });
    }

    res.status(403).json({ message: "Nope 😄 Try code=411L" });
});

module.exports = router;

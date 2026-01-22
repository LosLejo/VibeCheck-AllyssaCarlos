const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");

// Data pool with IDs for CRUD operations
let fortunes = [
    { id: 1, text: "You will debug it in 5 minutes... after 55 minutes of panic." },
    { id: 2, text: "Your next commit will be clean and meaningful." },
    { id: 3, text: "A bug will disappear when you add one console.log()." },
    { id: 4, text: "You passed the vibe check today. 😎" },
];

let nextId = 5; // Auto-increment ID

// GET /api/fortune -> returns one random fortune
router.get("/", asyncHandler(async (req, res) => {
    if (fortunes.length === 0) {
        return res.status(404).json({ error: "No fortunes available" });
    }
    const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.json({ fortune: pick.text });
}));

// GET /api/fortune/all -> returns all fortunes
router.get("/all", asyncHandler(async (req, res) => {
    res.json({ fortunes, count: fortunes.length });
}));

// GET /api/fortune/:id -> returns specific fortune by ID
router.get("/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const fortune = fortunes.find(f => f.id === id);

    if (!fortune) {
        return res.status(404).json({ error: "Fortune not found" });
    }

    res.json({ fortune });
}));

// POST /api/fortune -> add new fortune
router.post("/", asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Fortune text is required" });
    }

    const newFortune = {
        id: nextId++,
        text: text.trim()
    };

    fortunes.push(newFortune);
    res.status(201).json({ message: "Fortune added", fortune: newFortune });
}));

// PUT /api/fortune/:id -> update existing fortune
router.put("/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Fortune text is required" });
    }

    const fortune = fortunes.find(f => f.id === id);

    if (!fortune) {
        return res.status(404).json({ error: "Fortune not found" });
    }

    fortune.text = text.trim();
    res.json({ message: "Fortune updated", fortune });
}));

// DELETE /api/fortune/:id -> delete fortune
router.delete("/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const index = fortunes.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Fortune not found" });
    }

    const deleted = fortunes.splice(index, 1)[0];
    res.json({ message: "Fortune deleted", fortune: deleted });
}));

module.exports = router;

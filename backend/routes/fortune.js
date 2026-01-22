const express = require("express");
const router = express.Router();

// Data pool with IDs for CRUD operations
let fortunes = [
    { id: 1, text: "You will debug it in 5 minutes... after 55 minutes of panic." },
    { id: 2, text: "Your next commit will be clean and meaningful." },
    { id: 3, text: "A bug will disappear when you add one console.log()." },
    { id: 4, text: "You passed the vibe check today. 😎" },
];

let nextId = 5; // Auto-increment ID

// GET /api/fortune -> returns one random fortune
router.get("/", (req, res) => {
    const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.json({ fortune: pick.text });
});

// GET /api/fortune/all -> returns all fortunes
router.get("/all", (req, res) => {
    res.json({ fortunes, count: fortunes.length });
});

// GET /api/fortune/:id -> returns specific fortune by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const fortune = fortunes.find(f => f.id === id);

    if (!fortune) {
        return res.status(404).json({ error: "Fortune not found" });
    }

    res.json({ fortune });
});

// POST /api/fortune -> add new fortune
router.post("/", (req, res) => {
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
});

// PUT /api/fortune/:id -> update existing fortune
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Fortune text is required" });
    }

    const fortune = fortunes.find(f => f.id === id);

    if (!fortune) {
        return res.status(404).json({ error: "Fortune not found" });
    }

    fortune.text = text.trim();
    res.json({ message: "Fortune updated", fortune });
});

// DELETE /api/fortune/:id -> delete fortune
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = fortunes.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Fortune not found" });
    }

    const deleted = fortunes.splice(index, 1)[0];
    res.json({ message: "Fortune deleted", fortune: deleted });
});

module.exports = router;

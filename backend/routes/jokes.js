const express = require("express");
const router = express.Router();

// Data pool with IDs for CRUD operations
let jokes = [
    { id: 1, text: "Why did the developer go broke? Because they used up all their cache." },
    { id: 2, text: "My code has two moods: works or why-is-this-happening." },
    { id: 3, text: "I told my program a joke... it just threw an exception." },
];

let nextId = 4; // Auto-increment ID

// GET /api/joke -> returns one random joke
router.get("/", (req, res) => {
    const pick = jokes[Math.floor(Math.random() * jokes.length)];
    res.json({ joke: pick.text });
});

// GET /api/joke/all -> returns all jokes
router.get("/all", (req, res) => {
    res.json({ jokes, count: jokes.length });
});

// GET /api/joke/:id -> returns specific joke by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const joke = jokes.find(j => j.id === id);

    if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
    }

    res.json({ joke });
});

// POST /api/joke -> add new joke
router.post("/", (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Joke text is required" });
    }

    const newJoke = {
        id: nextId++,
        text: text.trim()
    };

    jokes.push(newJoke);
    res.status(201).json({ message: "Joke added", joke: newJoke });
});

// PUT /api/joke/:id -> update existing joke
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Joke text is required" });
    }

    const joke = jokes.find(j => j.id === id);

    if (!joke) {
        return res.status(404).json({ error: "Joke not found" });
    }

    joke.text = text.trim();
    res.json({ message: "Joke updated", joke });
});

// DELETE /api/joke/:id -> delete joke
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = jokes.findIndex(j => j.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Joke not found" });
    }

    const deleted = jokes.splice(index, 1)[0];
    res.json({ message: "Joke deleted", joke: deleted });
});

module.exports = router;

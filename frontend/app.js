// This file controls the buttons.
// Each button calls the backend API and prints the result on screen.

const out = document.getElementById("out");

// If your backend runs locally, keep this.
const API_BASE = "http://localhost:3000";

let lastOutput = null; // Store last output for sharing

function show(obj) {
    lastOutput = obj;
    out.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

async function getJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
}

async function postJSON(url, body) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
}

async function putJSON(url, body) {
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
}

async function deleteJSON(url) {
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
}

// ========== Main Buttons ==========

document.getElementById("btnFortune").addEventListener("click", async () => {
    try {
        const data = await getJSON(`${API_BASE}/api/fortune`);
        show(data);
    } catch (error) {
        show({ error: "Failed to fetch fortune", details: error.message });
    }
});

document.getElementById("btnJoke").addEventListener("click", async () => {
    try {
        const data = await getJSON(`${API_BASE}/api/joke`);
        show(data);
    } catch (error) {
        show({ error: "Failed to fetch joke", details: error.message });
    }
});

document.querySelectorAll(".btnMood").forEach(btn => {
    btn.addEventListener("click", async () => {
        try {
            const mood = btn.dataset.mood;
            const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
            show(data);
        } catch (error) {
            show({ error: "Failed to fetch vibe", details: error.message });
        }
    });
});

document.getElementById("btnSmash").addEventListener("click", async () => {
    try {
        const btn = document.getElementById("btnSmash");
        btn.disabled = true;
        btn.textContent = "SMASHING...";

        const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        show({
            message: "💥 SMASH ACTIVATED! 💥",
            timestamp: new Date().toLocaleTimeString(),
            smashCount: data.smashes || 1,
            ...data
        });

        btn.classList.add("smash-effect");
        setTimeout(() => btn.classList.remove("smash-effect"), 500);

    } catch (error) {
        show({ error: "Smash failed!", details: error.message });
    } finally {
        const btn = document.getElementById("btnSmash");
        btn.disabled = false;
        btn.textContent = "💥 SMASH!";
    }
});

// ========== Secret Code with Input ==========

document.getElementById("btnSecret").addEventListener("click", async () => {
    try {
        const code = document.getElementById("secretInput").value.trim();
        if (!code) {
            show({ error: "Please enter a secret code!" });
            return;
        }
        const data = await getJSON(`${API_BASE}/api/secret?code=${encodeURIComponent(code)}`);
        show(data);
    } catch (error) {
        show({ error: "Failed to unlock secret", details: error.message });
    }
});

// Allow Enter key in secret input
document.getElementById("secretInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.getElementById("btnSecret").click();
    }
});

// ========== Share Button ==========

document.getElementById("btnShare").addEventListener("click", () => {
    if (!lastOutput) {
        alert("No content to share yet!");
        return;
    }

    const text = typeof lastOutput === "string"
        ? lastOutput
        : JSON.stringify(lastOutput, null, 2);

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById("btnShare");
        const originalText = btn.textContent;
        btn.textContent = "✓ Copied!";
        setTimeout(() => btn.textContent = originalText, 2000);
    }).catch(() => {
        alert("Failed to copy to clipboard");
    });
});

// ========== Dark Mode Toggle ==========

document.getElementById("btnDarkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.getElementById("btnDarkMode").textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("btnDarkMode").textContent = "☀️";
}

// ========== Admin Panel Toggle ==========

document.getElementById("btnToggleAdmin").addEventListener("click", () => {
    const panel = document.getElementById("adminPanel");
    panel.classList.toggle("hidden");
    const btn = document.getElementById("btnToggleAdmin");
    btn.textContent = panel.classList.contains("hidden") ? "⚙️ Admin Panel" : "✖ Close Admin";
});

// ========== Fortune CRUD ==========

document.getElementById("btnAddFortune").addEventListener("click", async () => {
    try {
        const text = document.getElementById("fortuneInput").value.trim();
        if (!text) {
            alert("Please enter fortune text");
            return;
        }
        const data = await postJSON(`${API_BASE}/api/fortune`, { text });
        show(data);
        document.getElementById("fortuneInput").value = "";
        loadFortunes();
    } catch (error) {
        show({ error: "Failed to add fortune", details: error.message });
    }
});

document.getElementById("btnLoadFortunes").addEventListener("click", loadFortunes);

async function loadFortunes() {
    try {
        const data = await getJSON(`${API_BASE}/api/fortune/all`);
        const list = document.getElementById("fortuneList");
        list.innerHTML = "";

        data.fortunes.forEach(fortune => {
            const item = document.createElement("div");
            item.className = "list-item";
            item.innerHTML = `
                <span class="item-text">${fortune.text}</span>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editFortune(${fortune.id}, '${fortune.text.replace(/'/g, "\\'")}')">Edit</button>
                    <button class="btn-delete" onclick="deleteFortune(${fortune.id})">Delete</button>
                </div>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        show({ error: "Failed to load fortunes", details: error.message });
    }
}

async function editFortune(id, currentText) {
    const newText = prompt("Edit fortune:", currentText);
    if (!newText || newText === currentText) return;

    try {
        const data = await putJSON(`${API_BASE}/api/fortune/${id}`, { text: newText });
        show(data);
        loadFortunes();
    } catch (error) {
        show({ error: "Failed to update fortune", details: error.message });
    }
}

async function deleteFortune(id) {
    if (!confirm("Delete this fortune?")) return;

    try {
        const data = await deleteJSON(`${API_BASE}/api/fortune/${id}`);
        show(data);
        loadFortunes();
    } catch (error) {
        show({ error: "Failed to delete fortune", details: error.message });
    }
}

// ========== Joke CRUD ==========

document.getElementById("btnAddJoke").addEventListener("click", async () => {
    try {
        const text = document.getElementById("jokeInput").value.trim();
        if (!text) {
            alert("Please enter joke text");
            return;
        }
        const data = await postJSON(`${API_BASE}/api/joke`, { text });
        show(data);
        document.getElementById("jokeInput").value = "";
        loadJokes();
    } catch (error) {
        show({ error: "Failed to add joke", details: error.message });
    }
});

document.getElementById("btnLoadJokes").addEventListener("click", loadJokes);

async function loadJokes() {
    try {
        const data = await getJSON(`${API_BASE}/api/joke/all`);
        const list = document.getElementById("jokeList");
        list.innerHTML = "";

        data.jokes.forEach(joke => {
            const item = document.createElement("div");
            item.className = "list-item";
            item.innerHTML = `
                <span class="item-text">${joke.text}</span>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editJoke(${joke.id}, '${joke.text.replace(/'/g, "\\'")}')">Edit</button>
                    <button class="btn-delete" onclick="deleteJoke(${joke.id})">Delete</button>
                </div>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        show({ error: "Failed to load jokes", details: error.message });
    }
}

async function editJoke(id, currentText) {
    const newText = prompt("Edit joke:", currentText);
    if (!newText || newText === currentText) return;

    try {
        const data = await putJSON(`${API_BASE}/api/joke/${id}`, { text: newText });
        show(data);
        loadJokes();
    } catch (error) {
        show({ error: "Failed to update joke", details: error.message });
    }
}

async function deleteJoke(id) {
    if (!confirm("Delete this joke?")) return;

    try {
        const data = await deleteJSON(`${API_BASE}/api/joke/${id}`);
        show(data);
        loadJokes();
    } catch (error) {
        show({ error: "Failed to delete joke", details: error.message });
    }
}

// ========== Vibe CRUD ==========

document.getElementById("btnAddVibe").addEventListener("click", async () => {
    try {
        const mood = document.getElementById("vibeMood").value.trim();
        const emoji = document.getElementById("vibeEmoji").value.trim();
        const message = document.getElementById("vibeMessage").value.trim();

        if (!mood || !emoji || !message) {
            alert("Please fill all vibe fields");
            return;
        }

        const data = await postJSON(`${API_BASE}/api/vibe`, { mood, emoji, message });
        show(data);
        document.getElementById("vibeMood").value = "";
        document.getElementById("vibeEmoji").value = "";
        document.getElementById("vibeMessage").value = "";
        loadVibes();
    } catch (error) {
        show({ error: "Failed to add vibe", details: error.message });
    }
});

document.getElementById("btnLoadVibes").addEventListener("click", loadVibes);

async function loadVibes() {
    try {
        const data = await getJSON(`${API_BASE}/api/vibe/all`);
        const list = document.getElementById("vibeList");
        list.innerHTML = "";

        data.vibes.forEach(vibe => {
            const item = document.createElement("div");
            item.className = "list-item";
            item.innerHTML = `
                <span class="item-text">${vibe.emoji} <strong>${vibe.mood}</strong>: ${vibe.message}</span>
                <div class="item-actions">
                    <button class="btn-delete" onclick="deleteVibe('${vibe.mood}')">Delete</button>
                </div>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        show({ error: "Failed to load vibes", details: error.message });
    }
}

async function deleteVibe(mood) {
    if (!confirm(`Delete vibe "${mood}"?`)) return;

    try {
        const data = await deleteJSON(`${API_BASE}/api/vibe/${mood}`);
        show(data);
        loadVibes();
    } catch (error) {
        show({ error: "Failed to delete vibe", details: error.message });
    }
}

// Make functions global for inline onclick handlers
window.editFortune = editFortune;
window.deleteFortune = deleteFortune;
window.editJoke = editJoke;
window.deleteJoke = deleteJoke;
window.deleteVibe = deleteVibe;
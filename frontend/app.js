// This file controls the buttons.
// Each button calls the backend API and prints the result on screen.

const out = document.getElementById("out");

// If your backend runs locally, keep this.
const API_BASE = "http://localhost:3000";

function show(obj) {
    out.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

async function getJSON(url) {
    const res = await fetch(url);
    return res.json();
}

document.getElementById("btnFortune").addEventListener("click", async () => {
    const data = await getJSON(`${API_BASE}/api/fortune`);
    show(data);
});

document.getElementById("btnJoke").addEventListener("click", async () => {
    const data = await getJSON(`${API_BASE}/api/joke`);
    show(data);
});

document.querySelectorAll(".btnMood").forEach(btn => {
    btn.addEventListener("click", async () => {
        const mood = btn.dataset.mood;
        const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
        show(data);
    });
});

document.getElementById("btnSmash").addEventListener("click", async () => {
    try {
        // Add visual feedback
        const btn = document.getElementById("btnSmash");
        btn.disabled = true;
        btn.textContent = "SMASHING...";

        const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Add more dramatic feedback
        show({ 
            message: "💥 SMASH ACTIVATED! 💥", 
            timestamp: new Date().toLocaleTimeString(),
            smashCount: data.count || 1,
            ...data 
        });

        // Optional: Add animation or sound effect
        btn.classList.add("smash-effect");
        setTimeout(() => btn.classList.remove("smash-effect"), 500);

    } catch (error) {
        show({ error: "Smash failed!", details: error.message });
    } finally {
        // Reset button
        const btn = document.getElementById("btnSmash");
        btn.disabled = false;
        btn.textContent = "SMASH";
    }
});

document.getElementById("btnSecret").addEventListener("click", async () => {
    const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
    show(data);
});
function attemptLogin() {
    const user = document.getElementById('sys-user').value; // Puzzle 8 answer: ALPH-X1
    const pass = document.getElementById('sys-pass').value; // Puzzle 6 answer: OMEG-A9

    // Combining puzzle answers
    if (user === 'ALPH-X1' && pass === 'OMEG-A9') {
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert("ACCESS DENIED: INCOMPATIBLE CREDENTIALS");
    }
}

// Puzzle 9: Database Search (Missing logic added)
function searchDatabase() {
    const query = document.getElementById('search-q').value;
    const res = document.getElementById('search-res');

    // Lore entries
    if (query === '89') {
        res.innerHTML = `
            <div style="border: 1px solid red; padding: 10px; margin-top: 10px; background: #220000;">
                <h3>SUBJECT 89 (ORIGINAL)</h3>
                <p><strong>Status:</strong> ESCAPED to Surface.</p>
                <p><strong>Notes:</strong> Subject breached the surface door using override code <strong style="color:yellow">89-FREEDOM</strong>.</p>
                <p><strong>Action:</strong> Terminate on sight. Do not engage in conversation.</p>
            </div>
        `;
    } else if (query === '492') {
        res.innerHTML = `
            <div style="border: 1px solid #ff3333; padding: 10px; margin-top: 10px;">
                <h3>SUBJECT 492 (CLONE)</h3>
                <p><strong>Status:</strong> ACTIVE - Intranet Admin.</p>
                <p><strong>Notes:</strong> Unaware of original identity. docile.</p>
            </div>
        `;
    } else {
        res.innerHTML = "<p style='color:grey'>NO RECORDS FOUND OR ACCESS RESTRICTED.</p>";
    }
}

// Puzzle 8: Power Routing
let powerState = {
    main: true,
    backup: false,
    door: false,
    lifeSupport: true
};

function togglePower(line) {
    if (line === 'backup') {
        powerState.backup = !powerState.backup;
        const btn = document.getElementById('btn-backup');
        if (btn) {
            btn.innerText = powerState.backup ? "DISABLE BACKUP" : "ENABLE BACKUP";
            btn.style.background = powerState.backup ? "#ff3333" : "#330000";
        }
    }
    if (line === 'lifeSupport') {
        powerState.lifeSupport = !powerState.lifeSupport;
        const btn = document.getElementById('btn-life');
        if (btn) {
            btn.innerText = powerState.lifeSupport ? "DISABLE LIFE SUPPORT" : "ENABLE LIFE SUPPORT";
            btn.style.background = powerState.lifeSupport ? "#ff3333" : "#330000";
        }
    }
    checkPower();
}

function checkPower() {
    const doorStatus = document.getElementById('door-status');
    const doorModule = document.getElementById('door-module');
    const overrideSection = document.getElementById('override-section');

    if (!doorStatus || !doorModule) return;

    // Logic: To power the massive door, we need MAIN + BACKUP. 
    // BUT the system overloads if Life Support is also on.
    // So: Main (Always On) + Backup (On) + Life Support (Off) = Door Online.

    if (powerState.main && powerState.backup && !powerState.lifeSupport) {
        powerState.door = true;
        doorStatus.innerHTML = "<span style='color:#0f0'>ONLINE</span> (POWER SUFFICIENT)";
        doorModule.style.borderColor = "#0f0";
        doorModule.style.opacity = "1";
        if (overrideSection) overrideSection.style.display = 'block';
    } else {
        powerState.door = false;
        doorStatus.innerHTML = "<span style='color:red'>OFFLINE</span> (INSUFFICIENT POWER)";
        doorModule.style.borderColor = "#550000";
        doorModule.style.opacity = "0.5";
        if (overrideSection) overrideSection.style.display = 'none';

        if (powerState.main && powerState.backup && powerState.lifeSupport) {
            doorStatus.innerHTML += " <br><span style='font-size:0.8em; color:yellow'>WARNING: GRID OVERLOAD. DIVERT AUXILIARY POWER.</span>";
        }
    }
}

function executeOverride() {
    // Requires Puzzle 9: Subject 89 Code
    const code = document.getElementById('override-code').value;
    if (code === "89-FREEDOM") {
        triggerFinale();
    } else {
        alert("ERROR: INVALID OVERRIDE SEQUENCE");
    }
}

function triggerFinale() {
    const overlay = document.getElementById('finale-overlay');
    overlay.style.display = 'flex';

    // Simulate door opening sequence
    const messages = [
        "INITIATING EMERGENCY OVERRIDE...",
        "HYDRAULIC SEALS: DISENGAGED",
        "ATMOSPHERE CHECK: BREATHABLE (O2: 21%)",
        "OPENING MAIN DOOR...",
        "WARNING: BIOLOGICAL ENTITY DETECTED",
        "WELCOME TO THE JUNGLE."
    ];

    let i = 0;
    // Clear previous content
    overlay.innerHTML = "";

    // Create a container for text
    const textContainer = document.createElement('div');
    overlay.appendChild(textContainer);

    const interval = setInterval(() => {
        if (i < messages.length) {
            textContainer.innerHTML += messages[i] + "<br>";
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                overlay.style.transition = "background 3s";
                overlay.style.background = "white";
                textContainer.style.color = "black";
                textContainer.innerHTML = "<h1 style='font-size: 4em'>FIN</h1>";
            }, 2000);
        }
    }, 1500);
}

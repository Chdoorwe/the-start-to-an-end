document.addEventListener('DOMContentLoaded', () => {
    initCanvas();

    // Also init sliders default
    updateImage();
});

function initCanvas() {
    const canvas = document.getElementById('hidden-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Fill with very dark noise
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            // Random value between 0 and 10
            const val = Math.floor(Math.random() * 10);
            ctx.fillStyle = `rgb(${val},${val},${val})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    // Draw text with slightly brighter color (e.g., 20)
    // It will be invisible against the noise normally, but 
    // with high brightness/contrast it should pop.
    ctx.font = '30px Courier New';
    ctx.fillStyle = 'rgb(18, 18, 18)';
    ctx.fillText("ADMIN PASS PART 2:", 50, 100);
    ctx.fillText("OMEG-A9", 50, 150);
}

// Frequency Tuner Logic
function checkFrequency(val) {
    const display = document.getElementById('freq-display');
    const output = document.getElementById('audio-output');
    if (display) display.innerText = val + ' Hz';

    // Puzzle 4 Solutions
    if (Math.abs(val - 440) < 15) {
        output.innerText = "SIGNAL DECODED: 'They are... breeding them...'";
        output.style.color = "#ffff00";
    } else if (Math.abs(val - 880) < 15) {
        output.innerText = "SIGNAL DECODED: 'CRITICAL ALERT: SUBJECT 89 HAS ESCAPED...'";
        output.style.color = "#ffff00";
    } else if (Math.abs(val - 1200) < 15) {
        output.innerText = "SIGNAL DECODED: 'OMEGA PASS: ...wait for visual confirm...'";
        output.style.color = "#ffff00";
    } else {
        output.innerText = "Scanning... Static...";
        output.style.color = "#555";
    }
}

// Image Manipulation Logic
function updateImage() {
    const brightness = document.getElementById('bright').value;
    const contrast = document.getElementById('cont').value;
    const canvas = document.getElementById('hidden-canvas'); // Puzzle 6 Target

    if (canvas) {
        // We use CSS filter to check visual
        canvas.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

        // Puzzle 6 Solved State check (visual only for user, but we can display text)
        if (brightness > 150 && contrast > 150) {
            const status = document.getElementById('img-status');
            if (status) status.innerText = "VISUAL RESTORED. DATA READABLE.";
        }
    }
}

// Drag & Drop Logic for Document (Puzzle 5)
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    // Calculate offset
    const rect = draggedItem.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.dataTransfer.setData('text/plain', x + ',' + y);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const offset = event.dataTransfer.getData('text/plain').split(',');
    const dropZone = document.getElementById('drop-zone');

    // Position relative to drop zone
    const dropRect = dropZone.getBoundingClientRect();
    const x = event.clientX - dropRect.left - parseInt(offset[0]);
    const y = event.clientY - dropRect.top - parseInt(offset[1]);

    if (draggedItem) {
        draggedItem.style.left = x + 'px';
        draggedItem.style.top = y + 'px';
    }

    // Check rudimentary puzzle completion (based on positions)
    checkDocumentAssembly();
}

function checkDocumentAssembly() {
    // Simple check: are all 3 pieces roughly in order?
    // In a real app, logic would be tighter.
    // For this ARG, we just assume if they moved them, they can read it.
    // The text on the scraps reveals the IP for Site 3.
}

// TERMINAL LOGIC
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('terminal-output');

if (termInput) {
    termInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim().toLowerCase();
            termInput.value = '';
            processCommand(cmd);
        }
    });
}

function processCommand(cmd) {
    printTerm(`> ${cmd}`);

    if (cmd === 'help') {
        printTerm("AVAILABLE COMMANDS: HELP, LIST, READ [FILE], CLEAR");
    } else if (cmd === 'list' || cmd === 'ls') {
        printTerm("FILES FOUND:");
        printTerm("- manifesto.txt");
        printTerm("- server_link.enc");
        printTerm("- subject_89.log");
    } else if (cmd.startsWith('read ')) {
        const file = cmd.split(' ')[1];
        if (file === 'manifesto.txt') {
            printTerm("We are the Echo. We are the voice of the voiceless. Chronos falls today.");
        } else if (file === 'server_link.enc') {
            printTerm("DECRYPTING... SUCCESS.");
            printTerm("TARGET: ../systems/systems.html");
        } else if (file === 'subject_89.log') {
            printTerm("LOG: He is too strong. The audio dampeners (440Hz) are failing.");
        } else {
            printTerm("ERROR: FILE NOT FOUND");
        }
    } else if (cmd === 'clear') {
        termOutput.innerHTML = '';
    } else {
        printTerm("UNKNOWN COMMAND");
    }
}

function printTerm(text) {
    termOutput.innerHTML += `<div>${text}</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;
}

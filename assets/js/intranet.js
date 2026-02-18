document.addEventListener('DOMContentLoaded', () => {
    // Puzzle 1: Glitch Trigger
    const safetyLogo = document.getElementById('safety-logo');
    let clickCount = 0;

    if (safetyLogo) {
        safetyLogo.addEventListener('click', () => {
            clickCount++;

            // Visual Feedback: Flash red
            safetyLogo.style.transform = `scale(${1 + (clickCount * 0.05)})`;
            safetyLogo.style.borderColor = 'red';
            setTimeout(() => {
                safetyLogo.style.transform = 'scale(1)';
                safetyLogo.style.borderColor = '#ddd';
            }, 200);

            if (clickCount >= 5) {
                clickCount = 0; // Reset to prevent double firing
                triggerSystemError();
            }
        });
    }

    // Puzzle 3 Trigger: Secret Keypad Entry
    // REMOVED: Conflicted with Firmware Date input. 
    // Now purely driven by the Safety Logo -> Firmware Prompt flow.
});

function triggerSystemError() {
    // Create custom error modal
    const errorOverlay = document.createElement('div');
    errorOverlay.id = 'error-overlay';
    errorOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9); color: red;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 2000; font-family: monospace; text-align: center;
    `;

    errorOverlay.innerHTML = `
        <div style="position: absolute; top: 10px; right: 10px;">
            <button onclick="document.getElementById('error-overlay').remove()" style="background: red; color: black; border: 1px solid red; font-family: monospace; cursor: pointer; padding: 5px;">[X] ABORT DEBUG</button>
        </div>
        <h1 style="border-bottom: 2px solid red;">SYSTEM ERROR 0x892</h1>
        <p>SIGNAL DETECTED</p>
        <p id="binary-msg">01010011 01000101 01000101 01001011 00100000 01010100 01001000 01000101 00100000 01000101 01000011 01001000 01001111</p>
        <div id="firmware-prompt" style="display:none; margin-top: 20px;">
            <p>DEBUG MODE ACTIVE. ENTER FIRMWARE DATE (MMDDYY):</p>
            <input type="text" id="firmware-input" style="background: black; color: red; border: 1px solid red; padding: 5px;">
            <button onclick="checkFirmware()" style="background: red; color: black; border: none; padding: 5px 10px; cursor: pointer;">VERIFY</button>
        </div>
    `;

    document.body.appendChild(errorOverlay);

    // Animate "decoding" - REMOVED per user request. Player must decode.
    setTimeout(() => {
        // Just show the prompt after a delay
        const promptDiv = document.getElementById('firmware-prompt');
        promptDiv.style.display = 'block';

        // Add Enter key support
        const input = document.getElementById('firmware-input');
        input.focus();
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkFirmware();
        });
    }, 2000);

    window.checkFirmware = function () {
        const input = document.getElementById('firmware-input').value;
        if (input === '102377') {
            // Redirect to new dedicated page
            window.location.href = 'uplink.html';
        } else {
            alert("INCORRECT DATE");
        }
    };
}

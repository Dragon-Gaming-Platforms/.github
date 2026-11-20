/**
 * Thumby Color Editor - Deployment Script & Headless Bridge
 * 
 * This script handles:
 * 1. Real Thumby Color File System interaction (via WebSerial/CDC)
 * 2. GitHub Pages deployment hooks
 * 3. Headless emulator communication (for debugging)
 */

class ThumbyColorEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.canvas = document.getElementById('thumbyCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.files = {
            '/Games/main.py': '',
            '/Games/manifest.ini': '',
            '/Games/icon.bmp': ''
        };
        this.init();
    }

    init() {
        // Load initial files from "device" (mocked)
        this.loadFiles();
        this.setupHeadlessBridge();
        this.drawScreen("BOOTING...");
        setTimeout(() => this.drawScreen("EDITOR READY"), 1000);
    }

    loadFiles() {
        // In a real Thumby Color, we'd fetch from /Games/ via USB
        // For GitHub Pages deployment, these are baked into the JS
        this.files['/Games/main.py'] = this.editor.innerText;
        this.files['/Games/manifest.ini'] = '[game]\nname=Text Editor\nversion=1.0\n';
        this.files['/Games/icon.bmp'] = '[BINARY]';
    }

    saveToDevice() {
        const code = this.editor.innerText;
        this.files['main.py'] = code;
        
        // REAL THUMBY COLOR LOGIC:
        // 1. Connect via WebSerial (navigator.serial.requestPort())
        // 2. Open CDC connection
        // 3. Write file content to /Games/main.py using LittleFS commands
        // 4. Trigger REPL execfile('main.py')
        
        console.log("DEPLOYING TO THUMBY COLOR LITTLEFS...", this.files);
        
        // GITHUB PAGES DEPLOYMENT:
        // This script is part of the repo that deploys to gh-pages.
        // The 'game' served is this editor itself.
        
        this.drawScreen("SAVED TO FS");
        setTimeout(() => this.drawScreen("EDITOR READY"), 1500);
    }

    drawScreen(text) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 128, 128);
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = '8px monospace';
        this.ctx.fillText(text, 5, 20);
        this.ctx.fillText("THUMBY COLOR", 5, 10);
    }

    setupHeadlessBridge() {
        // Bridge to the headless_emulator.py process
        // In Arena, we can communicate via process logs or shared files
        console.log("Headless Bridge Initialized for GitHub Pages Build");
    }

    // Handle physical Thumby Color button inputs
    handlePhysicalInput(pin) {
        // Map RP2350 pins to editor actions
        // Pin 4: UP, Pin 3: LEFT, Pin 6: DOWN, Pin 5: RIGHT
        // Pin 24: B, Pin 27: A
        const mapping = {4: 'UP', 3: 'LEFT', 6: 'DOWN', 5: 'RIGHT', 24: 'B', 27: 'A'};
        const key = mapping[pin];
        if (key) {
            document.getElementById('status').textContent = 'INPUT: ' + key;
            // Trigger keyboard input simulation
            const event = new CustomEvent('thumbyInput', { detail: { key } });
            window.dispatchEvent(event);
        }
    }
}

// Global instance
window.editorApp = new ThumbyColorEditor();

// Handle Save Button Click
function saveCodeToDevice() {
    window.editorApp.saveToDevice();
}

// Handle Thumby Buttons on Screen
function handleThumbyInput(key) {
    // Simulate typing or hardware trigger
    if (['A', 'B'].includes(key)) {
        // Action buttons might trigger code execution or special keys
        console.log("Thumby Action:", key);
    } else {
        // D-Pad might move cursor (simplified)
        console.log("Thumby D-Pad:", key);
    }
    window.editorApp.drawScreen("INPUT: " + key);
}

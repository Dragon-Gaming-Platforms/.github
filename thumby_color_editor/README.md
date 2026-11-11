# Thumby Color Text Editor (MicroPython)

This repository contains a prototype Text Editor for the **Thumby Color** (RP2350 based) designed to run **on the Thumby Color device itself** using MicroPython, while being developed and debugged in this repo.

## Features
- **On-Screen Keyboard**: Built specifically for the 128x128 Thumby Color display.
- **MicroPython Integration**: Uses `thumby`, `thumbyGraphics`, `thumbyButton` APIs.
- **Headless Emulator Debugging**: Integrates with a headless version of the Thumby Color emulator (based on the TinyCircuits Web IDE `rp2040js` logic) for testing code without hardware.
- **Code Editing**: Simple text area with syntax highlighting (prototype).

## Project Structure
```
.github/thumby_color_editor/
├── index.html          # Main UI and On-Screen Keyboard
├── style.css           # Thumby Color themed styling
├── script.js           # Editor logic and API bridge
├── headless_emulator.py # Headless debugging script (Python)
└── README.md           # Documentation
```

## How to Use
1. **On Device**: The code in `index.html`'s editor area is designed to be compiled into a `.py` file and uploaded to the Thumby Color `Games/` directory.
2. **On Screen Keyboard**: Use the grid at the bottom of the UI to input code. Keys map to Thumby Color buttons (A, B, D-Pad) and standard characters.
3. **Debugging**: Run `python3 headless_emulator.py` and pipe the editor's JSON commands to it to simulate the Thumby Color display and REPL in a headless environment.

## Thumby Color APIs Used
- `thumbyGraphics.display`: For rendering the editor UI and text on the 128x128 screen.
- `thumbyButton`: For capturing D-Pad and A/B button presses to navigate the editor.
- `thumbySaves`: For persisting code on the device's LittleFS.
- `thumbyHardware`: For managing screen brightness and vibration feedback.

## Development Notes
- The editor UI (`index.html`) is a web-based prototype that mimics the Thumby Color screen layout (128x128).
- The **Headless Emulator** (`headless_emulator.py`) is a bridge to the `rp2040js` emulator logic found in the [TinyCircuits Thumby Code Editor](https://github.com/TinyCircuits/TinyCircuits-Thumby-Code-Editor) repository.
- Migration to a separate repo will occur once the core MicroPython editor logic is stabilized.

## License
MIT (as part of Dragon-Gaming-Platforms/.github)

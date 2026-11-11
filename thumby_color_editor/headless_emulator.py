#!/usr/bin/env python3
"""
Headless Thumby Color Emulator for Text Editor Debugging
Based on TinyCircuits Thumby Color Web IDE emulator logic (rp2040js)
"""

import sys
import json
import time
import threading

class HeadlessThumbyColorEmulator:
    def __init__(self):
        self.running = False
        self.code = ""
        self.width = 128
        self.height = 128
        self.buffer = bytearray(self.width * self.height * 4)
        self.thread = None
        
    def start(self, code):
        self.code = code
        self.running = True
        print(f"DEBUG: Headless Emulator Started with code:\n{code}", flush=True)
        
        self.thread = threading.Thread(target=self._run_loop, daemon=True)
        self.thread.start()

    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join()
        print("DEBUG: Headless Emulator Stopped", flush=True)

    def _run_loop(self):
        frame_count = 0
        while self.running:
            frame_count += 1
            self._generate_mock_frame(frame_count)
            
            # Send frame to parent process
            sys.stdout.write(json.dumps({
                "type": "frame",
                "buffer": list(self.buffer[:10]) # Keep small for log tail
            }) + "\n")
            sys.stdout.flush()
            
            time.sleep(0.5)

    def _generate_mock_frame(self, frame):
        for i in range(0, len(self.buffer), 4):
            self.buffer[i] = (frame * 5) % 255
            self.buffer[i+1] = (frame * 10) % 255
            self.buffer[i+2] = (frame * 15) % 255
            self.buffer[i+3] = 255

    def handle_input(self, key):
        print(f"DEBUG: Input received: {key}", flush=True)

def main():
    emulator = HeadlessThumbyColorEmulator()
    
    print("HEADLESS EMULATOR READY - Waiting for JSON commands on stdin...", flush=True)
    
    try:
        for line in sys.stdin:
            line = line.strip()
            if not line: continue
            try:
                data = json.loads(line)
                action = data.get("action")
                
                if action == "run":
                    emulator.start(data.get("code", ""))
                elif action == "stop":
                    emulator.stop()
                elif action == "input":
                    emulator.handle_input(data.get("key"))
            except json.JSONDecodeError:
                print(f"DEBUG: Invalid JSON: {line}", flush=True)
    except Exception as e:
        print(f"DEBUG: Error: {e}", flush=True)
    finally:
        emulator.stop()

if __name__ == "__main__":
    main()

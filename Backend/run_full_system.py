import subprocess
import time
import sys
import os

def run_full_system():
    print("[System] Starting Driver Safety System...")

    # 1. Start Backend (Server + Watchdog)
    print("[System] Launching Backend (FastAPI + Watchdog)...")
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload"],
        cwd=os.getcwd(),
        # stdout=subprocess.PIPE, # Uncomment to hide backend logs
        # stderr=subprocess.PIPE
    )
    
    # Wait for backend to start
    time.sleep(5)
    print("[System] Backend is running.")

    # 2. Start Simulation (Client)
    # Note: Since simulate_device.py is interactive, we launch it in a new terminal window
    # so the user can interact with it.
    print("[System] Launching Simulation (Client App)...")
    
    if os.name == 'nt': # Windows
        subprocess.Popen(["start", "cmd", "/k", sys.executable, "simulate_device.py"], shell=True)
    else: # Mac/Linux
        # This is a best-effort guess for common terminals
        try:
            subprocess.Popen(["x-terminal-emulator", "-e", f"{sys.executable} simulate_device.py"])
        except:
            print("[Error] Could not open new terminal automatically. Please run 'python simulate_device.py' manually.")

    print("\n[System] System is fully operational!")
    print("backend_process PID:", backend_process.pid)
    
    try:
        backend_process.wait()
    except KeyboardInterrupt:
        print("\n[System] Stopping System...")
        backend_process.terminate()

if __name__ == "__main__":
    run_full_system()

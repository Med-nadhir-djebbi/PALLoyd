import subprocess
import time
import sys
import os

def run_full_system():
    print("[System] Starting Driver Safety System...")


    print("[System] Launching Backend (FastAPI + Watchdog)...")
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload"],
        cwd=os.getcwd(),


    )
    

    time.sleep(5)
    print("[System] Backend is running.")




    print("[System] Launching Simulation (Client App)...")
    
    if os.name == 'nt':
        subprocess.Popen(["start", "cmd", "/k", sys.executable, "simulate_device.py"], shell=True)
    else:

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

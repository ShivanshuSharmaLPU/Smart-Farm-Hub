@echo off
TITLE Smart Crop Advisory - Setup & Run

echo ===================================================
echo     SMART CROP ADVISORY SYSTEM - AUTO SETUP
echo ===================================================

echo.
echo [1/3] Setting up Backend...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)
start "SCAS Rest API (Port 5000)" npm run dev
cd ..

echo.
echo [2/3] Setting up Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
start "SCAS Frontend (Port 5173)" npm run dev
cd ..

echo.
echo [3/3] Setting up ML Service...
cd ml_service
echo Note: Ensure Python and Pip are in your PATH.
echo Installing Python dependencies...
pip install -r requirements.txt
echo Training ML Models...
python train_models.py
start "SCAS ML Service (Port 5001)" python app.py
cd ..

echo.
echo ===================================================
echo     ALL SERVICES STARTED SUCCESSFULLY!
echo ===================================================
echo Backend:   http://localhost:5000
echo Frontend:  http://localhost:5173
echo ML Service: http://localhost:5001
echo.
echo Press any key to exit this launcher (Services will keep running in new windows).
pause

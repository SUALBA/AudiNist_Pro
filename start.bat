@echo off
title AuditNIST Pro

echo =========================================
echo  AuditNIST Pro
echo =========================================
echo.

REM ------------------------------------------------------------------
REM Install RAG dependencies (silent — only downloads what's missing)
REM ------------------------------------------------------------------
echo [1/3] Checking RAG dependencies...
pip install -r rag\requirements.txt --quiet --disable-pip-version-check
if %errorlevel% neq 0 (
    echo  WARNING: Some RAG dependencies may not have installed correctly.
    echo  Auto Document Analysis may be unavailable.
    echo.
)

REM ------------------------------------------------------------------
REM Start the local RAG server (port 8765) in the background
REM ------------------------------------------------------------------
echo [2/3] Starting RAG server on port 8765...
start /B python rag\server.py > nul 2>&1

REM Wait for the RAG server to initialise (model load takes ~3-5 s)
timeout /t 4 /nobreak > nul

REM ------------------------------------------------------------------
REM Start HTTP server and open browser
REM ------------------------------------------------------------------
echo [3/3] Starting HTTP server on port 8080...
start /B python -m http.server 8080 > nul 2>&1

timeout /t 2 /nobreak > nul

start http://localhost:8080/ui/auditnist-local.html

echo.
echo  App  : http://localhost:8080/ui/auditnist-local.html
echo  RAG  : http://localhost:8765/health
echo.
echo  Press any key to stop all servers and exit...
pause > nul

REM ------------------------------------------------------------------
REM Cleanup
REM ------------------------------------------------------------------
taskkill /F /IM python.exe > nul 2>&1
echo Servers stopped.

@echo off
rem Stemless launcher (Windows) - starts the app and opens it in your browser.
rem Close this window to stop the server.
title Stemless - Backing Track Studio
cd /d "%~dp0"

echo Starting Stemless at http://localhost:8000 ...
echo Close this window to stop the server.

start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:8000"

where py >nul 2>nul
if not errorlevel 1 (
  py -3 server.py 8000
  goto :done
)
where python >nul 2>nul
if not errorlevel 1 (
  python server.py 8000
  goto :done
)
where python3 >nul 2>nul
if not errorlevel 1 (
  python3 server.py 8000
  goto :done
)

echo.
echo Python was not found. Install Python 3 from https://www.python.org/downloads/
echo (tick "Add python.exe to PATH" during install), then double-click start.bat again.
echo.
pause

:done

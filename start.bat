@echo off
rem =====================================================================
rem  Sean Qi Xuan - Portfolio launcher
rem  Usage:
rem    double-click            start on port 8000 + open the browser
rem    start.bat 8080          use another port
rem    start.bat 8000 noopen   start the server only
rem =====================================================================
setlocal EnableExtensions
title Sean Qi Xuan Portfolio
cd /d "%~dp0"

set "PORT=8000"
if not "%~1"=="" set "PORT=%~1"

set "OPEN=1"
if /i "%~2"=="noopen" set "OPEN=0"

echo.
echo   Sean Qi Xuan - Portfolio
echo   ------------------------------------------
echo   Folder : %CD%
echo   Port   : %PORT%
echo.

rem ------------------------------------------------------------- Python
rem Verify the interpreter actually runs: on modern Windows "python" can be
rem a Microsoft Store stub, in which case fall back to the py launcher.
set "PY="
where python >nul 2>nul && python -c "import sys" >nul 2>nul && set "PY=python"
if not defined PY (
  where py >nul 2>nul && py -3 -c "import sys" >nul 2>nul && set "PY=py -3"
)
if not defined PY (
  echo [ERROR] Python was not found.
  echo         Install Python 3.9+ and tick "Add Python to PATH":
  echo         https://www.python.org/downloads/
  goto :fail
)

rem ------------------------------------------------------- Dependencies
%PY% -c "import fastapi, uvicorn" >nul 2>nul
if errorlevel 1 (
  echo [INFO] Missing packages: fastapi / uvicorn.
  choice /c YN /n /m "       Install them now? [Y=yes / N=quit] "
  if errorlevel 2 goto :fail
  echo.
  echo [SETUP] Installing dependencies, please wait...
  %PY% -m pip install --disable-pip-version-check fastapi uvicorn
  if errorlevel 1 (
    echo.
    echo [ERROR] Install failed. Run this manually:
    echo         %PY% -m pip install fastapi uvicorn
    goto :fail
  )
  echo.
)

rem ------------------------------------------------------ Port in use?
netstat -ano -p tcp | findstr /c:":%PORT%" | findstr /c:"LISTENING" >nul 2>nul
if not errorlevel 1 (
  echo [INFO] Port %PORT% is already listening - the server may be running.
  echo        Close the old window first if you want a fresh start.
  if "%OPEN%"=="1" start "" "http://127.0.0.1:%PORT%/"
  ping -n 4 127.0.0.1 >nul 2>&1
  exit /b 0
)

rem ---------------------------------------------------------- Browser
rem Open the page only after the server answers, so no blank tab appears.
if "%OPEN%"=="1" (
  start "" /b powershell -NoProfile -WindowStyle Hidden -Command "for($i=0;$i -lt 60;$i++){try{Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:%PORT%/' -TimeoutSec 1 | Out-Null; Start-Process 'http://127.0.0.1:%PORT%/'; break}catch{Start-Sleep -Milliseconds 250}}"
)

echo [START] http://127.0.0.1:%PORT%/
echo         Press Ctrl+C to stop.
echo.

%PY% main.py %PORT%

rem ------------------------------------------------------------ Wrap up
echo.
echo [STOPPED] Server exited.
pause
exit /b 0

:fail
echo.
pause
exit /b 1

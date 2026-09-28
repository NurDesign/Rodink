@echo off
REM Pulls the latest changes and opens the home page. Double-click to run.
cd /d "%~dp0"

echo Getting the latest changes...
echo.
git pull
if errorlevel 1 (
  echo.
  echo Could not pull. You may have local edits, or no internet.
  echo Nothing was changed. Opening the page you already have.
  echo.
  pause
)

echo.
echo Opening index.html
start "" "index.html"

@echo off
REM Pulls the latest changes and opens the home page. Double-click to run.
cd /d "%~dp0"

echo ============================================
echo   RodinK - getting the latest changes
echo ============================================
echo.
git pull
echo.

echo --------------------------------------------
echo  Latest change now in this folder:
echo --------------------------------------------
git log -1 --date=format:"%%d %%b %%H:%%M" --pretty=format:"  %%ad  -  %%s"
echo.
echo.
echo --------------------------------------------
echo  Opening index.html
echo.
echo  IMPORTANT: if the page looks unchanged, the
echo  browser reused an already-open tab. Click
echo  the tab and press Ctrl+R to reload it.
echo --------------------------------------------
echo.

start "" "index.html"

echo Closing in 8 seconds...
timeout /t 8 >nul

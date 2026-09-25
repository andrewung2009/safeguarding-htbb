@echo off
title HTBB Safeguarding - Production Build
echo Building HTBB Safeguarding...
wsl -e bash -c "cd '/mnt/c/Users/user/Desktop/HTBB Safeguarding/safeguarding-htbb' && npm run build"
echo.
echo Build complete. Output in dist\ - do NOT push yet.
pause

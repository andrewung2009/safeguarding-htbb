@echo off
title HTBB Safeguarding - Dev Server
echo Starting HTBB Safeguarding dev server via WSL...
wsl -e bash -c "cd '/mnt/c/Users/user/Desktop/HTBB Safeguarding/safeguarding-htbb' && npm run dev"
pause

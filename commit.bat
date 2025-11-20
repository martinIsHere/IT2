@echo off
echo Committing
set /p msg=Enter commit message:
git add Svelte
git commit -m "%msg%"

@echo off
echo ========================================
echo    FILIP BONAT - MIGRATION SCRIPT
echo ========================================
echo.

echo [1/6] Creating backup of current project...
if not exist "c:\Users\Lian Li\Filip-Bonat-WebApp-backup" (
    xcopy "c:\Users\Lian Li\Filip-Bonat-WebApp" "c:\Users\Lian Li\Filip-Bonat-WebApp-backup" /E /I /H /Y
    echo ✅ Backup created successfully
) else (
    echo ⚠️  Backup already exists, skipping...
)

echo.
echo [2/6] Removing current Git configuration...
cd "c:\Users\Lian Li\Filip-Bonat-WebApp"
git remote remove origin 2>nul
rmdir /s /q .git 2>nul
echo ✅ Git configuration removed

echo.
echo [3/6] Initializing new Git repository...
git init
echo ✅ New Git repository initialized

echo.
echo [4/6] Please create your new GitHub repository now:
echo    1. Go to https://github.com/new
echo    2. Repository name: filip-bonat-webapp-v2
echo    3. Description: Filip Bonat WebApp - Clean Repository
echo    4. Set as PRIVATE
echo    5. DO NOT initialize with README, .gitignore, or license
echo.
set repo_url=https://github.com/AlexDanielMotogna/filip_bonat_deploy.git
echo Using repository: %repo_url%

echo.
echo [5/6] Adding remote origin...
git remote add origin %repo_url%
echo ✅ Remote origin added: %repo_url%

echo.
echo [6/6] Preparing files for first commit...
echo Checking for sensitive files...

if exist ".env" (
    echo ❌ WARNING: .env file found - removing it
    del ".env"
)

if exist "servicesandcost.md" (
    echo ❌ WARNING: servicesandcost.md found - removing it
    del "servicesandcost.md"
)

echo ✅ Sensitive files check completed

echo.
echo ========================================
echo    READY FOR FIRST COMMIT
echo ========================================
echo.
echo Next steps:
echo 1. Review files: git status
echo 2. Add files: git add .
echo 3. Commit: git commit -m "🎉 Initial commit - Filip Bonat WebApp"
echo 4. Push: git push -u origin main
echo.
echo Or run: commit-and-push.bat
echo.
pause

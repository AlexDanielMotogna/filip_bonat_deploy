@echo off
echo ========================================
echo    COMMIT AND PUSH TO NEW REPO
echo ========================================
echo.

echo [1/4] Checking current status...
git status
echo.

echo [2/4] Adding all files...
git add .
echo ✅ All files added

echo.
echo [3/4] Creating initial commit...
git commit -m "🎉 Initial commit - Filip Bonat WebApp

✨ Features:
- Complete React + TypeScript frontend
- Node.js + Express backend with Prisma
- Email system with SendGrid integration
- File upload with Cloudinary
- Credit application system (KreditAnfrageModal)
- Damage reporting system (SchadenMeldungModal)
- Comprehensive form validation
- Vercel deployment configuration

🔒 Security:
- No exposed credentials
- Secure .env.example templates
- Comprehensive .gitignore
- Security audit documentation

📝 Documentation:
- Setup instructions
- Deployment guides
- Security guidelines
- API documentation

🚀 Ready for deployment with clean history"

if %errorlevel% equ 0 (
    echo ✅ Commit created successfully
) else (
    echo ❌ Error creating commit
    pause
    exit /b 1
)

echo.
echo [4/4] Pushing to remote repository...
git push -u origin main

if %errorlevel% equ 0 (
    echo ✅ Successfully pushed to remote repository!
    echo.
    echo ========================================
    echo    MIGRATION COMPLETED SUCCESSFULLY!
    echo ========================================
    echo.
    echo Your new repository is ready at:
    git remote get-url origin
    echo.
    echo Next steps:
    echo 1. Configure Vercel deployment
    echo 2. Set up environment variables
    echo 3. Regenerate all API keys
    echo 4. Test the application
    echo.
    echo See MIGRATION-TO-NEW-REPO-GUIDE.md for detailed next steps.
) else (
    echo ❌ Error pushing to remote repository
    echo Please check your repository URL and permissions
)

echo.
pause

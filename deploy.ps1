# FlashGuard AI - GitHub Pages Deployment Script

Write-Host "Building FlashGuard AI..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting deployment." -ForegroundColor Red
    exit 1
}

Copy-Item dist\index.html dist\404.html -Force
New-Item -Path "dist\.nojekyll" -ItemType File -Force | Out-Null

Write-Host "Pushing to gh-pages branch..." -ForegroundColor Cyan
Set-Location dist
git init -b gh-pages
git config user.name "Jagjeet Singh"
git config user.email "90817184+Jagjeetjani@users.noreply.github.com"
git add -A
git commit -m "Deploy FlashGuard AI to GitHub Pages"
git remote add origin https://github.com/Jagjeetjani/flashguard-ai.git
git push -f origin gh-pages

Set-Location ..

Write-Host ""
Write-Host "FlashGuard AI is LIVE!" -ForegroundColor Green
Write-Host "URL: https://jagjeetjani.github.io/flashguard-ai/" -ForegroundColor Yellow

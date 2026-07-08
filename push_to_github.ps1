Write-Host "Initializing Git..." -ForegroundColor Cyan
git init
git add .
git commit -m "Initialize NFG Website with live pricing, console game, and NFTs section"
git branch -M main
git remote add origin https://github.com/Chillguyxrpl/NFGXRP.git
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main --force
Write-Host "Done! Refresh NFGxrp.com in a few moments." -ForegroundColor Green

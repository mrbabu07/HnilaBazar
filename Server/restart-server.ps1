# Restart Server Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Restarting Server with New Code" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Stopping any process on port 5000..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($processes) {
    foreach ($proc in $processes) {
        Write-Host "  Killing process: $($proc.OwningProcess)" -ForegroundColor Yellow
        Stop-Process -Id $proc.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Write-Host "  Done!" -ForegroundColor Green
} else {
    Write-Host "  No process found on port 5000" -ForegroundColor Gray
}
Write-Host ""

Write-Host "Step 2: Waiting 2 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Write-Host ""

Write-Host "Step 3: Starting server with new code..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Server Starting - Watch for Messages:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MUST SEE: 'Mongoose connected successfully'" -ForegroundColor Green
Write-Host "  MUST SEE: 'Offers routes registered'" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

node index.js

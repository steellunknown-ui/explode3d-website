# PowerShell runner for frame extraction & optimization
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$pythonScript = Join-Path $scriptDir "process_frames.py"

Write-Host ">>> Running Lamborghini Frame Optimization Pipeline..." -ForegroundColor Cyan
python $pythonScript

if ($LASTEXITCODE -eq 0) {
    Write-Host ">>> Frame optimization completed successfully!" -ForegroundColor Green
} else {
    Write-Host ">>> An error occurred during frame processing." -ForegroundColor Red
}


# PowerShell script to download animal sounds
# Run from project root: .\download-sounds.ps1

Write-Host "Downloading animal sounds..." -ForegroundColor Green

# Create sounds directory
$soundsDir = "public\sounds"
if (-not (Test-Path $soundsDir)) {
    New-Item -ItemType Directory -Path $soundsDir | Out-Null
}

# CC0 Licensed sounds from Freesound.org (preview quality)
# Note: For production, download full quality from the website
$sounds = @{
    "dog.mp3" = "https://cdn.freesound.org/previews/362/362196_5121236-lq.mp3"
    "cat.mp3" = "https://cdn.freesound.org/previews/414/414209_7670939-lq.mp3"
    "mouse.mp3" = "https://cdn.freesound.org/previews/188/188450_1648170-lq.mp3"
}

foreach ($sound in $sounds.GetEnumerator()) {
    $output = Join-Path $soundsDir $sound.Key
    Write-Host "  Downloading $($sound.Key)..." -NoNewline
    
    try {
        Invoke-WebRequest -Uri $sound.Value -OutFile $output -ErrorAction Stop
        Write-Host " Done!" -ForegroundColor Green
    } catch {
        Write-Host " Failed!" -ForegroundColor Red
        Write-Host "    Error: $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete!" -ForegroundColor Green
Write-Host "Files saved to: $soundsDir" -ForegroundColor Cyan
Write-Host "`nNote: These are preview quality. For better quality:" -ForegroundColor Yellow
Write-Host "  1. Visit https://freesound.org" -ForegroundColor Yellow
Write-Host "  2. Download full quality versions" -ForegroundColor Yellow
Write-Host "  3. Save to public/sounds/ folder" -ForegroundColor Yellow

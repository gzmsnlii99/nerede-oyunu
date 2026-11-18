# GitHub Pages yayinini gunceller: https://gzmsnlii99.github.io/nerede-oyunu/
# Kullanim: powershell -ExecutionPolicy Bypass -File scripts\deploy-pages.ps1
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$env:GITHUB_PAGES = "true"
npx next build
if ($LASTEXITCODE -ne 0) { throw "next build basarisiz" }

# Jekyll _next klasorunu atlamasin
Set-Content -Path "out\.nojekyll" -Value "" -NoNewline

Push-Location out
try {
  if (-not (Test-Path .git)) {
    git init -b gh-pages | Out-Null
    git config user.name "gzmsnlii99"
    git config user.email "348811232+gzmsnlii99@users.noreply.github.com"
    git remote add origin https://github.com/gzmsnlii99/nerede-oyunu.git
  }
  git add -A | Out-Null
  git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" | Out-Null
  git push -f origin gh-pages
} finally {
  Pop-Location
}

Write-Host "Yayin guncellendi: https://gzmsnlii99.github.io/nerede-oyunu/"

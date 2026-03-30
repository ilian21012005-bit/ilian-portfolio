$basePath = "d:\ilian-portfolio\app"
$localePath = Join-Path -Path $basePath -ChildPath "[locale]"
New-Item -ItemType Directory -Force -Path $localePath | Out-Null

$itemsToMove = @(
    "a-propos", "arsenal", "contact", "interets", "parcours", "parcours-pro", "parcours-scolaire", "projets", "simulateur",
    "layout.tsx", "page.tsx", "not-found.tsx"
)

foreach ($item in $itemsToMove) {
    $srcPath = Join-Path -Path $basePath -ChildPath $item
    if (Test-Path $srcPath) {
        Move-Item -Path $srcPath -Destination $localePath
    }
}
Write-Output "Restructure Complete."

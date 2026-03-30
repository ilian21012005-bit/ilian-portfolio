$directories = @("d:\ilian-portfolio\app", "d:\ilian-portfolio\components")
$extensions = "*.tsx", "*.ts", "*.css"
$files = Get-ChildItem -Path $directories -Include $extensions -Recurse

foreach ($file in $files) {
    if (-not $file.Attributes.HasFlag([System.IO.FileAttributes]::Directory)) {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $updatedContent = $content -replace "tech-blue", "crimson" `
                                   -replace "success-green", "dark-red" `
                                   -replace "accent-violet", "blood-red" `
                                   -replace "glow-blue", "glow-crimson" `
                                   -replace "glow-green", "glow-dark-red" `
                                   -replace "gradient-orb-blue", "gradient-orb-crimson" `
                                   -replace "gradient-orb-green", "gradient-orb-dark-red"
        
        [System.IO.File]::WriteAllText($file.FullName, $updatedContent)
    }
}
Write-Output "Replacement complete."

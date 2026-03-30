$directories = @("d:\ilian-portfolio\app", "d:\ilian-portfolio\components")
$extensions = "*.tsx", "*.ts", "*.css"
$files = Get-ChildItem -Path $directories -Include $extensions -Recurse

foreach ($file in $files) {
    if (-not $file.Attributes.HasFlag([System.IO.FileAttributes]::Directory)) {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        $updatedContent = $content -replace "59, 130, 246", "220, 20, 60" `
                                   -replace "59,130,246", "220,20,60" `
                                   -replace "16, 185, 129", "139, 0, 0" `
                                   -replace "16,185,129", "139,0,0" `
                                   -replace "139, 92, 246", "255, 0, 0" `
                                   -replace "139,92,246", "255,0,0" `
                                   -replace "#3B82F6", "#DC143C" `
                                   -replace "#3b82f6", "#dc143c" `
                                   -replace "#10B981", "#8B0000" `
                                   -replace "#10b981", "#8b0000" `
                                   -replace "#8B5CF6", "#FF0000" `
                                   -replace "#8b5cf6", "#ff0000"
        
        if ($content -ne $updatedContent) {
            [System.IO.File]::WriteAllText($file.FullName, $updatedContent)
        }
    }
}
Write-Output "Hardcoded hex/rgb Replacement complete."

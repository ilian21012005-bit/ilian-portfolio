$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root
function Check([string]$name, [scriptblock]$run) {
    Write-Output "CHECK: $name"
    & $run
    if ($LASTEXITCODE -ne 0) { throw "$name failed ($LASTEXITCODE)" }
}
if (-not (Test-Path -LiteralPath 'node_modules/typescript')) { throw 'Run npm ci first.' }
Check 'TypeScript' { & .\node_modules\.bin\tsc.cmd --noEmit --incremental false }
Check 'ESLint' { npm.cmd run lint }
Check 'Next.js build' { npm.cmd run build }
Write-Output 'HTTP and browser checks: NOT_RUN (need local preview).'

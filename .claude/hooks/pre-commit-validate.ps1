# .claude/hooks/pre-commit-validate.ps1
# PreToolUse hook: runs full build gate before git commit or deploy commands

$rawInput = [Console]::In.ReadToEnd()

try {
    $parsed  = $rawInput | ConvertFrom-Json
    $toolName = $parsed.tool_name
    $command  = $parsed.tool_input.command
} catch {
    exit 0
}

if ($toolName -ne "Bash") { exit 0 }
if (-not $command) { exit 0 }

# Trigger on commit or deploy-like commands
$isCommit  = $command -match 'git\s+commit'
$isBuild   = $command -match 'npm\s+run\s+build'
$isDeploy  = $command -match 'vercel|netlify|npm\s+run\s+deploy'

if (-not ($isCommit -or $isBuild -or $isDeploy)) { exit 0 }

Write-Host ""
Write-Host ">> Full validation gate triggered by: $($command.Substring(0, [Math]::Min(60, $command.Length)))"
Write-Host "   Running: npm run build (tsc + vite build) ..."
Write-Host ""

$buildOutput = & npm run build 2>&1
$buildExit   = $LASTEXITCODE

$buildOutput | ForEach-Object { Write-Host $_ }

if ($buildExit -ne 0) {
    Write-Host ""
    Write-Host "BLOCKED: Full build failed. Fix all errors before committing or deploying."
    Write-Host ""
    # Exit 2: blocking — stops the Bash tool from running at all
    exit 2
}

Write-Host ""
Write-Host ">> Build passed. Proceeding with: $($command.Substring(0, [Math]::Min(60, $command.Length)))"
exit 0

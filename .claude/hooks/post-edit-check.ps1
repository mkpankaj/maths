# .claude/hooks/post-edit-check.ps1
# PostToolUse hook: runs tsc + eslint after every Edit or Write to src/

$rawInput = [Console]::In.ReadToEnd()

try {
    $parsed    = $rawInput | ConvertFrom-Json
    $toolName  = $parsed.tool_name
    $filePath  = $parsed.tool_input.file_path
} catch {
    exit 0
}

# Only validate source files
if ($toolName -notin @("Edit", "Write")) { exit 0 }
if (-not $filePath) { exit 0 }

$normalised = $filePath -replace '\\', '/'
if ($normalised -notmatch '/src/') { exit 0 }

Write-Host ""
Write-Host ">> Post-edit validation: $filePath"

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$errors = @()

# ── TypeScript check ──────────────────────────────────────────────────────────
Write-Host "   [1/2] tsc --noEmit ..."
$tscOutput = & npx tsc --noEmit 2>&1
if ($LASTEXITCODE -ne 0) {
    $errors += "=== TypeScript errors ==="
    $errors += $tscOutput
}

# ── ESLint (changed file only) ────────────────────────────────────────────────
Write-Host "   [2/2] eslint $filePath ..."
$eslintOutput = & npx eslint $filePath 2>&1
if ($LASTEXITCODE -ne 0) {
    $errors += "=== ESLint errors ==="
    $errors += $eslintOutput
}

# ── Report ────────────────────────────────────────────────────────────────────
if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "VALIDATION FAILED — fix the following issues before proceeding:"
    Write-Host ""
    $errors | ForEach-Object { Write-Host $_ }
    Write-Host ""
    # Exit 1: non-blocking — Claude sees this output as feedback and self-corrects
    exit 1
}

Write-Host "   OK — no type or lint errors."
exit 0

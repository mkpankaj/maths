# .claude/hooks/guard-protected-files.ps1

# ─────────────────────────────────────────
# Protected files/patterns list
# ─────────────────────────────────────────
$PROTECTED = @(
    ".env",
    ".env.local",
    ".env.*",
    "credentials.json",
    "*.pem",
    "*.key",
    "*.p12",
    "*.pfx",
    "secrets.*",
    "service-account*.json"
)

# ─────────────────────────────────────────
# Read JSON input from stdin (sent by Claude Code)
# ─────────────────────────────────────────
$rawInput = [Console]::In.ReadToEnd()

try {
    $parsed   = $rawInput | ConvertFrom-Json
    $toolName = $parsed.tool_name
    $toolInput = $parsed.tool_input
} catch {
    # If JSON parsing fails, allow the action
    exit 0
}

# ─────────────────────────────────────────
# Helper: check if a file path matches any protected pattern
# ─────────────────────────────────────────
function Is-Protected($filePath) {
    $filename = Split-Path $filePath -Leaf
    foreach ($pattern in $PROTECTED) {
        if ($filename -like $pattern -or $filePath -like $pattern) {
            return $true
        }
    }
    return $false
}

# ─────────────────────────────────────────
# Check Edit / Write tools
# ─────────────────────────────────────────
if ($toolName -eq "Edit" -or $toolName -eq "Write") {
    $filePath = $toolInput.file_path
    if (Is-Protected $filePath) {
        Write-Host "BLOCK: Access to protected file '$filePath' is not allowed."
        exit 2
    }
}

# ─────────────────────────────────────────
# Check Bash tool — catch dangerous commands
# ─────────────────────────────────────────
elseif ($toolName -eq "Bash") {
    $command = $toolInput.command
    foreach ($pattern in $PROTECTED) {
        $escaped = [regex]::Escape($pattern)
        if ($command -match "(rm|del|copy|move|echo|tee|Out-File|Set-Content).*$escaped") {
            Write-Host "BLOCK: Bash command targets protected file '$pattern'"
            Write-Host "Command was: $command"
            exit 2
        }
    }
}

# ─────────────────────────────────────────
# All checks passed — allow the action
# ─────────────────────────────────────────
exit 0

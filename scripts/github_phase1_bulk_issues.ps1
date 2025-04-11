<#
.SYNOPSIS
    Creates bulk GitHub issues for Phase 1 of the nu-gui/NU-DATA-UI repository.
#>

param (
    [string]$BasePath = "docs/issues/phase-1-issues-md",
    [string]$Assignee = "wes",
    [string]$Milestone = "Phase 1",
    [string]$LogFile = "issue_creation_log.txt"
)

# Resolve current repo context
$repo = (gh repo view --json nameWithOwner --jq '.nameWithOwner').Trim()
if (-not $repo) {
    Write-Error "❌ Unable to detect GitHub repository context. Please run 'gh repo set-default ...'"
    exit 1
}

# Ensure milestone exists
$milestones = gh api repos/$repo/milestones --jq '.[].title' 2>$null
if (-not ($milestones -contains $Milestone)) {
    Write-Host "🚧 Milestone '$Milestone' not found. Creating it..."
    $dueDate = (Get-Date).AddDays(30).ToString("yyyy-MM-ddTHH:mm:ssZ")
    gh api repos/$repo/milestones --method POST `
        --field title="$Milestone" `
        --field description="Initial milestone for Phase 1 development tasks." `
        --field due_on="$dueDate" | Out-Null
    Write-Host "✅ Milestone '$Milestone' created." -ForegroundColor Green
}

# Issue definitions
$issues = @(
    @{ ID='R1'; Title='Project Overview and Roadmap'; Labels=@("phase-1","planning","roadmap"); File='session-R1.md' },
    @{ ID='M1'; Title='UI/UX Framework Planning'; Labels=@("phase-1","frontend","ux"); File='session-M1.md' },
    @{ ID='B1'; Title='Backend API Structure and OpenAPI'; Labels=@("phase-1","backend","api"); File='session-B1.md' },
    @{ ID='DA1'; Title='PostgreSQL Schema and Multi-Tenant Architecture'; Labels=@("phase-1","database","architecture"); File='session-DA1.md' },
    @{ ID='SE1'; Title='Authentication and RBAC Control Flow'; Labels=@("phase-1","auth","security"); File='session-SE1.md' },
    @{ ID='D1'; Title='CI/CD GitHub Actions Setup'; Labels=@("phase-1","devops","ci/cd"); File='session-D1.md' },
    @{ ID='T1'; Title='Test Suite and Coverage Strategy'; Labels=@("phase-1","testing","quality"); File='session-T1.md' },
    @{ ID='LLM1'; Title='RPC/WPC Scoring and Name Match Engine'; Labels=@("phase-1","ai","fuzzy-matching"); File='session-LLM1.md' },
    @{ ID='DS1'; Title='Export Insights and Metrics Dashboard'; Labels=@("phase-1","analytics","dashboard"); File='session-DS1.md' },
    @{ ID='X1'; Title='Shared Utilities and Core Framework'; Labels=@("phase-1","utils","shared"); File='session-X1.md' },
    @{ ID='I1'; Title='DevOps Environment and Dockerized Local Stack'; Labels=@("phase-1","infra","docker"); File='session-I1.md' },
    @{ ID='PY1'; Title='Python-Based Enrichment Runner Service'; Labels=@("phase-1","backend","python","enrichment"); File='session-PY1.md' },
    @{ ID='MW1'; Title='Middleware Enrichment Job Dispatcher'; Labels=@("phase-1","middleware","queue"); File='session-MW1.md' }
)

# Ensure all labels exist
$existingLabels = gh api repos/$repo/labels --jq '.[].name'
$issues | ForEach-Object {
    $_.Labels | ForEach-Object {
        if (-not ($existingLabels -contains $_)) {
            try {
                gh api repos/$repo/labels --method POST `
                    --field name="$_" `
                    --field color="ededed" `
                    --field description="Auto-created label for planning" | Out-Null
                Write-Host "➕ Created label: $_"
            } catch {
                Write-Warning "⚠️ Label '$_' already exists or failed to create."
            }
        }
    }
}

Write-Host "`n📌 Starting bulk issue creation..." -ForegroundColor Cyan
$total = $issues.Count
$counter = 0

foreach ($issue in $issues) {
    $counter++
    $filePath = Join-Path $BasePath $issue.File
    if (-not (Test-Path $filePath)) {
        Write-Warning "⚠️ Skipped: $($issue.ID) - file not found: $filePath"
        continue
    }

    Write-Host "📝 [$counter/$total] Creating: session-$($issue.ID) - $($issue.Title)" -ForegroundColor Yellow

    $labelArgs = ($issue.Labels | ForEach-Object { "--label `"$($_)`"" }) -join ' '

    $ghCmd = "gh issue create --title `"session-$($issue.ID) - $($issue.Title)`" --body-file `"$filePath`" --assignee `"$Assignee`" --milestone `"$Milestone`" $labelArgs"

    try {
        Invoke-Expression $ghCmd
        Write-Host "✅ Created: session-$($issue.ID)" -ForegroundColor Green
    } catch {
        Write-Error "❌ Failed: session-$($issue.ID) — $($_.Exception.Message)"
    }
}

Write-Host "`n✅ All session issues processed." -ForegroundColor Green

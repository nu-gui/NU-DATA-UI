#!/bin/bash

# ------------------------------------------------------------------------------
# nu-gui/NU-DATA-UI/scripts/github_phase_bulk_issues.sh
#
# 🧠 Script Purpose:
#   Automate GitHub issue creation from markdown files within a selected
#   docs/issues/phase-* folder. This script is used during the beginning of a
#   development cycle (e.g. "Phase 1", "Phase 2") to create GitHub Issues for
#   session-ID task planning, roadmap tracking, and project lifecycle visibility.
#
# 🛠️ Expected Usage:
#   ./scripts/github_phase_bulk_issues.sh
#
# 🤖 Usage by app.devin.ai:
#   This script may be invoked during session planning automation or GitHub sync
#   to generate issues dynamically by folder selection. It will:
#     - Prompt the user (or devin.ai CLI agent) to select the phase folder
#     - Extract the milestone name from the folder (e.g., "phase-1" → "Phase 1")
#     - Create all issues inside the folder as GitHub Issues
#     - Automatically create any missing labels used in each issue
#
# 🔐 Requirements:
#   - GitHub CLI (`gh`) installed
#   - Authenticated with `gh auth login`
#   - Repo context set to nu-gui/NU-DATA-UI
#   - Markdown files with optional `labels:` line in YAML/markdown frontmatter
# ------------------------------------------------------------------------------

# --- CONFIGURATION ---
ASSIGNEE="wes"
LOG_FILE="issue_creation_log.txt"
ISSUE_DIR_ROOT="docs/issues"

# --- COLORS ---
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
GREEN="\033[1;32m"
RED="\033[1;31m"
RESET="\033[0m"

# --- AUTH + REPO VALIDATION ---
if ! gh auth status &>/dev/null; then
  echo -e "${RED}❌ GitHub CLI not authenticated. Run 'gh auth login'.${RESET}"
  exit 1
fi

REPO_NAME=$(gh repo view --json nameWithOwner -q ".nameWithOwner")
if [[ "$REPO_NAME" != "nu-gui/NU-DATA-UI" ]]; then
  echo -e "${RED}❌ Not in 'nu-gui/NU-DATA-UI' repo. Use 'gh repo set-default'.${RESET}"
  exit 1
fi

# --- FOLDER SELECTION ---
echo -e "${CYAN}📂 Select the phase folder to use for issue creation:${RESET}"
select FOLDER in "$ISSUE_DIR_ROOT"/phase-*; do
  if [[ -d "$FOLDER" ]]; then
    BASE_PATH="$FOLDER"
    PHASE_NAME=$(basename "$FOLDER")
    MILESTONE="${PHASE_NAME^}" # Capitalize
    echo -e "${CYAN}📌 Selected folder: $BASE_PATH"
    echo -e "🔖 Milestone: $MILESTONE${RESET}"
    break
  else
    echo -e "${RED}Invalid selection. Try again.${RESET}"
  fi
done

# --- LOG SETUP ---
mkdir -p logs
echo "[$(date)] Session Start – $PHASE_NAME" >> "logs/$LOG_FILE"

# --- CREATE MILESTONE ---
if ! gh api repos/:owner/:repo/milestones --jq '.[].title' | grep -qx "$MILESTONE"; then
  echo -e "${YELLOW}🚧 Creating milestone '$MILESTONE'...${RESET}"
  gh api repos/:owner/:repo/milestones --method POST \
    --field title="$MILESTONE" \
    --field description="Auto-created milestone for $PHASE_NAME" \
    --field due_on="$(date -u -d '+30 days' +%Y-%m-%dT%H:%M:%SZ)" >/dev/null
  echo -e "${GREEN}✅ Milestone created: $MILESTONE${RESET}"
else
  echo -e "${GREEN}✅ Milestone already exists: $MILESTONE${RESET}"
fi

# --- PROCESS ISSUE FILES ---
FILES=("$BASE_PATH"/*.md)
TOTAL=${#FILES[@]}
COUNT=0

echo -e "${CYAN}\n📌 Creating issues from ${#FILES[@]} files...${RESET}"

for file in "${FILES[@]}"; do
  ((COUNT++))
  FILE_NAME=$(basename "$file")
  ISSUE_ID=$(basename "$file" .md)
  TITLE=$(head -n 1 "$file" | sed 's/^# *//')
  LABELS=$(grep "^labels:" "$file" | cut -d':' -f2- | tr -d ' ' | tr ',' '\n')

  echo -e "${YELLOW}📝 [$COUNT/$TOTAL] Creating: $ISSUE_ID - $TITLE${RESET}"

  # Create labels if missing
  for label in $LABELS; do
    if ! gh label list | cut -f1 | grep -qx "$label"; then
      echo -e "${CYAN}➕ Creating label: $label${RESET}"
      gh label create "$label" --color "ededed" --description "Auto-created label" >/dev/null 2>&1 || \
        echo -e "${RED}⚠️ Could not create label: $label${RESET}"
    fi
    LABEL_ARGS+=" --label \"$label\""
  done

  # Build GitHub issue command
  CMD="gh issue create --title \"session-$ISSUE_ID - $TITLE\" \
       --body-file \"$file\" \
       --assignee \"$ASSIGNEE\" \
       --milestone \"$MILESTONE\" \
       $LABEL_ARGS"

  if eval $CMD; then
    echo -e "${GREEN}✅ Created: session-$ISSUE_ID${RESET}"
    echo "[$(date)] Created: session-$ISSUE_ID - $TITLE" >> "logs/$LOG_FILE"
  else
    echo -e "${RED}❌ Failed: session-$ISSUE_ID${RESET}"
    echo "[$(date)] Failed: session-$ISSUE_ID - $TITLE" >> "logs/$LOG_FILE"
  fi

  LABEL_ARGS=""  # Reset for next issue
done

echo -e "${GREEN}\n✅ All issues for $PHASE_NAME processed successfully.${RESET}"
echo "[$(date)] ✅ All issues processed for $PHASE_NAME" >> "logs/$LOG_FILE"
echo -e "${CYAN}📜 Log file: logs/$LOG_FILE${RESET}"
echo -e "${CYAN}🔚 Script completed.${RESET}"
echo -e "${CYAN}📅 Next steps: Review issues on GitHub and assign tasks.${RESET}"

#!/bin/bash

# ==============================================================================
# nu-gui/NU-DATA-UI/scripts/github_phase_bulk_issues.sh
#
# 🤖 AI-Compatible GitHub Issue Generator for NU-DATA-UI Project
#
# ✅ Purpose:
# Automate milestone creation and GitHub Issue creation from markdown task files
# located in selected `docs/issues/phase-*` folders. This script is compatible
# with CLI tools (like `app.devin.ai`) and human users to streamline Phase-based
# development task tracking using GitHub.
#
# ✅ What it Does:
# - Prompts user (or CLI agent) to select a phase folder
# - Converts folder name (e.g., phase-1) into a GitHub milestone
# - Parses each markdown task file into a GitHub issue
# - Creates any missing labels automatically
#
# ✅ Requirements:
# - GitHub CLI installed and authenticated (`gh auth login`)
# - User is within `nu-gui/NU-DATA-UI` GitHub repo context
# - Markdown files with proper YAML/markdown format exist in selected folder
# ==============================================================================

ASSIGNEE="wes"
LOG_FILE="issue_creation_log.txt"
ISSUE_DIR_ROOT="docs/issues"

# --- Colors for UI ---
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
GREEN="\033[1;32m"
RED="\033[1;31m"
RESET="\033[0m"

# --- Check GitHub CLI authentication ---
if ! gh auth status &>/dev/null; then
  echo -e "${RED}❌ GitHub CLI not authenticated. Run 'gh auth login'.${RESET}"
  exit 1
fi

REPO_NAME=$(gh repo view --json nameWithOwner -q ".nameWithOwner")
if [[ "$REPO_NAME" != "nu-gui/NU-DATA-UI" ]]; then
  echo -e "${RED}❌ Not in 'nu-gui/NU-DATA-UI' repo. Use 'gh repo set-default'.${RESET}"
  exit 1
fi

# --- Prompt user to select a phase folder ---
echo -e "${CYAN}📂 Select a phase folder for GitHub Issue creation:${RESET}"
select FOLDER in "$ISSUE_DIR_ROOT"/phase-*; do
  if [[ -d "$FOLDER" ]]; then
    BASE_PATH="$FOLDER"
    PHASE_NAME=$(basename "$FOLDER")
    MILESTONE="${PHASE_NAME^}"
    echo -e "${CYAN}📌 Using: $BASE_PATH → Milestone: $MILESTONE${RESET}"
    break
  else
    echo -e "${RED}Invalid selection. Try again.${RESET}"
  fi
done

# --- Create log file ---
mkdir -p logs
echo "[$(date)] Starting issue creation for $PHASE_NAME" >> "logs/$LOG_FILE"

# --- Create milestone if missing ---
if ! gh api repos/:owner/:repo/milestones --jq '.[].title' | grep -qx "$MILESTONE"; then
  echo -e "${YELLOW}🚧 Creating milestone: $MILESTONE...${RESET}"
  gh api repos/:owner/:repo/milestones --method POST \
    --field title="$MILESTONE" \
    --field description="Auto-created milestone for $PHASE_NAME" \
    --field due_on="$(date -u -d '+30 days' +%Y-%m-%dT%H:%M:%SZ)" >/dev/null
  echo -e "${GREEN}✅ Milestone created: $MILESTONE${RESET}"
else
  echo -e "${GREEN}✅ Milestone already exists: $MILESTONE${RESET}"
fi

# --- Scan and process markdown files ---
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

  for label in $LABELS; do
    if ! gh label list | cut -f1 | grep -qx "$label"; then
      echo -e "${CYAN}➕ Creating label: $label${RESET}"
      gh label create "$label" --color "ededed" --description "Auto-created label" >/dev/null 2>&1
    fi
    LABEL_ARGS+=" --label \"$label\""
  done

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

  LABEL_ARGS=""
done

echo -e "${GREEN}\n✅ All issues for $PHASE_NAME processed successfully.${RESET}"
echo "[$(date)] ✅ Completed issue creation for $PHASE_NAME" >> "logs/$LOG_FILE"

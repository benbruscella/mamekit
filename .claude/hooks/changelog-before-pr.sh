#!/usr/bin/env bash
# PreToolUse hook (Bash): refuse `gh pr create` until this branch's commits
# change CHANGELOG.md. CHANGELOG.md's "Maintaining this file" says every pull
# request adds its entry under **Unreleased**.
set -euo pipefail

command=$(jq -r '.tool_input.command // ""')
[[ "$command" =~ gh[[:space:]]+pr[[:space:]]+create ]] || exit 0

root=$(git rev-parse --show-toplevel)
cd "$root"
base_ref=main
git rev-parse --verify --quiet "$base_ref" >/dev/null || base_ref=origin/main
base=$(git merge-base "$base_ref" HEAD)

git diff --quiet "$base" HEAD -- CHANGELOG.md && committed=no || committed=yes
[[ $committed == yes ]] && exit 0

if git diff --quiet HEAD -- CHANGELOG.md; then
  reason="CHANGELOG.md has no entry for this pull request. Add one under **Unreleased** as CHANGELOG.md's \"Maintaining this file\" describes (For players / Under the hood), commit it, then create the PR."
else
  reason="CHANGELOG.md is edited but not committed, so the pull request would not carry it. Commit the entry, then create the PR."
fi
jq -n --arg reason "$reason" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: $reason
  }
}'

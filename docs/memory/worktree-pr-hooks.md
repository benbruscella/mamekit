---
name: worktree-pr-hooks
description: "In a git worktree, the changelog-before-pr hook checks the session's cwd branch; EnterWorktree first, and a hook-denied command never ran its heredocs"
metadata:
  type: feedback
---

#268 (2026-11-17) was done in `../mamekit-268` because the user asked for a worktree. `gh pr create` was refused by `.claude/hooks/changelog-before-pr.sh` even though the branch committed a CHANGELOG entry: the hook runs in the session's cwd (the main checkout, on another branch), not the worktree a `cd` names.

**Why:** a PreToolUse deny blocks the whole Bash command, heredoc file writes included, so the PR body file didn't exist either.
**How to apply:** when working in a worktree, call EnterWorktree with `path` before `gh pr create`. Write PR bodies with the Write tool, not in the same command as `gh pr create`. A worktree also needs `.env` copied (add `MAMEKIT_ROMS`/`MAMEKIT_SAMPLES` pointing at the main tree's `.data`) and `node_modules` symlinked; its `dist` is separate, so `gen:all` there leaves the user's served dist alone. Related: [[dont-wipe-served-dist]], [[ci-local-checks]].

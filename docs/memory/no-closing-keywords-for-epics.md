---
name: no-closing-keywords-for-epics
description: PRs and commits never reference the epic #247 (no "Fixes #247", no "(#247)"); merging #287 closed it
metadata:
  type: feedback
---

PR #287's body began "Fixes #247's `diverge` I/O tap gap", and its title ended "(#247)". GitHub parsed "Fixes #247" as a closing keyword, so merging #287 closed the epic #247 (2026-11-22). I reopened it, and the user said: "do not link issues to the EPIC".

**Why:** close, closes, closed, fix, fixes, fixed, resolve, resolves and resolved before `#N` all close the issue on merge, whatever follows the number. Mentioning #247 at all also clutters its timeline.
**How to apply:** a PR or commit names its own sub-issue ("Closes #288"), never #247. A fix with no sub-issue gets an issue of its own first, or names none. Update #247's body by hand after the merge instead. Check the PR title, body and commit messages before `gh pr create`. Related: [[outstanding-issue]].

---
name: no-closing-keywords-for-epics
description: PRs and commits never reference the epic #247 (merging "Fixes #247" closed it); sub-issues STAY attached to #247 — never detach them
metadata:
  type: feedback
---

PR #287's body began "Fixes #247's `diverge` I/O tap gap", and its title ended "(#247)". GitHub parsed "Fixes #247" as a closing keyword, so merging #287 closed the epic #247 (2026-11-22). The user said "do not link issues to the EPIC" and then "drop link pls". I read that as detaching #247's sub-issues and detached all six. The user meant the PR's closing link and was angry ("removed sub-issues 1h ago — WTF"). I re-attached them and added #290.

**Why:** close/fix/resolve (any tense) before `#N` closes the issue on merge, whatever follows the number. Sub-issues are how the user tracks the epic.
**How to apply:** a PR or commit names its own sub-issue ("Closes #290"), never #247. Every new issue taken from #247 is attached as a sub-issue (`gh api -X POST .../issues/247/sub_issues -F sub_issue_id=<id>`). Never detach sub-issues or remove links without asking which link is meant. When an instruction about "links" is ambiguous, ask before doing anything destructive. Related: [[outstanding-issue]], [[confirm-scope-on-open-questions]].

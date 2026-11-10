---
name: issue-progress-comments
description: "User wants GitHub issue comments posted as work on an issue progresses (findings, decisions, milestones), not just at the end"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 427cd7ec-ed20-4ad9-9308-a003a507dd45
  modified: 2026-10-21T03:44:15.108Z
---

While working an issue, post comments to the GitHub issue as we go: the plan
and survey findings up front, then each milestone or design decision as it
lands (`gh issue comment <n> --body-file ...`).

**Why:** asked on 2026-10-21 during #167 ("add comments to the issue as we go
through this pls"); the issue is the shared record of the work.
**How to apply:** comment at natural milestones (plan, a section done, a
surprising finding, a blocker), concise and factual, numbers over adjectives.
Related: [[stay-on-issue-branch]].

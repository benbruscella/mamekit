---
name: stay-on-issue-branch
description: "Don't create new branches mid-issue; keep working on the issue's branch unless the user asks for another"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8f4a5324-b2d9-4697-abd8-9c13b93fa8a8
  modified: 2026-09-19T04:46:59.540Z
---

Keep working on the branch the issue's work is on. On 2026-09-19 I opened
PR #150 from `issue-149-next-four` and then created `issue-149-tunit` to start
the Mortal Kombat work; the user objected ("why did you change branch! go back
to issue-149-next-four").

**Why:** the user decides branch/PR structure; a new branch is a structural
choice I made without asking.
**How to apply:** stay on the current issue branch for follow-on work, even
after a PR is open from it. If splitting seems worthwhile, propose it and wait.
Related: [[issue-149-next-four]].

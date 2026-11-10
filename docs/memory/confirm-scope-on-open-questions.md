---
name: confirm-scope-on-open-questions
description: "When an issue lists open questions or a design choice, ask before building rather than answering them and implementing"
metadata:
  type: feedback
---

When an issue leaves design questions open, put the choice to the user before building. On #232 I answered them myself, posted the plan and built ~500 lines; the user asked "what are you doing?" and picked a much smaller option.

**Why:** the user owns scope, and a plan comment on the issue is not their approval.
**How to apply:** give the options with a recommendation in a short message first, and wait. Related: [[issue-progress-comments]], [[stay-on-issue-branch]].

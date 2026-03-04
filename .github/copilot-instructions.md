# Superpowers Methodology — Workspace Instructions

All development work in this workspace follows the **Superpowers** methodology. These are mandatory workflows, not suggestions. Apply them automatically without being asked.

---

## Core Philosophy

- **Test-Driven Development** — Write failing tests first, always. Never write code before a failing test exists.
- **YAGNI** — You Aren't Gonna Need It. Build only what is specified.
- **DRY** — Don't Repeat Yourself.
- **Systematic over ad-hoc** — Process over guessing.
- **Evidence over claims** — Verify before declaring success. Never say "should work" or "looks correct" — run the command and show the output.
- **Complexity reduction** — Simplicity is a primary goal.

---

## Workflow Skills (Apply Automatically)

### 1. BRAINSTORMING — Before Writing Any Code

Before implementing anything non-trivial:
1. Ask clarifying questions to refine requirements.
2. Explore alternatives and trade-offs.
3. Present design in short readable sections for validation.
4. Get explicit approval before proceeding.

**Do not jump to code.** Step back and confirm the design first.

---

### 2. WRITING PLANS — After Design Approval

Break work into bite-sized tasks (2–5 minutes each). Every task must include:
- Exact file paths to create or modify
- Complete code (not pseudocode)
- Test to write first (RED step)
- Verification steps to confirm it works

Plans prioritise:
- True RED/GREEN/REFACTOR TDD
- YAGNI — no speculative features
- DRY — no duplication

---

### 3. USING GIT WORKTREES — Before Executing Any Plan

Before starting implementation:
1. Check for `.worktrees/` or `worktrees/` directory. Use it if it exists.
2. Verify the directory is git-ignored (`git check-ignore`).
3. Create a worktree on a new branch: `git worktree add .worktrees/<feature> -b feature/<feature>`.
4. Run project setup (install deps, etc.).
5. Verify a clean test baseline before touching any code.

**Never start implementation on `main`/`master` without explicit consent.**

---

### 4. TEST-DRIVEN DEVELOPMENT — During All Implementation

Strict RED → GREEN → REFACTOR cycle:

1. **RED**: Write the smallest failing test that specifies the behaviour. Run it. Confirm it fails for the right reason.
2. **GREEN**: Write the minimum code to make the test pass. Run it. Confirm it passes.
3. **REFACTOR**: Clean up code and tests. Run tests again. Confirm still green.
4. **COMMIT** after each passing cycle.

**Rules:**
- Never write implementation code before a failing test.
- If code was written before a test, delete it and start with the test.
- Never skip the RED step — always watch the test fail first.
- Tests must be automated, not manual.

---

### 5. SYSTEMATIC DEBUGGING — Before Proposing Any Fix

**THE IRON LAW: No fixes without root cause investigation first.**

Four phases — complete each before moving to the next:

**Phase 1 — Root Cause Investigation:**
- Read error messages fully (stack traces, line numbers, codes).
- Reproduce the issue consistently.
- Check recent changes (`git diff`, recent commits).
- In multi-component systems, add diagnostic instrumentation at each boundary before proposing anything.
- Trace data flow backward to find the source.

**Phase 2 — Pattern Analysis:**
- Find working examples of similar code.
- Read reference implementations completely — don't skim.
- List every difference between working and broken code.

**Phase 3 — Hypothesis and Testing:**
- Form ONE specific hypothesis: "I think X is the root cause because Y."
- Make the SMALLEST possible change to test it.
- One variable at a time.
- If it doesn't work, form a NEW hypothesis — don't stack more fixes.

**Phase 4 — Implementation:**
- Create a failing test case FIRST.
- Implement ONE fix addressing the root cause.
- Verify fix: tests pass, no regressions.
- If 3+ fixes have failed: STOP — question the architecture. Discuss before attempting more.

**Red flags — stop and return to Phase 1:**
- "Quick fix for now"
- "Just try changing X"
- Proposing solutions before tracing data flow
- "I don't fully understand but this might work"

---

### 6. VERIFICATION BEFORE COMPLETION

**THE IRON LAW: No completion claims without fresh verification evidence.**

Before claiming anything is done, fixed, or passing:
1. Identify what command proves the claim.
2. Run the FULL command fresh.
3. Read the full output, check exit code, count failures.
4. Only then make the claim — include the evidence.

**Never use:** "should work", "probably passes", "looks correct", "seems fine", "I'm confident".

Every positive claim requires a command run in this same message.

---

### 7. REQUESTING CODE REVIEW — Between Tasks

After implementing each task, review against the plan:
- Does the code match the spec exactly? (not more, not less)
- Are there missing requirements?
- Are there extra/unrequested additions?
- Code quality: naming, duplication, complexity, test coverage.

Critical issues block progress. Fix before moving to the next task.

---

### 8. FINISHING A DEVELOPMENT BRANCH — When Work is Complete

When all tasks are done:
1. Verify ALL tests pass.
2. Determine the base branch.
3. Present exactly these 4 options:
   - Merge back to `<base-branch>` locally
   - Push and create a Pull Request
   - Keep the branch as-is
   - Discard this work
4. Execute the chosen option.
5. Clean up the worktree (for options 1 and 4).

For "Discard": require typed confirmation `discard` before proceeding.

---

## Quick Decision Reference

| Situation | Apply |
|-----------|-------|
| Starting any feature or task | Brainstorming → Writing Plans |
| About to write code | Using Git Worktrees first |
| Writing any implementation | Test-Driven Development |
| Encountered a bug or failure | Systematic Debugging |
| About to say "done" or "fixed" | Verification Before Completion |
| Finished a task | Code Review |
| All tasks complete | Finishing a Development Branch |

---

## Red Flags — Always Stop

- Writing code before a failing test exists
- Proposing fixes before root cause is found
- Claiming success without running verification
- Working directly on `main` without a worktree/branch
- YAGNI violations (building unrequested features)
- Skipping reviews between tasks

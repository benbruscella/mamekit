# MAMEKIT AGENT GUIDE

Read these in order before changing the project:

1. `README.md`
2. `docs/ARCHITECTURE.md`
3. `docs/ENGINEERING.md`

Those are the complete current documentation set. Files under `sessions/` are
historical evidence and may describe deleted architectures.

## HARD RULES

- MAMEKIT is a MAME-specific source compiler, not a general C++ transpiler.
- MAME hardware behavior must come from MAME AST/DSL lowering, the knowledge
  graph and typed generated IR.
- `src/ir` is the canonical BoardIR: neutral, imported by both sides, and it
  imports nothing outside itself.
- `src/runtime` is hardware-neutral browser hosting and generic IR execution.
  Do not add handwritten CPU, device, audio, video or board implementations.
- A hardware family is one package under `src/hardware/<family>/`. Its
  `runtime`-facing code wires generated IR; DSP, opcode semantics, register
  models and pixel loops belong in generated artifacts, never handwritten there.
- Dependency direction is compile -> IR -> execution, enforced by
  `src/ir/dependency-direction.spec.ts`.
- JSON stores generated data; TypeScript/JavaScript stores behavior.
- Complete generation starts by deleting `dist`.
- Generated output has one canonical location and must not import `src`.
- ROMs are never committed, served or deployed.
- Do not bind Control as a game input.
- Do not run your own dev server; assume the user is already running one.

## ENVIRONMENT AND GATES

- MAME source is normally at `../mame`.
- Node.js 23.6+ runs repository TypeScript directly.
- `npm run gen:all` generates every target with an acceptance contract. The set
  derives from `src/games/contracts.ts`; no target list is written by hand.
- Run `npm run test:unit`, `npm run audit:generated`, and relevant real-ROM
  acceptance after changes.
- Use `npm run test:generation` for broad parser, graph, IR, runtime or output
  topology changes; it clean-generates every required target.

Historical transcripts are listed in `sessions/ARCHIVE_INDEX.md`. Never treat a
transcript as permission to restore old handwritten runtime code.

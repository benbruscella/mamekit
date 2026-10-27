# Candidate games

Place an in-progress `<game>.game.ts` and `<game>.game.spec.ts` pair here.
Candidates participate in clean generation and compiler CI, and are published
in the catalog labelled EXPERIMENTAL, but are excluded from the accepted
real-ROM sweeps until promoted. `npm run test:candidates` runs their contracts
locally; quote its result in a PR that touches a candidate. CI runs them only
when started by hand (Actions -> CI -> Run workflow); on a PR the job shows as
skipped.

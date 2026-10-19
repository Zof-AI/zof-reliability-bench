# Zof Reliability Benchmark

A transparent local benchmark for eleven synthetic reliability cases across ten categories. It runs the ten public failure-lab scenarios plus an actual file-handle cleanup regression, compares observed state with documented expectations, and exports portable Evidence 1.0.0. It has no commercial scoring model, network service, or competitor rankings.

This is an unpublished 0.1.0 candidate. Its evidence-spec and failure-lab dependencies must be staged from reviewed local tarballs until approved publication. After publication use `npm ci --ignore-scripts`; before publication a release coordinator can seed an isolated npm cache and use `npm ci --offline --ignore-scripts` with the committed intended registry lock.

Requires Node.js 22 or later. Then:

```sh
npm run build
node dist/cli.js compare
node dist/cli.js run --variant fixed --format markdown
node dist/cli.js run --variant broken
npm test
```

The defective reference command exits 1 because its regressions fail. Fixed exits 0. Invalid arguments exit 2. Comparison reports both executed references and exits 0 on a completed comparison. `--iterations 1..10` repeats the cases; no external tool commands are accepted.

Three working examples:

```sh
node examples/compare.mjs
node examples/repeat.mjs
node examples/task.mjs
```

Library exports: `runBenchmark({variant:'broken'|'fixed',iterations?,label?})`, `compareReferences()`, `toMarkdown(report)`, `listEvaluationTasks()`, `getEvaluationTask(id)`. Report fields include suiteVersion, reference variant, iteration count, passed/total/score, categories, actual results, and evidence with runtime/OS/architecture.

The public data-only evaluation tasks provide bounded input/expected-output cases for the separate agent-evals sandbox harness. The synthetic candidate fixture demonstrates defective and corrected payment deduplication. No candidate code supplied by a user is executed by this benchmark package.

Read [methodology](docs/METHODOLOGY.md) before interpreting results. Candidate package and publication approval requirements are in [release guidance](docs/RELEASE.md).

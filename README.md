# Zof Reliability Benchmark

A transparent local benchmark for eleven synthetic reliability cases across ten categories. It runs the ten public failure-lab scenarios plus an actual file-handle cleanup regression, compares observed state with documented expectations, and exports portable Evidence 1.0.0. It has no commercial scoring model, network service, or competitor rankings.

Version 0.1.0 is prepared under the Apache-2.0 license. Use the GitHub source installation below; npm registry publication is not claimed.

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

Read [methodology](docs/METHODOLOGY.md) before interpreting results. Distribution and maintenance procedures are in [release guidance](docs/RELEASE.md).
<!-- ZOF_RELEASE_INSTALL_START -->
## Install from GitHub source

Requires Node.js 22 or 24, npm, and Git. Filesystem operations require Linux or macOS with Python 3.10 or newer; Windows file operations fail closed. Clone this repository and explicitly prepare its reviewed release dependencies:

```sh
git clone https://github.com/Zof-AI/zof-reliability-bench.git
cd zof-reliability-bench
node scripts/bootstrap.mjs --allow-network
npm ci --ignore-scripts --prefer-offline
npm run build
npm test
```

The bootstrap downloads only the exact `v0.1.0` dependency assets from [GitHub Releases](https://github.com/Zof-AI/zof-reliability-bench/releases), as listed in `scripts/release-dependencies.json`, verifies SHA256 and byte size, and adds them to the npm cache. It does not extract archives, run package scripts, collect application data, or send credentials. Downloads require the explicit flag and follow only HTTPS GitHub asset redirects. Installation then fetches ordinary third-party dependencies from npm. Use a writable npm cache; set `npm_config_cache` consistently for both commands if needed. An unavailable asset, changed hash, or oversized response stops installation.

GitHub source and release artifacts are the initial distribution channel. These instructions do not claim that `@zof-ai` packages are published on npm or that the VS Code extension is listed in Marketplace.
<!-- ZOF_RELEASE_INSTALL_END -->


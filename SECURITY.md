# Security policy

The 0.1.x line is the initial supported candidate. Local analyses are bounded and offline unless an operation is explicitly documented otherwise. Do not provide production secrets or execute untrusted generated code.

Use GitHub private vulnerability reporting when enabled for this repository. If it is unavailable, contact an organization owner through an already verified private channel; do not file credentials, exploit details, or customer data in a public issue. A verified reporting channel must be enabled before public release. Reports will be triaged, reproduced using synthetic data, fixed and reviewed before coordinated disclosure. No response SLA is promised during prerelease development.

The benchmark executes only bundled public reference implementations selected by an enum. No arbitrary command, path, candidate code, environment capture or network behavior is supported. The resource-cleanup case creates only a fresh temporary directory, closes its deliberately leaked handle after measurement, and removes the directory. User labels are bounded and redacted. Synthetic outcomes are not evidence authenticity or production safety guarantees.

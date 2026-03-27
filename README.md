# Aave Governance Cache

Cache generator for the [Aave Governance V3 Interface](https://github.com/aave-dao/aave-governance-interface). It fetches governance, voting machine, payload, and IPFS metadata, stores the raw cache under `cache/`, and derives UI-ready proposal/event files under `cache/ui/`.

A GitHub Actions workflow runs every 3 hours and commits cache updates back to the repository.

## Requirements

- Node.js 22 (`.nvmrc` is pinned to `22`)
- Corepack-enabled Yarn 1 (`packageManager` is pinned to `yarn@1.22.22`)

## Setup

```bash
corepack enable
corepack yarn install --frozen-lockfile
```

Create a `.env` file or provide the same variables through GitHub Actions secrets.

## Configuration

You need RPC access for the governance core chain and any voting machine / payload chains you want to refresh.

Recommended:

- `ALCHEMY_API_KEY`

Optional overrides:

- `CORE_NETWORK=mainnet` or `CORE_NETWORK=sepolia`
- `IPFS_GATEWAY=https://...`
- Per-chain `RPC_*` variables such as `RPC_MAINNET`, `RPC_POLYGON`, `RPC_AVALANCHE`, `RPC_OPTIMISM`, `RPC_BASE`, `RPC_ARBITRUM`, `RPC_ZKEVM`, `RPC_ZKSYNC`, `RPC_XLAYER`, `RPC_SEPOLIA`, `RPC_AVALANCHE_FUJI`

Notes:

- Per-chain `RPC_*` variables take precedence over `ALCHEMY_API_KEY`.
- The scripts rely on `@bgd-labs/toolbox` RPC resolution, so additional supported `RPC_*` variables can also be used.
- Public fallback RPCs are best-effort only. For CI or scheduled runs, provide explicit RPC credentials for the chains you need to refresh.
- `cache:parse` is not a pure file split step. It also performs RPC reads and ENS lookups while producing the UI cache.

## Local Usage

```bash
yarn typecheck
yarn cache:update
yarn cache:parse
```

What each command does:

- `cache:update` fetches on-chain governance, voting machine, payload, event, and IPFS data into `cache/`.
- `cache:parse` derives per-proposal UI files in `cache/ui/<network>/...`.
- `typecheck` validates the TypeScript entrypoints used by the workflow.

## GitHub Actions

The scheduled workflow in `.github/workflows/update-cache.yml`:

1. Installs dependencies with the lockfile
2. Runs `typecheck`
3. Runs `cache:update`
4. Runs `cache:parse`
5. Commits changes to `cache/` if anything changed

At minimum, set `ALCHEMY_API_KEY` or a suitable set of per-chain `RPC_*` secrets before enabling the workflow.

## License

[MIT](./LICENSE) - Copyright 2026 Aave DAO

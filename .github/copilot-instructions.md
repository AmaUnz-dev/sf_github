# Copilot Instructions for sf_github

- This repository is a Salesforce DX app. The source lives under `force-app/main/default`, with Lightning Web Components in `force-app/main/default/lwc/`.
- The repo currently contains a single LWC component: `force-app/main/default/lwc/createAccountForm/`. It uses `@salesforce/schema` imports plus `lightning/uiRecordApi` to create `Account` records.
- Keep changes aligned with Salesforce metadata structure: component bundles are grouped in the same directory and include `.js`, `.html`, `.css`, and `.js-meta.xml`.
- Follow the existing LWC pattern in `createAccountForm.js`: state fields, `handleXChange` methods for input bindings, and a single `handleCreate()` flow that validates `accountName`, builds `fields`, calls `createRecord()`, and handles success/error state.
- Use `@track` on mutable fields in component state to match the current code style.

## Build, lint, and test commands

- `npm install` to install dependencies.
- `npm run lint` runs ESLint on Aura and LWC JavaScript files.
- `npm run prettier` formats Salesforce source files and metadata (`.cls`, `.xml`, `.html`, `.js`, `.json`, `.md`, `.yaml`, `.yml`, etc.).
- `npm run prettier:verify` checks formatting without applying changes.
- `npm run test:unit` runs LWC Jest tests using `sfdx-lwc-jest`.
- `npm run test:unit:watch` and `npm run test:unit:debug` are available for interactive LWC test development.

## Project-specific conventions

- Use Salesforce CLI project conventions from `sfdx-project.json`. The package directory is `force-app`, and `sourceApiVersion` is `66.0`.
- JavaScript linting is configured by `eslint.config.js`.
  - `**/lwc/**/*.js` uses `@salesforce/eslint-config-lwc/recommended`.
  - LWC test files under `**/lwc/**/*.test.js` disable `@lwc/lwc/no-unexpected-wire-adapter-usages` and allow Node globals.
- The repository uses Husky + lint-staged to auto-format and lint changed files before commit.

## CI and deployment

- GitHub Actions workflows are defined under `.github/workflows/`.
- `dev-deployment.yml` deploys only on `push` to branch `OrgSource` and only when `force-app/**` changes.
- `pmd-analysis.yml` runs PMD static analysis on Apex source under `force-app/main/default` using `config/ruleset.xml`.
- When making changes that touch Apex or Salesforce metadata, be aware that PMD will validate best-practices, security, and performance rules.

## Integration points and external dependencies

- The UI component uses standard Salesforce LWC base components: `lightning-card`, `lightning-input`, `lightning-combobox`, `lightning-button`, and `lightning-spinner`.
- The component imports schema definitions from `@salesforce/schema/Account` and field schema values like `Account.Name`, `Account.Phone`, `Account.Website`, and `Account.Industry`.
- Deployment automation uses the Salesforce CLI and the `sf` command in GitHub Actions, including JWT auth and delta package deployment.

## What to avoid

- Do not rearrange the Salesforce metadata bundle layout; keep component files together and preserve the LWC bundle structure.
- Do not assume there are multiple components or Apex classes yet; the current implementation surface is minimal, so use existing patterns from `createAccountForm/`.
- Avoid introducing custom server-side logic without explicit need; this repo is focused on a simple Salesforce UI app pattern.

## If you need clarification

- Ask whether the requested change should target a new metadata bundle under `force-app/main/default/lwc/` or extend the existing `createAccountForm` sample.
- Confirm if a change should also include tests with `sfdx-lwc-jest`, since there are currently no LWC test files in the repository.

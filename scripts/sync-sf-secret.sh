#!/bin/bash
set -e

# Default alias or use first argument
ORG_ALIAS="${1:-git_sample}"

echo "Fetching SFDX Auth URL for org: $ORG_ALIAS..."
AUTH_URL=$(sf org display --target-org "$ORG_ALIAS" --verbose --json | jq -r '.result.sfdxAuthUrl')

if [ -z "$AUTH_URL" ] || [ "$AUTH_URL" == "null" ]; then
  echo "Error: Could not retrieve sfdxAuthUrl for '$ORG_ALIAS'."
  echo "Make sure the org is authenticated locally using: sf org login web --alias $ORG_ALIAS"
  exit 1
fi

echo "Uploading secret to GitHub Actions..."
gh secret set SFDX_AUTH_URL -b "$AUTH_URL"

echo "Done! SFDX_AUTH_URL secret has been updated in GitHub for org: $ORG_ALIAS"

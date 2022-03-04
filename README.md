# Deploy a Zup to Zuplo Github Action

Usage:

```yaml
name: Build & Release
on: [push]

jobs:
  build:
    name: Build & Release
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: "yarn"

      - run: yarn install
    
      - uses: zuplo/deploy-zup-action@v1
        with:
          project: my-zup
          environment: production
          github_npm_token: ${{ secrets.GH_NPM_PACKAGE_READ_TOKEN }}
          account_id: 4f59a390b9f139a4a82b757edd3c71dd
          api_token: ${{ secrets.ZUPLO_CF_API_TOKEN }}
```
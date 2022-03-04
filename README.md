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

      # Run tests or linting if you want
      - run: yarn test
      - run: yarn lint

      # ::: IMPORTANT :::
      # Make sure to always build for workers before deploy
      - run: yarn build --platform worker
        env:
          API_VERSION: ${{ env.GITHUB_SHA }}
      - uses: zuplo/deploy-zup-action@v2
        with:
          project: my-zup
          environment: production
        env:
          CF_ACCOUNT_ID: 4f59a390b9f139a4a82b757edd3c71dd
          CF_API_TOKEN: ${{ secrets.ZUPLO_CF_API_TOKEN }}
```

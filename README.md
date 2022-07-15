# Deploy a Zup to Zuplo Github Action

Usage:

```yaml
- uses: zuplo/deploy-zup-action@main
  with:
    project: my-zup
    environment: production
    account_id: 4f59a390b9f139a4a82b757edd3c71dd
    api_token: ${{ secrets.ZUPLO_CF_API_TOKEN }}
```

Full Example:

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
          cache: "npm"

      - run: npm install

      # Run tests or linting if you want
      - run: npm run test
      - run: npm run lint

      # Make sure to always build for workers before deploy
      # If you run `npm run test` before deploy, it may leave a
      # build for node which will cause the deploy to fail
      - run: npm run build
        env:
          GIT_SHA: ${{ github.sha }}
          API_VERSION: ${{ github.run_id }}

      - uses: zuplo/deploy-zup-action@main
        with:
          project: my-zup
          environment: production
          account_id: 4f59a390b9f139a4a82b757edd3c71dd
          api_token: ${{ secrets.ZUPLO_CF_API_TOKEN }}
```

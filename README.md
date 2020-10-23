# Skypack Quality Score Action

> Integrate Skypack's Quality Score check into your CI

[![Build Status](https://github.com/gr2m/skypack-quality-score-action/workflows/Test/badge.svg)](https://github.com/gr2m/skypack-quality-score-action/actions)

## Usage

```yml
Name: Skypack Package Score
on:
  push:
    branches:
      - main
  pull_request:
    types:
      - opened
      - synchronize

jobs:
  packageScore:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gr2m/skypack-quality-score-action@v1
```

## Debugging

To see additional debug logs, create a secret with the name: `ACTIONS_STEP_DEBUG` and value `true`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[ISC](LICENSE)

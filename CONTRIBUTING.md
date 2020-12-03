# How to contribute

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md).
By participating in this project you agree to abide by its terms.

## Merging the Pull Request & releasing a new version

Releases are automated using [semantic-release](https://github.com/semantic-release/semantic-release) via the [release GitHub Action workflow](.github/workflows/release.yml).

The following commit message conventions determine which version is released:

1. `fix: ...` or `fix(scope name): ...` prefix in subject: bumps fix version, e.g. `1.2.3` → `1.2.4`
2. `feat: ...` or `feat(scope name): ...` prefix in subject: bumps feature version, e.g. `1.2.3` → `1.3.0`
3. `BREAKING CHANGE:` in body: bumps breaking version, e.g. `1.2.3` → `2.0.0`

Only one version number is bumped at a time, the highest version change trumps the others.

`semantic-release` does the following

1. Create a git tag for the new version, prefixed with `v`, e.g. `v1.2.3`
2. Create a GitHub release for the new tag, with the same name
3. Add change logs based on the commit messages

As part of the [release GitHub Action workflow](.github/workflows/release.yml) workflow, a single binary file is compiled `npm run build`, and the changes are pushed to the release branch (e.g. `v1`), so that users will automatically receive new fix/feature versions.

If the pull request looks good but does not follow the commit conventions, use the "Squash & merge" button.

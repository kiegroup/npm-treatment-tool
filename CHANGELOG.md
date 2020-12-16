# Changelog

# V2.5 (next release)

## Enhancements:

- `custom-command-treatment` CLI option

# V2.4

## Enhancements:

- `starting-project` input added
- env variables treated from commands
- export command treated
- token not mandatory

## Bugs:

- Error treating export commands like `export DROOLS_VERSION=mvn org.apache.maven.plugins:maven-help-plugin:evaluate -Dexpression=project.version | grep ^7` will execute `export DROOLS_VERSION=mvn org.apache.maven.plugins:maven-help-plugin:evaluate -Dexpression=project.version | grep ^7 -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn -B`. Fixed.

# V2.3

## Enhancements:

- token added to git commands to avoid private repositories problem from CLI execution
- clone option added

# V2.2

## Enhancements:

- command line ready
- full downstream flow added either for CLI and github action
- single flow added either for CLI and github action
- @kie/build-chain-configuration-reader dependency upgraded to ^2.0.2
- branch flow added for CLI
- skip build mechanism
- configuration file version <2.0 is no longer supported
- checkout mechanism improved

# V2.1

[Link](https://github.com/kiegroup/github-action-build-chain/releases/tag/v2.1)

## Enhancements:

- @kie/build-chain-configuration-reader dependency upgraded to ^0.0.6

# V2.0

[Link](https://github.com/kiegroup/github-action-build-chain/releases/tag/v2.0)

## Enhancements:

- artifacts in case of failure
- centralized flow definition file
- definition-file input added
- rest of inputs removed since they are not needed anymore
- default configuration for every project
- before and after commands added

# V1.4

[Link](https://github.com/kiegroup/github-action-build-chain/releases/tag/v1.4)

## Enhancements:

- archive-artifacts-dependencies
- checkout info summary

# V1.3

[Link](https://github.com/kiegroup/github-action-build-chain/releases/tag/v1.3)

## Bugs:

- `Cannot read property 'artifactItems' of undefined` error fixed

# V1.2

[Link](https://github.com/kiegroup/github-action-build-chain/releases/tag/v1.2)

## Bugs:

- Mapping error solved

# V1.1

[Link](https://github.com/kiegroup/github-action-build-chain/releases/tag/v1.1)

- Just contributors added

# V1.0

- add/rewrite scope from package.json name

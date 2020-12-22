# npm treatment tool

a js tool to treat npm projects. The tool is either ready for CLI execution and for Github Action flows.

## Tools

### Name

It basically checks all package.json in a project, gets the project name from them and replace every relation from every package.json, .js, .ts and .tsx files by the new scope.

#### Arguments

- `-s,-scope` the scope to add/replace. It can be with or without `@`
- `-np,-name-prefix` the prefix to add to every package
- `-ns,-name-suffix` the suffix to add to every package
- `-i,-ignore-pattern` a RegEx expression to exclude package.json scanning.

```
npm-tt name -s @newScope
npm-tt name -s newScope
npm-tt name -np "new-prefix-"
npm-tt name -ns "new-suffix-"
npm-tt name -s scopex -np "prefixX-" -ns "suffixX-"
```

Additionally it is possible to ingnore package files from multi-package project in order no to get package name identifiers, with the `-i` flag followed by regular expressions.

```
npm-tt name -s @scopeX -i "packages\/.*dist\/.*"
npm-tt name -s @scopeY -i "packages\/.*dist\/.*" "dist\/.*"
```

## Note for the community

In case you use the tool and one of the replacements from any of your files is due the case has not been covered by the tool yet. Please feel free to cover the case from `src/lib/replacement` or to open a new ticket on https://github.com/kiegroup/npm-treatment-tool/issues

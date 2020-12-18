# npm treatment tool

a js tool to treat npm projects. The tool is either ready for CLI execution and for Github Action flows.

## Tools

### Scope

It basically checks all package.json in a project, gets the project name from them and replace every relation from every package.json, .js, .ts and .tsx files by the new scope.

```
npm-tt scope -s @newScope
npm-tt scope -s newScope
```

Additionally it is possible to ingnore package files from multi-package project in order no to get package name identifiers, with the `-i` flag followed by regular expressions.

```
npm-tt scope -s @scopeX -i "packages\/.*dist\/.*"
npm-tt scope -s @scopeY -i "packages\/.*dist\/.*" "dist\/.*"
```

## Note for the community

In case you use the tool and one of the replacements from any of your files is due the case has not been covered by the tool yet. Please feel free to cover the case from `src/lib/replacement` or to open a new ticket on https://github.com/kiegroup/npm-treatment-tool/issues

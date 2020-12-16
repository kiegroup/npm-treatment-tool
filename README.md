# package.json treatment tool

a js tool to treat package.json files. The tool is either ready for CLI execution and for Github Action flows.

## Tools

### Scope

Add/rewrite scope from package.json. It is possible to execute it in a recursive way for multi package projects.

```
package-json-tt name add-scope -s @newScope
package-json-tt name add-scope -s newScopeX --recursive
```

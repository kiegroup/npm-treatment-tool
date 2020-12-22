class PackageRename {
  constructor(
    values = { scope: undefined, prefix: undefined, suffix: undefined }
  ) {
    this.scope = values.scope;
    this.prefix = values.prefix;
    this.suffix = values.suffix;
  }
}

module.exports = PackageRename;

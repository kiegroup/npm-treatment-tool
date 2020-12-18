/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const glob = require("glob");

function getListPackageJsonFiles(
  options = { ignore: "**/node_modules/**", additionalIgnorePatterns: [] }
) {
  const filePaths = glob.sync("**/package.json", options);
  return options.additionalIgnorePatterns &&
    options.additionalIgnorePatterns.length > 0
    ? filePaths.filter(
        filePath =>
          !options.additionalIgnorePatterns.find(regex =>
            filePath.match(new RegExp(regex))
          )
      )
    : filePaths;
}

async function getFileList(options = { ignore: "**/node_modules/**" }) {
  const patterns = ["**/*.ts", "**/*.tsx", "**/package.json", "**/*.js"];
  return (
    await Promise.all(
      patterns.map(
        pattern =>
          new Promise((resolve, reject) => {
            glob(pattern, options, (err, matches) => {
              if (!err && options.strict && matches.length === 0) {
                reject(new Error("'" + pattern + "' matched no files"));
              } else if (err) {
                reject(err);
              } else {
                resolve(matches);
              }
            });
          })
      )
    )
  ).flat();
}

module.exports = { getListPackageJsonFiles, getFileList };

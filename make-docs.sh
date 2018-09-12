#!/bin/bash
set -e
version=$(node -e "console.log(require('./package.json').version)")

echo "<h1>Docs for version ${version}</h1>" > dist/sphinx/index.html
echo "${version}" > dist/sphinx/.version


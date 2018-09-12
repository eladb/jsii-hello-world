#!/bin/bash
set -e
version=$(node -e "console.log(require('./package.json').version)")
mkdir -p dist/docs

echo "<h1>Docs for version ${version}</h1>" > dist/docs/index.html
echo "${version}" > dist/docs/.version


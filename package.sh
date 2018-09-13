#!/bin/bash
set -euo pipefail
jsii-pacmak

name="$(node -e "process.stdout.write(require('./package.json').name)")"
version="$(node -e "process.stdout.write(require('./package.json').version)")"

# create build.json, required for "docs" and "github" publishers
cat > dist/build.json <<HERE
{
    "name": "${name}",
    "version": "${version}"
}
HERE

# create dist/docs
mkdir -p dist/docs
echo "<h1>Docs for version ${version}</h1>" > dist/docs/index.html

# deploy CHANGELOG.md
cp ./CHANGELOG.md dist
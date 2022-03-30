#!/bin/bash

set -ex

git fetch

git checkout origin/master -- '*package.json'
git checkout origin/master -- '*CHANGELOG.md'

if [ -z $(git status --porcelain) ];
then
    echo "✔ Branch is up to date. Continue..."
else
    echo "👮 Found uncommitted files on branch. Exiting."
    echo git status
    exit 1
fi

const { execSync } = require('child_process');
const { version } = require('./package.json');

// See if package.json is different on master
execSync('git checkout origin/master package.json');

const { version: lastVersion} = require('./package.json');

// Local version is different from master
if (version !== lastVersion) {
  throw new Error(
    'You should not change package.json versions yourself in a Pull Request. If it is a pre-release you are working on, always get back package versions from origin/master before merging',
  );
}
console.log(version, "Versions are in sync with origin/master");

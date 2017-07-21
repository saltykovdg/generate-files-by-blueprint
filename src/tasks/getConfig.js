import chalk from 'chalk';

/**
 * Check whether the given config is valid or not
 * @param config
 * @returns {boolean}
 */
const validateConfig = config => {
  let valid = true;
  const requiredKeys = ['blueprints'];
  const requiredBlueprintKeys = ['name', 'description', 'usage', 'files'];
  const requiredFileKeys = ['blueprint-path', 'target-path'];

  if (!requiredKeys.every(c => c in config)) {
    return false;
  }

  config.blueprints.forEach(b => {
    if (!requiredBlueprintKeys.every(c => c in b)) {
      valid = false;
    } else {
      if (b.files) {
        b.files.forEach(file => {
          if (!requiredFileKeys.every(c => c in file)) {
            valid = false;
          }
        });
      }
    }
  });

  return valid;
};

export default () => {
  try {
    const config = require(`${process.cwd()}/gen-files-config.json`);
    if (!validateConfig(config)) {
      console.log(chalk.red('Your config is invalid.'));
      process.exit(1);
    }
    return config;
  } catch (e) {
    console.log(chalk.red('Make sure your are in root directory of your project.'));
    return process.exit(1);
  }
};

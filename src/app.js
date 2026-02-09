const fs = require('fs');
const path = require('path');

/**
 * @param {string} source
 * @param {string} destination
 */
const moveFile = (source, destination) => {
  const fromPath = path.resolve(source);
  let toPath = path.resolve(destination);

  if (!fs.existsSync(fromPath)) {
    // eslint-disable-next-line no-console
    console.error(`Source file does not exist: ${fromPath}`);

    return;
  }

  if (!fs.statSync(fromPath).isFile()) {
    // eslint-disable-next-line no-console
    console.error(`Source is not a file: ${fromPath}`);

    return;
  }

  const destEndsWithSeparator = /[/\\]$/.test(destination);

  if (fs.existsSync(toPath)) {
    const destStatus = fs.statSync(toPath);

    if (destStatus.isDirectory()) {
      toPath = path.join(toPath, path.basename(fromPath));
    } else if (destEndsWithSeparator) {
      // eslint-disable-next-line no-console
      console.error(`Destination is not a directory: ${toPath}`);

      return;
    }
  } else if (destEndsWithSeparator) {
    // eslint-disable-next-line no-console
    console.error(`Destination directory does not exist: ${toPath}`);

    return;
  } else {
    const parentDir = path.dirname(toPath);

    if (!fs.existsSync(parentDir)) {
      // eslint-disable-next-line no-console
      console.error(`Destination directory does not exist: ${parentDir}`);

      return;
    }
  }

  fs.renameSync(fromPath, toPath);
};

const parameters = process.argv.slice(2);

if (parameters.length !== 2) {
  // eslint-disable-next-line no-console
  console.error('Usage: node app.js <source> <destination>');
} else {
  const [from, to] = parameters;

  moveFile(from, to);
}

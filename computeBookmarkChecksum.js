// file: compute_bookmark_checksum.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * regenChecksum from gist: calculate Chrome bookmark checksum
 * Takes the `roots` object (bookmark_bar, other, synced)
 * Returns the MD5 checksum (hex).
 */
function regenChecksum(roots) {
  // from https://gist.github.com/dcantu476/ac8d4ae63a6a22c6a6fda7d8f9fb3039
  const digest = crypto.createHash('md5');

  const digestUrl = (url) => {
    digest.update(url['id'], 'ascii');
    digest.update(url['name'], 'utf16le');
    digest.update(Buffer.from('url'));
    digest.update(url['url'], 'ascii');
  };

  const digestFolder = (folder) => {
    digest.update(folder['id'], 'ascii');
    digest.update(folder['name'], 'utf16le');
    digest.update(Buffer.from('folder'));
    if (folder['children']) {
      for (const child of folder['children']) {
        updateDigest(child);
      }
    }
  };

  const updateDigest = (node) => {
    if (node.type === 'folder') {
      digestFolder(node);
    } else {
      digestUrl(node);
    }
  };

  // calls updateDigest on bookmark_bar, other, synced in necessary order (as per gist)
  updateDigest(roots['bookmark_bar']);
  updateDigest(roots['other']);
  updateDigest(roots['synced']);

  return digest.digest('hex');
}

function main() {
  if (process.argv.length < 3) {
    console.error('Usage: node compute_bookmark_checksum.js <path_to_json_file>');
    process.exit(1);
  }

  const jsonPath = path.resolve(process.argv[2]);

  try {
    const fileContent = fs.readFileSync(jsonPath, 'utf8');
    const bookmarks = JSON.parse(fileContent);

    if (!bookmarks.roots) {
      console.error("Error: JSON does not contain a 'roots' property.");
      process.exit(1);
    }

    const checksum = regenChecksum(bookmarks.roots);
    console.log(checksum);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

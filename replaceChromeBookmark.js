// file: compute_bookmark_checksum.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { json } = require('stream/consumers');

const rootNames = ['bookmark_bar','other', 'synced'];

function getBookmarksJson(fp) {
  const fileContent = fs.readFileSync(fp, 'utf8');
  const bookmarks = JSON.parse(fileContent);

  if (!bookmarks.roots) {
    throw new Error("Error: JSON does not contain expected 'roots' property");
  }
  return bookmarks;
}

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

  rootNames.forEach(rn => updateDigest(roots[rn]));

  return digest.digest('hex');
}

function forBookmarksWithName(bookmarks, name, action) {
  for (const rn of rootNames) {
    for (const bm of bookmarks.roots[rn].children) {
      if (bm["name"] == name) {
        action(bm, rn);
      }
    }
  }
}

function assertBookmarkName(bookmarks, name) {
  let found = [];
  forBookmarksWithName(bookmarks, name, (bm, rn) => found.push(rn));
  if (!found.length) {
    throw new Error(`Bookmark entry not found: ${name}`);
  } else if (found.length > 1) {
    throw new Error(`Non-unique bookmark names are not supported. ${name} found in: ${found.join(', ')}`);
  }
}

function updateBookmark(bookmarks, name, value) {
  forBookmarksWithName(bookmarks, name, (bm) => {
    bm["url"] = value;
    console.log(`[updateBookmark] Set value for: ${name}`);
  });
}

function readFileContent(filename) {
  const fp = path.resolve(__dirname, 'compiled', filename);
  if (!fs.existsSync(fp)) {
    throw Error(`[readFileContent] File not found: ${fp}`);
  }
  try {
    const content = fs.readFileSync(fp, 'utf8');
    return content;
  } catch (err) {
    throw Error(`[readFileContent] Failed for ${fp}: ${err.message}`);
  }
}

function replaceJsonContent(fp, json) {
  // overwrite original JSON file
  fs.writeFileSync(
    fp,
    JSON.stringify(json, null, 3), // pretty-print with 3 spaces, matching Chrome's format
    'utf8'
  );
  console.log(`[replaceJsonContent] Updated json written to ${fp}`);
}

function main() {
  if (process.argv.length < 5) {
    console.error('Usage: node replaceChromeBookmark.js <path_to_Bookmarks_json_file> <bookmark_name> <compiled_filename>');
    process.exit(1);
  }

  const jsonPath = path.resolve(process.argv[2]);
  const bookmarkName = process.argv[3];
  const compiledFilename = process.argv[4];

  try {
    const bookmarks = getBookmarksJson(jsonPath);
    const compiledJs = readFileContent(compiledFilename);
    assertBookmarkName(bookmarks, bookmarkName);
    updateBookmark(bookmarks, bookmarkName, compiledJs);
    const checksum = regenChecksum(bookmarks.roots);
    console.log(`new bookmarks checksum: ${checksum}`);
    bookmarks.checksum = checksum;
    replaceJsonContent(jsonPath, bookmarks); 
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();

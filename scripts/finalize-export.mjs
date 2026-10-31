import fs from 'node:fs/promises';
import path from 'node:path';
// Next.js upstream issue #92339: Windows export can leave segment-cache paths
// nested instead of dot-separated. Publish the filenames requested by the router.
// Linux exports already have these filenames and are unchanged.
const root = path.resolve('out');
let aliases = 0;
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    const parts = path.relative(root, file).split(path.sep);
    const index = parts.findIndex((p) => p.startsWith('__next.'));
    if (index >= 0 && index < parts.length - 1) {
      const target = path.join(root, ...parts.slice(0, index), parts.slice(index).join('.'));
      await fs.copyFile(file, target);
      aliases++;
    }
  }
}
await walk(root);
await fs.writeFile(path.join(root, '.nojekyll'), '');
console.log(`Static export ready; ${aliases} Windows navigation-file aliases added.`);

import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out'),
  prefix = process.env.NEXT_PUBLIC_BASE_PATH || '/fse-atlas';
let pages = 0;
const broken = new Set();
async function exists(file) {
  try {
    const stat = await fs.stat(file);
    return stat.isDirectory() ? await exists(path.join(file, 'index.html')) : true;
  } catch {
    return false;
  }
}
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!file.endsWith('.html')) continue;
    pages++;
    const html = await fs.readFile(file, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (!value.startsWith('/')) continue;
      if (prefix && value !== prefix && !value.startsWith(prefix + '/')) {
        broken.add(`${path.relative(root, file)}: unprefixed ${value}`);
        continue;
      }
      const url = new URL(value, 'http://example.test');
      const target = path.resolve(
        root,
        '.' + decodeURIComponent(url.pathname.slice(prefix.length)),
      );
      if (!(await exists(target)))
        broken.add(`${path.relative(root, file)}: missing ${value}`);
    }
  }
}
await walk(root);
if (broken.size) {
  console.error([...broken].join('\n'));
  process.exit(1);
}
console.log(
  `Checked ${pages} exported HTML pages: internal routes and assets resolve under ${prefix || '/'}.`,
);

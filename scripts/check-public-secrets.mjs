import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function findCredentials(root) {
  const matches = [];
  const patterns = [
    /AIza[0-9A-Za-z_-]{35}/,
    /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})/,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  ];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) matches.push(...findCredentials(file));
    else if (/\.(?:js|css|html|json|map|txt)$/.test(entry.name)) {
      const content = fs.readFileSync(file, 'utf8');
      if (patterns.some((pattern) => pattern.test(content))) matches.push(file);
    }
  }
  return matches;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const matches = findCredentials(path.resolve('dist'));
  if (matches.length) {
    console.error('Deployment blocked: credential pattern in public assets. Values are redacted.');
    for (const file of matches) console.error(path.relative(process.cwd(), file));
    process.exitCode = 1;
  } else console.log('Public asset credential scan passed.');
}

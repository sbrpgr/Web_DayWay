import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { findCredentials } from './check-public-secrets.mjs';

test('blocks a credential bundled into a nested public asset without returning the value', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'public-asset-audit-'));
  try {
    fs.mkdirSync(path.join(dir, 'assets'));
    const file = path.join(dir, 'assets/app.js');
    const sample = 'AIza' + 'A'.repeat(35);
    fs.writeFileSync(file, `const key = '${sample}';`);
    assert.deepEqual(findCredentials(dir), [file]);
    fs.writeFileSync(file, 'const key = "YOUR_API_KEY_HERE";');
    assert.deepEqual(findCredentials(dir), []);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

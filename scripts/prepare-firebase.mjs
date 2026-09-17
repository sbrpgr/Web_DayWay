import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const manifest = require.resolve('firebase-tools/package.json');
if (JSON.parse(fs.readFileSync(manifest, 'utf8')).version !== '15.30.1') {
  throw new Error('Review the stream-json compatibility patch before changing Firebase CLI versions.');
}
const root = path.dirname(manifest);
const patches = {
  'lib/commands/auth-import.js': [
    ['require("stream-json/filters/Pick")', 'require("stream-json/filters/pick.js").default'],
    ['require("stream-json/streamers/StreamArray")', 'require("stream-json/streamers/stream-array.js")'],
    ['Pick.withParser(', 'Pick.withParserAsStream('],
    ['StreamArray.streamArray()', 'StreamArray.streamArray.asStream()'],
  ],
  'lib/frameworks/next/index.js': [
    ['require("stream-json/filters/Pick")', 'require("stream-json/filters/pick.js")'],
    ['require("stream-json/streamers/StreamObject")', 'require("stream-json/streamers/stream-object.js")'],
    ['(0, stream_json_1.parser)(', '(0, stream_json_1.parser.asStream)('],
    ['(0, Pick_1.pick)(', '(0, Pick_1.pick.asStream)('],
    ['(0, StreamObject_1.streamObject)(', '(0, StreamObject_1.streamObject.asStream)('],
  ],
  'lib/database/import.js': [
    ['require("stream-json/filters/Filter")', 'require("stream-json/filters/filter.js").default'],
    ['require("stream-json/streamers/StreamObject")', 'require("stream-json/streamers/stream-object.js")'],
    ['Filter.withParser(', 'Filter.withParserAsStream('],
    ['StreamObject.streamObject()', 'StreamObject.streamObject.asStream()'],
  ],
};
// Firebase 15.30.1 uses the v1 class/Node-stream API. The patched v3 package
// exposes explicit asStream adapters. Only these audited call sites are changed.
const writes = [];
for (const [relative, replacements] of Object.entries(patches)) {
  const file = path.join(root, relative);
  let source = fs.readFileSync(file, 'utf8');
  for (const [before, after] of replacements) {
    const count = source.split(before).length - 1;
    if (count === 1) source = source.replace(before, after);
    else if (count !== 0 || !source.includes(after)) {
      throw new Error(`Firebase compatibility patch no longer matches ${relative}`);
    }
  }
  writes.push([file, source]);
}
for (const [file, source] of writes) fs.writeFileSync(file, source);
console.log('Firebase stream-json compatibility patch verified.');

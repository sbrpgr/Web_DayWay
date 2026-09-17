import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { Readable } from 'node:stream';
import test from 'node:test';
const require = createRequire(import.meta.url);
const fromFirebase = createRequire(require.resolve('firebase-tools/package.json'));

test('patched Firebase Next.js JSON pipeline preserves dependency records', async () => {
  const { chain } = fromFirebase('stream-chain');
  const { parser } = fromFirebase('stream-json');
  const { pick } = fromFirebase('stream-json/filters/pick.js');
  const { streamObject } = fromFirebase('stream-json/streamers/stream-object.js');
  const pipeline = chain([
    Readable.from(['{"dependencies":{"react":{"version":"19.2.0","dependencies":{"nested":{"version":"1.0.0"}}},"vite":{"version":"6.4.3"}},"ignored":true}']),
    parser.asStream({ packValues: false, packKeys: true, streamValues: false }),
    pick.asStream({ filter: 'dependencies' }),
    streamObject.asStream(),
  ]);
  const values = [];
  for await (const value of pipeline) values.push(value);
  assert.deepEqual(values.map(({ key }) => key), ['react', 'vite']);
  assert.deepEqual(Object.keys(values[0].value.dependencies), ['nested']);
});

test('Firebase database importer handles nested paths without network writes', async () => {
  const Importer = require('firebase-tools/lib/database/import.js').default;
  const importer = new Importer(new URL('https://example.invalid/root'),
    Readable.from(['{"selected":{"a":{"value":1},"b":2},"ignored":3}']), '/selected', 100000, 1);
  importer.checkLocationIsEmpty = async () => {};
  const writes = [];
  importer.doWriteBatch = async (batch) => { writes.push(batch); return {}; };
  await importer.execute();
  assert.equal(writes.length, 1);
  assert.equal(writes[0].pathname, '/root/selected');
  assert.deepEqual(writes[0].json, { a: { value: 1 }, b: 2 });
});

test('patched CSV and UUID dependencies retain CLI APIs', () => {
  const { parse } = fromFirebase('csv-parse/sync');
  assert.deepEqual(parse('email,name\na@example.test,Ada', { columns: true }),
    [{ email: 'a@example.test', name: 'Ada' }]);
  const uuid = fromFirebase('uuid');
  assert.equal(uuid.validate(uuid.v4()), true);
});

test('Firebase user-import JSON pipeline preserves user records', async () => {
  const Chain = fromFirebase('stream-chain');
  const pick = fromFirebase('stream-json/filters/pick.js').default;
  const { streamArray } = fromFirebase('stream-json/streamers/stream-array.js');
  const users = [{ localId: 'fixture-user', email: 'fixture@example.test' }];
  const pipeline = new Chain([
    Readable.from([JSON.stringify({ users })]),
    pick.withParserAsStream({ filter: /^users$/ }),
    streamArray.asStream(),
  ]);
  const parsed = [];
  for await (const item of pipeline) parsed.push(item.value);
  assert.deepEqual(parsed, users);
});

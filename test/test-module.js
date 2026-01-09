const snappy = require('../dist/index.js');

console.log('Module loaded:', snappy);
console.log('Has compress:', typeof snappy.compress);
console.log('Has default:', typeof snappy.default);

// Try to use it
const buf = Buffer.from('Hello World');
try {
  const compressed = snappy.compress(buf);
  console.log('SUCCESS: compressed to', compressed.length, 'bytes');

  const decompressed = snappy.uncompress(compressed);
  console.log('Decompressed:', decompressed.toString());
} catch (e) {
  console.log('ERROR:', e.message);
  console.log(e.stack);
}


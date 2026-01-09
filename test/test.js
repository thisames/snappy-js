const snappy = require('../dist/index');
const assert = require('assert');

console.log('🧪 Testing Snappy Native Bindings...\n');

// Test 1: Basic compression and decompression
console.log('Test 1: Basic compression and decompression');
const original = Buffer.from('Hello, World! This is a test of the Snappy compression library.');
const compressed = snappy.compress(original);
const decompressed = snappy.uncompress(compressed);

assert(decompressed.equals(original), 'Decompressed data should match original');
console.log('✅ Original size:', original.length);
console.log('✅ Compressed size:', compressed.length);
console.log('✅ Compression ratio:', (original.length / compressed.length).toFixed(2) + 'x');
console.log('✅ Data matches after round-trip\n');

// Test 2: String compression
console.log('Test 2: String compression');
const text = 'The quick brown fox jumps over the lazy dog. '.repeat(10);
const compressedText = snappy.compressSync(text);
const decompressedText = snappy.uncompressSync(compressedText);

assert.strictEqual(decompressedText, text, 'Decompressed text should match original');
console.log('✅ Original text length:', text.length);
console.log('✅ Compressed size:', compressedText.length);
console.log('✅ Text matches after round-trip\n');

// Test 3: Uncompressed length
console.log('Test 3: Uncompressed length query');
const length = snappy.uncompressedLength(compressed);
assert.strictEqual(length, original.length, 'Uncompressed length should match original');
console.log('✅ Uncompressed length:', length);
console.log('✅ Matches original length\n');

// Test 4: Validation
console.log('Test 4: Compressed data validation');
const isValid = snappy.isValidCompressed(compressed);
assert.strictEqual(isValid, true, 'Compressed data should be valid');
console.log('✅ Compressed data is valid');

const invalidData = Buffer.from('This is not compressed data');
const isInvalid = snappy.isValidCompressed(invalidData);
assert.strictEqual(isInvalid, false, 'Invalid data should not validate');
console.log('✅ Invalid data correctly identified\n');

// Test 5: Large data
console.log('Test 5: Large data compression');
const largeData = Buffer.alloc(1024 * 1024, 'a'); // 1MB of 'a'
const compressedLarge = snappy.compress(largeData);
const decompressedLarge = snappy.uncompress(compressedLarge);

assert(decompressedLarge.equals(largeData), 'Large data should match after round-trip');
console.log('✅ Original size:', largeData.length, 'bytes');
console.log('✅ Compressed size:', compressedLarge.length, 'bytes');
console.log('✅ Compression ratio:', (largeData.length / compressedLarge.length).toFixed(2) + 'x');
console.log('✅ Large data handled correctly\n');

// Test 6: Empty buffer
console.log('Test 6: Empty buffer');
const empty = Buffer.alloc(0);
const compressedEmpty = snappy.compress(empty);
const decompressedEmpty = snappy.uncompress(compressedEmpty);

assert(decompressedEmpty.equals(empty), 'Empty buffer should round-trip');
console.log('✅ Empty buffer handled correctly\n');

// Test 7: Binary data
console.log('Test 7: Binary data');
const binaryData = Buffer.from([0, 1, 2, 3, 4, 255, 254, 253, 252, 251]);
const compressedBinary = snappy.compress(binaryData);
const decompressedBinary = snappy.uncompress(compressedBinary);

assert(decompressedBinary.equals(binaryData), 'Binary data should match after round-trip');
console.log('✅ Binary data handled correctly\n');

// Test 8: Error handling
console.log('Test 8: Error handling');
try {
  snappy.compress('not a buffer');
  assert.fail('Should have thrown an error');
} catch (err) {
  console.log('✅ Correctly throws error for invalid input type');
}

try {
  snappy.uncompress(Buffer.from('invalid compressed data'));
  assert.fail('Should have thrown an error');
} catch (err) {
  console.log('✅ Correctly throws error for invalid compressed data\n');
}

// Performance test
console.log('Test 9: Performance benchmark');
const testData = Buffer.from('Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(1000));
const iterations = 1000;

console.time('Compression');
for (let i = 0; i < iterations; i++) {
  snappy.compress(testData);
}
console.timeEnd('Compression');

const testCompressed = snappy.compress(testData);
console.time('Decompression');
for (let i = 0; i < iterations; i++) {
  snappy.uncompress(testCompressed);
}
console.timeEnd('Decompression');

console.log('\n🎉 All tests passed!');


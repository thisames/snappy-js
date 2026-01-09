# snappy-js

[![npm version](https://badge.fury.io/js/snappy-js.svg)](https://www.npmjs.com/package/snappy-js)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](LICENSE)

**Fast, native Node.js bindings for Google's Snappy compression library**

High-performance compression/decompression with pre-compiled binaries for major platforms. Written in TypeScript with full type definitions.

## 🚀 Features

- ⚡ **Blazing Fast**: Native C++ implementation, significantly faster than pure JavaScript alternatives
- 📦 **Pre-compiled Binaries**: Zero build time on supported platforms (Linux, macOS, Windows)
- 🔧 **TypeScript Support**: Full type definitions included
- 🎯 **Simple API**: Compress and decompress in a single function call
- 🌍 **Cross-platform**: Works on Linux, macOS, and Windows (x64, ARM64)
- 🔄 **Compatible**: Drop-in replacement for other Snappy libraries

## 📥 Installation

```bash
npm install snappy-js
```

No compilation required! Pre-built binaries are automatically downloaded for your platform.

### Requirements

- Node.js >= 14.0.0

### Building from Source (Optional)

If a pre-built binary is not available for your platform:

```bash
npm install snappy-js
```

Build tools will be automatically invoked. You'll need:
- Python 3
- C++ compiler (gcc, clang, or MSVC)
- make

## 📖 Usage

### Basic Example

```javascript
const snappy = require('snappy-js');

// Compress a Buffer
const data = Buffer.from('Hello, World!');
const compressed = snappy.compress(data);
console.log('Compressed:', compressed.length, 'bytes');

// Decompress
const decompressed = snappy.uncompress(compressed);
console.log('Decompressed:', decompressed.toString());
```

### TypeScript

```typescript
import { compress, uncompress } from 'snappy-js';

const data = Buffer.from('Hello, TypeScript!');
const compressed = compress(data);
const decompressed = uncompress(compressed);
```

### String Compression

```javascript
const snappy = require('snappy-js');

// Compress a string directly
const text = 'Lorem ipsum dolor sit amet...';
const compressed = snappy.compressSync(text);

// Decompress to string
const decompressed = snappy.uncompressSync(compressed);
console.log(decompressed); // 'Lorem ipsum dolor sit amet...'
```

### JSON Compression

```javascript
const snappy = require('snappy-js');

// Compress JSON
const data = { users: [...], posts: [...] };
const json = JSON.stringify(data);
const compressed = snappy.compressSync(json);

// Save to file or send over network
fs.writeFileSync('data.snappy', compressed);

// Decompress JSON
const decompressed = snappy.uncompressSync(compressed);
const restored = JSON.parse(decompressed);
```

### Advanced Usage

```javascript
const snappy = require('snappy-js');

const compressed = snappy.compress(data);

// Check if data is valid Snappy-compressed
if (snappy.isValidCompressed(compressed)) {
  // Get uncompressed size without decompressing
  const size = snappy.uncompressedLength(compressed);
  console.log('Original size:', size, 'bytes');
  
  // Decompress
  const decompressed = snappy.uncompress(compressed);
}
```

## 🎯 API Reference

### compress(input: Buffer): Buffer

Compress a Buffer using Snappy compression.

**Parameters:**
- `input` - Buffer to compress

**Returns:** Compressed Buffer

**Throws:** TypeError if input is not a Buffer

---

### uncompress(compressed: Buffer): Buffer

Decompress Snappy-compressed data.

**Parameters:**
- `compressed` - Compressed Buffer

**Returns:** Decompressed Buffer

**Throws:** 
- TypeError if input is not a Buffer
- Error if data is not valid Snappy-compressed data

---

### compressSync(str: string, encoding?: BufferEncoding): Buffer

Compress a string using Snappy.

**Parameters:**
- `str` - String to compress
- `encoding` - String encoding (default: 'utf8')

**Returns:** Compressed Buffer

---

### uncompressSync(compressed: Buffer, encoding?: BufferEncoding): string

Decompress to a string.

**Parameters:**
- `compressed` - Compressed Buffer
- `encoding` - String encoding (default: 'utf8')

**Returns:** Decompressed string

---

### uncompressedLength(compressed: Buffer): number

Get the uncompressed length without decompressing.

**Parameters:**
- `compressed` - Compressed Buffer

**Returns:** Original uncompressed size in bytes

---

### isValidCompressed(data: Buffer): boolean

Check if a buffer contains valid Snappy-compressed data.

**Parameters:**
- `data` - Buffer to validate

**Returns:** `true` if valid, `false` otherwise

---

### Aliases

- `decompress` = `uncompress`
- `decompressSync` = `uncompressSync`

## ⚡ Performance

Benchmarks comparing `snappy-js` (native) vs `SnappyJS` (pure JavaScript):

```
Dataset: JSON Data (10KB)
========================
snappy-js (Native):     0.015ms/op  (66,666 ops/sec)
SnappyJS (JavaScript):  0.180ms/op  (5,555 ops/sec)

🏆 snappy-js is 12x faster
```

Run benchmarks yourself:

```bash
npm run benchmark:compare
```

## 🔧 Use Cases

### Redis Caching

```javascript
const redis = require('redis');
const snappy = require('snappy-js');

async function setCache(key, value) {
  const json = JSON.stringify(value);
  const compressed = snappy.compressSync(json);
  await redis.set(key, compressed);
}

async function getCache(key) {
  const compressed = await redis.getBuffer(key);
  if (!compressed) return null;
  const json = snappy.uncompressSync(compressed);
  return JSON.parse(json);
}
```

### File Compression

```javascript
const fs = require('fs');
const snappy = require('snappy-js');

// Save compressed file
const data = fs.readFileSync('data.json');
const compressed = snappy.compress(data);
fs.writeFileSync('data.json.snappy', compressed);

// Read compressed file
const compressedFile = fs.readFileSync('data.json.snappy');
const decompressed = snappy.uncompress(compressedFile);
```

### HTTP Response Compression

```javascript
const express = require('express');
const snappy = require('snappy-js');

app.get('/api/data', (req, res) => {
  const data = { /* large dataset */ };
  const json = JSON.stringify(data);
  const compressed = snappy.compressSync(json);
  
  res.set('Content-Encoding', 'snappy');
  res.send(compressed);
});
```

## 📦 What's Inside

The package includes:

```
snappy-js/
├── dist/              # Compiled TypeScript
│   ├── index.js
│   ├── index.d.ts
│   └── *.map
├── deps/              # Native dependencies
│   ├── binding.cc     # C++ bindings
│   └── snappy/        # Snappy C++ source
├── prebuilds/         # Pre-compiled binaries (if available)
│   ├── darwin-arm64/
│   ├── darwin-x64/
│   ├── linux-arm64/
│   ├── linux-x64/
│   ├── win32-ia32/
│   └── win32-x64/
├── binding.gyp        # Build configuration
└── package.json
```

### Why Include Snappy Source?

Yes, the Snappy C++ source code (~500KB) is included in the package. This is **normal and necessary** because:

1. ✅ **Fallback compilation**: If no pre-built binary exists for your platform
2. ✅ **No external dependencies**: Everything needed to build is self-contained
3. ✅ **Licensing**: BSD-3-Clause allows redistribution
4. ✅ **Industry standard**: This is how most native Node.js modules work (sharp, better-sqlite3, etc.)

## 🛠️ Development

### Building

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build:ts

# Build native addon
npm run build:native

# Or build everything
npm run build
```

### Testing

```bash
npm test
```

### Benchmarks

```bash
# Run comparison benchmark
npm run benchmark:compare

# Run internal benchmarks
npm run benchmark
```

### Pre-building Binaries

```bash
# Build for all platforms (requires Docker or VMs)
npm run prebuild
```

## 📄 License

BSD-3-Clause

- This library: BSD-3-Clause
- Snappy library: BSD-3-Clause (included in `deps/snappy/`)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Related Projects

- [Snappy](https://github.com/google/snappy) - Original Google Snappy library
- [SnappyJS](https://github.com/zhipeng-jia/snappyjs) - Pure JavaScript implementation
- [node-snappy](https://github.com/kesla/node-snappy) - Alternative native bindings

## ⭐ Why Choose snappy-js?

| Feature | snappy-js | SnappyJS | node-snappy |
|---------|-----------|----------|-------------|
| Performance | ⚡ Native C++ | 🐌 JavaScript | ⚡ Native C++ |
| TypeScript | ✅ Full support | ❌ No types | ⚠️ Community types |
| Pre-built binaries | ✅ Yes | N/A | ❌ No |
| Installation time | 🚀 < 5 seconds | Instant | 🐌 ~30 seconds |
| Maintenance | ✅ Active | ⚠️ Inactive | ⚠️ Sporadic |
| Modern Node.js | ✅ 14+ | ✅ 10+ | ⚠️ Old API |

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/snappy-js/issues)
- 📖 **Documentation**: [GitHub Wiki](https://github.com/seu-usuario/snappy-js/wiki)

---

Made with ❤️ by [Thiago Santos](https://github.com/seu-usuario)


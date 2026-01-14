# snappy-js

[![npm version](https://badge.fury.io/js/@thisames%2Fsnappy-js.svg)](https://www.npmjs.com/package/@thisames/snappy-js)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](LICENSE)

Fast, native Node.js bindings for Google's Snappy compression library.

## Features

- Native C++ implementation for high performance
- Pre-compiled binaries for Linux, macOS, and Windows
- TypeScript support with full type definitions
- Simple API for compression and decompression

## Installation

```bash
npm install @thisames/snappy-js
```

**Requirements:** Node.js >= 14.0.0

## Usage

### Basic Example

```javascript
const snappy = require('@thisames/snappy-js');

// Compress
const data = Buffer.from('Hello, World!');
const compressed = snappy.compress(data);

// Decompress
const decompressed = snappy.uncompress(compressed);
console.log(decompressed.toString()); // 'Hello, World!'
```

### TypeScript

```typescript
import { compress, uncompress } from '@thisames/snappy-js';

const data = Buffer.from('Hello, TypeScript!');
const compressed = compress(data);
const decompressed = uncompress(compressed);
```

## API Reference

### compress(input: Buffer): Buffer

Compress a Buffer using Snappy compression.

### uncompress(compressed: Buffer): Buffer

Decompress Snappy-compressed data.

### compressSync(str: string, encoding?: BufferEncoding): Buffer

Compress a string using Snappy.

### uncompressSync(compressed: Buffer, encoding?: BufferEncoding): string

Decompress to a string.

### uncompressedLength(compressed: Buffer): number

Get the uncompressed length without decompressing.

### isValidCompressed(data: Buffer): boolean

Check if a buffer contains valid Snappy-compressed data.

### Aliases

- `decompress` = `uncompress`
- `decompressSync` = `uncompressSync`

## License

BSD-3-Clause

- This library: BSD-3-Clause
- Snappy library: BSD-3-Clause (included in `deps/snappy/`)

## Related Projects

- [Snappy](https://github.com/google/snappy) - Original Google Snappy library
- [SnappyJS](https://github.com/zhipeng-jia/snappyjs) - Pure JavaScript implementation
- [node-snappy](https://github.com/kesla/node-snappy) - Alternative native bindings


/**
 * Native Snappy bindings for Node.js
 * High-performance compression library
 */

import * as path from 'path';

// Try to load prebuilt binary, fallback to locally built one
let binding: any;
try {
  // Try prebuilt binary first (from prebuilds/)
  // Go up one directory from dist/ to project root
  binding = require('node-gyp-build')(path.join(__dirname, '..'));
} catch (err: any) {
  // Fallback to regular build location
  try {
    binding = require(path.join(__dirname, '../build/Release/snappy_native.node'));
  } catch (err2: any) {
    throw new Error(
      'Could not load snappy native binding. ' +
      'Make sure the package was installed correctly. ' +
      'Original errors: ' + err.message + ', ' + err2.message
    );
  }
}

/**
 * Compress data using Snappy compression
 * @param input - Input buffer to compress
 * @returns Compressed data
 */
export function compress(input: Buffer): Buffer {
  if (!Buffer.isBuffer(input)) {
    throw new TypeError('Input must be a Buffer');
  }
  return binding.compress(input);
}

/**
 * Uncompress data that was compressed with Snappy
 * @param compressed - Compressed buffer
 * @returns Uncompressed data
 */
export function uncompress(compressed: Buffer): Buffer {
  if (!Buffer.isBuffer(compressed)) {
    throw new TypeError('Input must be a Buffer');
  }
  return binding.uncompress(compressed);
}

/**
 * Get the uncompressed length of compressed data without decompressing
 * @param compressed - Compressed buffer
 * @returns Uncompressed length in bytes
 */
export function uncompressedLength(compressed: Buffer): number {
  if (!Buffer.isBuffer(compressed)) {
    throw new TypeError('Input must be a Buffer');
  }
  return binding.uncompressedLength(compressed);
}

/**
 * Check if a buffer contains valid Snappy compressed data
 * @param compressed - Buffer to validate
 * @returns True if valid compressed data
 */
export function isValidCompressed(compressed: Buffer): boolean {
  if (!Buffer.isBuffer(compressed)) {
    return false;
  }
  return binding.isValidCompressed(compressed);
}

/**
 * Compress a string using Snappy
 * @param str - String to compress
 * @param encoding - String encoding (default: 'utf8')
 * @returns Compressed data
 */
export function compressSync(str: string, encoding: BufferEncoding = 'utf8'): Buffer {
  const buffer = Buffer.from(str, encoding);
  return compress(buffer);
}

/**
 * Uncompress to a string
 * @param compressed - Compressed buffer
 * @param encoding - String encoding (default: 'utf8')
 * @returns Uncompressed string
 */
export function uncompressSync(compressed: Buffer, encoding: BufferEncoding = 'utf8'): string {
  const buffer = uncompress(compressed);
  return buffer.toString(encoding);
}

// Aliases for compatibility
export const decompress = uncompress;
export const decompressSync = uncompressSync;

// Default export for CommonJS compatibility
export default {
  compress,
  uncompress,
  uncompressedLength,
  isValidCompressed,
  compressSync,
  uncompressSync,
  decompress,
  decompressSync
};


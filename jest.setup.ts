import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import {
  TransformStream,
  ReadableStream,
  WritableStream,
} from 'web-streams-polyfill';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = TransformStream as unknown as typeof globalThis.TransformStream;
}
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as unknown as typeof globalThis.ReadableStream;
}
if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = WritableStream as unknown as typeof globalThis.WritableStream;
}

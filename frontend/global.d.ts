/// <reference types="react" />
// Minimal JSX namespace so TypeScript can resolve JSX in the editor.
// Keep this file tiny to avoid conflicting with project types.

declare global {
  namespace JSX {
    // React's element shape
    type Element = import("react").ReactElement;

    // Intrinsic elements (div, span, etc.) map to unknown props here.
    // Using `unknown` avoids `any` lint complaints while remaining permissive.
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

export {};

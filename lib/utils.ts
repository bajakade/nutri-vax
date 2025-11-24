// lib/utils.ts
import { twMerge } from 'tailwind-merge';

// Minimal local implementation of `clsx` to avoid adding an external dependency.
// Supports strings, arrays, and objects with boolean flags.
function localClsx(inputs: any[]): string {
  const parts: string[] = [];

  inputs.forEach((input) => {
    if (!input && input !== 0) return;

    if (typeof input === 'string' || typeof input === 'number') {
      parts.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = localClsx(input);
      if (nested) parts.push(nested);
    } else if (typeof input === 'object') {
      Object.keys(input).forEach((key) => {
        if ((input as any)[key]) parts.push(key);
      });
    }
  });

  return parts.join(' ');
}

export function cn(...inputs: any[]) {
  return twMerge(localClsx(inputs));
}

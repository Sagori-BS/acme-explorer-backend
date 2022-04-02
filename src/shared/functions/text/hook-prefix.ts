export function hookPrefix(prefix: string): string {
  if (!prefix) {
    return '';
  } else if (prefix.includes('.')) {
    return prefix;
  } else {
    return `${prefix}.`;
  }
}

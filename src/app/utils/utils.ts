export function cloneArray(arr: any[]) {
  const cloned: any[] = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    cloned[i] = arr[i];
  }
  return cloned;
}

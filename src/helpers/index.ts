export const cloneDeep = function <T>(source: T): T {
  if (typeof source !== 'object' || source === null) {
    return source; // Return primitive values and null as-is
  }

  if (Array.isArray(source)) {
    const clonedArray: any[] = [];
    for (const item of source) {
      clonedArray.push(cloneDeep(item)); // Recursively clone array elements
    }
    return clonedArray as T;
  }

  if (typeof source === 'object') {
    const clonedObject: Record<string, any> = {};
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        clonedObject[key] = cloneDeep(source[key]); // Recursively clone object properties
      }
    }
    return clonedObject as T;
  }

  // Handle other cases (functions, Date objects, etc.) as needed

  return source; // Fallback for unsupported types
};

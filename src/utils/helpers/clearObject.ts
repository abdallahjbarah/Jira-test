// Remove undefined, null values from an object and handle nested objects
export const clearObject = (obj: any): any => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => clearObject(item));
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [
        key,
        typeof value === 'object' ? clearObject(value) : value,
      ]),
  );
};

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

export const deepClearObject = (obj: any): any => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj
      .map((item) => deepClearObject(item))
      .filter((item) => {
        if (typeof item === 'string') {
          return item !== '';
        }
        return item !== undefined && item !== null;
      });
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => {
        if (typeof value === 'string') {
          return value !== '';
        }
        return value !== undefined && value !== null;
      })
      .map(([key, value]) => [key, deepClearObject(value)]),
  );
};

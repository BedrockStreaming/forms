export const isEmpty = (obj: unknown) => !obj || typeof obj !== 'object' || Object.keys(obj || {}).length === 0;


export const setItem = (key, value) => {
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
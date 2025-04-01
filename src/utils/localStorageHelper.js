// filepath: /Users/yannickvaterlaus/Desktop/Sipster-Frontend/src/utils/localStorageHelper.js

export const setItem = (key, value) => {
  // Speichere den Wert direkt, wenn es ein einfacher String ist
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    // Verwende JSON.stringify für komplexe Objekte
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key) => {
  const value = localStorage.getItem(key);
  try {
    // Versuche, den Wert zu parsen, falls es ein JSON-Objekt ist
    return JSON.parse(value);
  } catch {
    // Gib den Wert direkt zurück, falls es ein einfacher String ist
    return value;
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};
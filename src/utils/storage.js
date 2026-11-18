export function get(key, defaultValue) {
  try {
    const rawData = localStorage.getItem(key);
    if (!rawData) return defaultValue;
    return JSON.parse(rawData);
  } catch {
    console.error(`Couldn't read the key: ${key}`);
    return defaultValue;
  }
}

export function set(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch {
    console.error(`Failed to set ${value} to localStorage`);
  }
}


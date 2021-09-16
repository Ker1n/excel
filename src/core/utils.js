export function capitalize(str) {
  if (typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => start + index);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(prevStateKey, state) {
  if (typeof prevStateKey === "object" && typeof state === "object") {
    return JSON.stringify(prevStateKey) === JSON.stringify(state);
  }
  return prevStateKey === state;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  const result = Object.keys(styles)
  .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
  .join(';')
  return result
}

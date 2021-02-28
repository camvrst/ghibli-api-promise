export const truncateStr = (str, n) => {
  if (str.length <= n) {
    return str;
  }
  const index = str.slice(n, str.length).indexOf(" ");
  return `${str.slice(0, n + index)}...`;
};

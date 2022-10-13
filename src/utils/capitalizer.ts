export const capitalizer = (string: string | undefined) =>
  string && string.charAt(0).toUpperCase() + string.slice(1);

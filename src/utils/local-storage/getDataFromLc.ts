export const getDataFromLocalStorage = (name: string) => {
  const data = localStorage.getItem(name);
  const result = data ? JSON.parse(data) : null;
  return result;
};

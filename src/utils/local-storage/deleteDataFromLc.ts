export const removeUserFromLocalStorage = (data: string[]) => {
  data.forEach((item) => localStorage.removeItem(item));
};

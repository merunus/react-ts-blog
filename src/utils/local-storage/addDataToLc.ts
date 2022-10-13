interface Props {
  _id: string;
  email: string;
  name: string;
  dateCreated: string;
  __v: string;
}

export const addUserToLocalStorage = (user: Props) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const addTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

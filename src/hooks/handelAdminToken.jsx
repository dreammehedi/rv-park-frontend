export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getEmail = () => {
  const email = localStorage.getItem("email");
  return email;
};

export const setEmail = (email) => {
  localStorage.setItem("email", email);
};

export const removeEmail = () => {
  localStorage.removeItem("email");
};

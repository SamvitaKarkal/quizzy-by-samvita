const setToLocalStorage = ({ email, userId, userName }) => {
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("authUserName", userName);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage, clearLocalStorage };

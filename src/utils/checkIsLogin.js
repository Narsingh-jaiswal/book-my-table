export const isLogin = () => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin) {
    return true;
  } else {
    return false;
  }
};

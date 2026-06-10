export const clearAuthStorage = () => {
  localStorage.removeItem("fakekartToken");
  localStorage.removeItem("fakeKartUserId");
  localStorage.removeItem("fakeKartUsername");
};

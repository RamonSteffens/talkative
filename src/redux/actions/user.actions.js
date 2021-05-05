export const login = (user) =>{
  return { type: "LOGIN", payload: user };
};

export const logout = (user) => {
  return { type: "LOGOUT", payload: user };
};

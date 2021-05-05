const INITIAL_STATE = {
  user: {
    email: "",
    password: "",
  },
  logged: false,
};

function signIn(state = INITIAL_STATE, action) {
  if (action.type === "LOGIN") {
    state.user = action.payload
    state.logged = true;
  }
  if (action.type === "LOGOUT") {
    state.user = action.payload
    state.logged = false;
  }
  return state;
}

export default signIn;

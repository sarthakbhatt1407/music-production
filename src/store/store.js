import { createStore } from "redux";
const defaultState = {
  isLoggedIn: false,
  userId: "",
  isAdmin: false,
};

const storeReducer = (state = defaultState, action) => {
  if (action.type === "log in") {
    const data = action.data;
    const user = data.user;
    const obj = {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      isAdmin: user.isAdmin,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      isAdmin: user.isAdmin,
    };
  }

  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "reload") {
    return {
      ...action.data,
    };
  }

  return state;
};
const store = createStore(storeReducer);

export default store;

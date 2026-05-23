import { createStore } from "redux";
const defaultState = {
  isLoggedIn: false,
  userId: "",
  isAdmin: false,
  labelName: "",
  type: "",
  adminView: false,
  loggedUser: "",
  phone: "",
  subUser: false,
  parentUser: false,
};

const storeReducer = (state = defaultState, action) => {
  if (action.type === "log in") {
    const data = action.data;

    const user = data.user;
    console.log("store", data);

    const obj = {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      labelName: user.name,
      isAdmin: user.isAdmin,
      type: data.type,
      adminView: data.adminView ? true : false,
      loggedUser: data.loggedUser || "",
      phone: user.phone || "",
      subUser: data.subUser || false,
      parentUser: user.parentUser ? true : false,
    };
    console.log(obj, "------------------------");

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      labelName: user.name,
      isAdmin: user.isAdmin,
      type: data.type,
      adminView: data.adminView ? true : false,
      loggedUser: data.loggedUser || "",
      phone: user.phone || "",
      subUser: data.subUser || false,
      parentUser: user.parentUser ? true : false,
    };
  }

  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "reload") {
    return {
      ...action.data,
      adminView: action.data.adminView ? true : false,
    };
  }

  return state;
};
const store = createStore(storeReducer);

export default store;

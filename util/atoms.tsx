import { atom } from "recoil";

const userInfoState = atom({
  key: "userInfoState",
  default: {},
});

const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export { userInfoState, isLoggedInState };

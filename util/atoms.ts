import { atom } from "recoil";
import { UserInfo } from "./types";

const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: { displayName: "", uid: "", petId: "" },
});

const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export { userInfoState, isLoggedInState };

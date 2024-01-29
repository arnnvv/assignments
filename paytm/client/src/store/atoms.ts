import { atom } from "recoil";

export interface User {
  firstName: string;
  lastName: string;
  _id: number;
}

export const userAtom = atom<User[]>({
  key: "userAtom",
  default: [
    {
      firstName: "Arnav",
      lastName: "Sharma",
      _id: 1,
    },
  ],
});

export const firstNameState = atom({
  key: "firstNameState",
  default: "",
});

export const lastNameState = atom({
  key: "lastNameState",
  default: "",
});

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});

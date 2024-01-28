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
      firstName: "Harkirat",
      lastName: "Singh",
      _id: 1,
    },
  ],
});

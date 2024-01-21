import { atom } from "recoil";

export const otpState = atom<string[]>({
  key: "otpState",
  default: Array(4).fill(""),
});

export const otpLengthState = atom<number>({
  key: "otpLengthState",
  default: 4,
});

export const phoneState = atom({
  key: "phoneState",
  default: "",
});

import { selector } from "recoil";
import nameAtom from "./atoms.ts";

const greetingMessage = selector({
  key: "greetingMessage",
  get: ({ get }) => {
    const name = get(nameAtom);
    return `HAPPY BIRTHDAY, ${name}!`;
  },
});

export default greetingMessage;

import { atom, selector } from "recoil";
import axios from "axios";
export const userAtom = atom({
  key: "userAtom",
  default: selector({
    key: "userAtomSelector",
    get: async ({ get }) => {
      try {
        const username = get(usernameAtom);
        const data = await axios.get(
          `https://api.github.com/users/${username}`,
        );
        return data.data;
      } catch (e) {
        console.error(`Error fetching user: ${e}`);
      }
    },
  }),
});

export const usernameAtom = atom({
  key: "usernameAtom",
  default: "",
});

import { selector, atom, atomFamily, selectorFamily } from "recoil";
import axios from "axios";
//Async Data Query (Use Async data into Recoil via selectors)
//don't use UseRecoilState after using it it useRecoil Value just 1 is enough

export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: selector({
    key: "notificationsAtomSelector",
    get: async () => {
      try {
        const data = await axios.get(
          `https://sum-server.100xdevs.com/notifications`,
        );
        return data.data;
      } catch (e) {
        console.error(`Error in fetching Notifications ${e}`);
      }
    },
  }),
});

export const todoAtomFamily = atomFamily({
  key: "todoAtomFamily",
  default: selectorFamily({
    key: "todoAtomFamilySelectorFamily",
    get: (id: number) => async () => {
      try {
        const data = await axios.get(
          `https://sum-server.100xdevs.com/todo?id=${id}`,
        );
        return data.data.todo;
      } catch (e) {
        console.error(`Error in fetching Todo ${e}`);
      }
    },
  }),
});

import { atom, selector } from "recoil";
import axios from "axios";
/*export const networkAtom = atom({
  key: "networkAtom",
  default: 104,
});

export const jobsAtom = atom({
  key: "jobsAtom",
  default: 0,
});

export const messagesAtom = atom({
  key: "messagesAtom",
  default: 0,
});

export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: 0,
});*/

//Async Data Query (Use Async data into Recoil via selectors)
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

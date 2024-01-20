import { selector, atom, atomFamily, selectorFamily } from "recoil";
import axios from "axios";
//Async Data Query (Use Async data into Recoil via selectors)
//don't use UseRecoilState after using it it useRecoil Value just 1 is enough
/*
interface NotificationData {
  network: number;
  jobs: number;
  messaging: number;
  notifications: number;
}

export const notificationsAtomFamily = atomFamily<NotificationData, number>({
  key: "notificationsAtomFamily",
  default: { network: 0, jobs: 0, messaging: 0, notifications: 0 },
});

export const networkSelectorFamily = selectorFamily<number, number>({
  key: "networkSelectorFamily",
  get:
    (id) =>
    ({ get }) => {
      const notificationData = get(notificationsAtomFamily(id));
      return notificationData.network;
    },
});

export const jobsSelectorFamily = selectorFamily<number, number>({
  key: "jobsSelectorFamily",
  get:
    (id) =>
    ({ get }) => {
      const notificationData = get(notificationsAtomFamily(id));
      return notificationData.jobs;
    },
});

export const messagingSelectorFamily = selectorFamily<number, number>({
  key: "messagingSelectorFamily",
  get:
    (id) =>
    ({ get }) => {
      const notificationData = get(notificationsAtomFamily(id));
      return notificationData.messaging;
    },
});

export const notificationsSelectorFamily = selectorFamily<number, number>({
  key: "notificationsSelectorFamily",
  get:
    (id) =>
    ({ get }) => {
      const notificationData = get(notificationsAtomFamily(id));
      return notificationData.notifications;
    },
});

export const fetchNotifications = async (): Promise<NotificationData> => {
  try {
    const { data } = await axios.get<NotificationData>(
      `https://sum-server.100xdevs.com/notifications`,
    );
    return data || { network: 0, jobs: 0, messaging: 0, notifications: 0 };
  } catch (error) {
    console.error(`Error in fetching Notifications: ${error.message}`);
    throw error;
  }
};

export const useNotificationsCallback = () => {
  return useRecoilCallback(({ snapshot, set }) => async (id: number) => {
    try {
      const data = await snapshot.getPromise(fetchNotifications);
      set(notificationsAtomFamily(id), data);
    } catch (error) {
      console.error(`Error in fetching Notifications: ${error.message}`);
      set(notificationsAtomFamily(id), {
        network: 0,
        jobs: 0,
        messaging: 0,
        notifications: 0,
      });
    }
  });
};
*/

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
      const data = await axios.get(
        `https://sum-server.100xdevs.com/todo?id=${id}`,
      );
      return data.data.todo;
    },
  }),
});

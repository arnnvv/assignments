import { selector, RecoilValueReadOnly } from "recoil";
/*
import {
  networkAtom,
  jobsAtom,
  messagesAtom,
  notificationsAtom,
} from "./atoms.ts";
*/
import { notificationsAtom } from "./atoms.ts";
export const totalSelector: RecoilValueReadOnly<number> = selector({
  key: "totalSelector",
  get: ({ get }) => {
    const notifications = get(notificationsAtom);
    return (
      notifications.network +
      notifications.jobs +
      notifications.messaging +
      notifications.notifications
    );
  },
});

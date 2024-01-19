import { selector, RecoilValueReadOnly } from "recoil";
import {
  networkAtom,
  jobsAtom,
  messagesAtom,
  notificationsAtom,
} from "./atoms.ts";

export const total: RecoilValueReadOnly<number> = selector({
  key: "total",
  get: ({ get }) => {
    const network = get(networkAtom);
    const jobs = get(jobsAtom);
    const messages = get(messagesAtom);
    const notifications = get(notificationsAtom);
    return network + jobs + messages + notifications;
  },
});

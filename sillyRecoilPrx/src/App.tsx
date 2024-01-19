import "./App.css";
import { useRecoilValue, useSetRecoilState, RecoilRoot } from "recoil";
import {
  networkAtom,
  messagesAtom,
  jobsAtom,
  notificationsAtom,
} from "./store/atoms.ts";
//NeverForgetRoot:(

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const network = useRecoilValue(networkAtom);
  const messages = useRecoilValue(messagesAtom);
  const jobs = useRecoilValue(jobsAtom);
  const notifications = useRecoilValue(notificationsAtom);
  return (
    <>
      <button>HOME</button>
      <button>NETWORK({network >= 100 ? "99+" : network})</button>
      <button>MESSAGES({messages >= 100 ? "99+" : messages})</button>
      <button>JOBS({jobs >= 100 ? "99+" : jobs})</button>
      <button>
        NOTIFICATIONS({notifications >= 100 ? "99+" : notifications})
      </button>
    </>
  );
}

export default App;

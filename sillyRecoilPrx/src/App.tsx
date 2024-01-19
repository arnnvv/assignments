import "./App.css";
import { useRecoilValue, useSetRecoilState, RecoilRoot } from "recoil";
import {
  networkAtom,
  messagesAtom,
  jobsAtom,
  notificationsAtom,
} from "./store/atoms.ts";
//NeverForgetRoot:(
import { total } from "./store/selectors.ts";

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
  const totalCount = useRecoilValue(total);
  return (
    <>
      <button>HOME</button>
      <button>NETWORK({network >= 100 ? "99+" : network})</button>
      <button>MESSAGES({messages >= 100 ? "99+" : messages})</button>
      <button>JOBS({jobs >= 100 ? "99+" : jobs})</button>
      <button>
        NOTIFICATIONS({notifications >= 100 ? "99+" : notifications})
      </button>
      <button>ME({totalCount})</button>
    </>
  );
}

export default App;

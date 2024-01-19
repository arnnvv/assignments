import "./App.css";
import { useRecoilValue, useRecoilState, RecoilRoot } from "recoil";
import { notificationsAtom } from "./store/atoms.ts";
//NeverForgetRoot:(
import { totalSelector } from "./store/selectors.ts";
import { useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notificationsAtom);
  const total = useRecoilValue(totalSelector);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          `https://sum-server.100xdevs.com/notifications`,
        );
        setNetworkCount(data.data);
      } catch (e) {
        console.error(`Error in fetching Notifications ${e}`);
      }
    })();
  }, [setNetworkCount]);
  return (
    <>
      <button>HOME</button>
      <button>
        NETWORK({networkCount.network >= 100 ? "99+" : networkCount.network})
      </button>
      <button>
        MESSAGES(
        {networkCount.messaging >= 100 ? "99+" : networkCount.messaging})
      </button>
      <button>
        JOBS({networkCount.jobs >= 100 ? "99+" : networkCount.jobs})
      </button>
      <button>
        NTIFICATIONS(
        {networkCount.notifications >= 100 ? "99+" : networkCount.notifications}
        )
      </button>
      <button>ME({total})</button>
    </>
  );
}

export default App;

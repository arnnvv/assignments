import "./App.css";
import { useRecoilValue, RecoilRoot } from "recoil";
import { notificationsAtom } from "./store/atoms.ts";
//NeverForgetRoot:(
import { totalSelector } from "./store/selectors.ts";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  //const [networkCount, setNetworkCount] = useRecoilState(notificationsAtom);
  const notifications = useRecoilValue(notificationsAtom);
  const total = useRecoilValue(totalSelector);

  /*  useEffect(() => {
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
  }, [setNetworkCount]); */
  return (
    <>
      <button>HOME</button>
      <button>
        NETWORK({notifications.network >= 100 ? "99+" : notifications.network})
      </button>
      <button>
        MESSAGES(
        {notifications.messaging >= 100 ? "99+" : notifications.messaging})
      </button>
      <button>
        JOBS({notifications.jobs >= 100 ? "99+" : notifications.jobs})
      </button>
      <button>
        NTIFICATIONS(
        {notifications.notifications >= 100
          ? "99+"
          : notifications.notifications}
        )
      </button>
      <button>ME({total})</button>
    </>
  );
}

export default App;

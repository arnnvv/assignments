import "./App.css";
import { useRecoilValue, RecoilRoot } from "recoil";
import { notificationsAtom, todoAtomFamily } from "./store/atoms.ts";
import { totalSelector } from "./store/selectors.ts";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
      <br />
      <Todo id={1} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function MainApp() {
  const notifications = useRecoilValue(notificationsAtom);
  const total = useRecoilValue(totalSelector);

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

function Todo({ id }) {
  const todo = useRecoilValue(todoAtomFamily(id));

  return (
    <>
      {todo?.title}
      {todo?.description}
      <br />
    </>
  );
}

export default App;

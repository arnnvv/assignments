import "./App.css";
import { RecoilRoot, useRecoilValueLoadable } from "recoil";
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
  const notifications = useRecoilValueLoadable(notificationsAtom);
  const total = useRecoilValueLoadable(totalSelector);

  const renderValue = (value: number) => {
    return value >= 100 ? "99+" : value;
  };

  const renderButton = (label: string, value: number) => {
    return (
      <button>
        {label}(
        {notifications.state === "loading" ? "loading..." : renderValue(value)})
      </button>
    );
  };

  return (
    <>
      <button>HOME</button>
      {renderButton("NETWORK", notifications.contents.network)}
      {renderButton("MESSAGES", notifications.contents.messaging)}
      {renderButton("JOBS", notifications.contents.jobs)}
      {renderButton("NOTIFICATIONS", notifications.contents.notifications)}
      <button>
        ME({total.state === "loading" ? "loading..." : total.contents})
      </button>
    </>
  );
}

function Todo({ id }: { id: number }) {
  const todo = useRecoilValueLoadable(todoAtomFamily(id));
  return todo.state === "loading" ? (
    <>loading...</>
  ) : (
    <>
      {todo?.contents.title}
      {todo?.contents.description}
      <br />
    </>
  );
}

export default App;

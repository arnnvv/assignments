import "./App.css";
import { countAtom } from "./store/atoms/count.jsx";
import { evenSelector } from "./store/selectors/even.jsx";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return (
    <div>
      {count}
      <EvenRendered />
    </div>
  );
}

function EvenRendered() {
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "No. is Even" : "No. is Odd"}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Inc</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Dec</button>
    </div>
  );
}

function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

export default App;

import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { FC, lazy, Suspense } from "react";
import nameAtom from "./store/atoms";
import greetingMessage from "./store/selectors";
const WishCard = lazy(() => import("./WishCard.tsx"));

const App: FC = () => {
  const [name, setName] = useRecoilState(nameAtom);
  const message = useRecoilValue(greetingMessage);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Birthday Wisher</h1>
        <label>
          Enter Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <h2>{message}</h2>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <WishCard
              message={`Wishing you a day filled with joy and laughter!`}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <WishCard message={`May all your dreams and wishes come true!`} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;

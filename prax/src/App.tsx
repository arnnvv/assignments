import { memo, useCallback, useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <MemoizedHeaderWithButton></MemoizedHeaderWithButton>
      <Header state="Sharma"></Header>
    </>
  );
}

function Header({ state }) {
  return <div>{state}</div>;
}

function HeaderWithButton() {
  const [title, setTitle] = useState("arnv");

  const update = useCallback(() => {
    setTitle(`My name is ${Math.random()}`);
  }, []);

  return (
    <>
      <button onClick={update}>Update</button>
      <Header state={title}></Header>
    </>
  );
}

const MemoizedHeaderWithButton = memo(HeaderWithButton);

export default App;

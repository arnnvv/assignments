import { useState } from "react";
import { CountContext } from "./context.js";
import "./App.css";
import { useContext } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CountContext.Provider value={{ count, setCount }}>
        <Count />
      </CountContext.Provider>
    </>
  );
}

function CountRenderer() {
  const { count } = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons() {
  const { count, setCount } = useContext(CountContext);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
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

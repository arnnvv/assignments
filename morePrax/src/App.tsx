import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [id, setId] = useState(1);

  const buttonhandler = (newId) => () => setId(newId);

  return (
    <>
      <button onClick={buttonhandler(1)}>1</button>
      <button onClick={buttonhandler(2)}>2</button>
      <button onClick={buttonhandler(3)}>3</button>
      <button onClick={buttonhandler(4)}>4</button>
      <Todo id={id}></Todo>
    </>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://sum-server.100xdevs.com/todo?id=${id}`,
        );
        setTodo(res.data.todo);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    })();
  }, [id]);

  return (
    <div>
      <h1>{todo.title}</h1>
      <br />
      <h4>{todo.description}</h4>
    </div>
  );
}

export default App;

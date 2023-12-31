import { useState } from "react";
import "./App.css";

function App() {
  function CustomButton() {
    const [count, setCount] = useState(0);
    function increment() {
      setCount(count + 1);
    }
    return <button onClick={increment}>Counter: {count}</button>;
  }

  function Todos() {
    const [todos, setTodos] = useState([
      {
        title: "GYM",
        description: "Go to GYM from 5-7",
      },
      {
        title: "DSA",
        description: "DO DSA",
      },
    ]);

    const [newTodo, setNewTodo] = useState({
      title: "",
      description: "",
    });

    const addTodo = () => {
      setTodos((prevtodo) => [...prevtodo, newTodo]);
    };

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        {todos.map((todo, index) => (
          <div key={index}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <CustomButton></CustomButton>
      <Todos></Todos>
    </>
  );
}

export default App;

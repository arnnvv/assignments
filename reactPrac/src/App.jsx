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
      <div id="todo-form">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Add Todo
        </button>

        <div id="todo-list">
          {todos.map((todo, index) => (
            <div key={index} className="todo-item">
              <div>{todo.title}</div>
              <div>{todo.description}</div>
              <br />
            </div>
          ))}
        </div>
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

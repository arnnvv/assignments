import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";
import "./App.css";

function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Loading
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <>
        <NavigationButtons />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Loading />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

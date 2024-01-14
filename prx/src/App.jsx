import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
const Dashboard = lazy(() => import("./components/Dashboard"));
const Loading = lazy(() => import("./components/Loading"));
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
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"loading..."}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"loading..."}>
                <Loading />
              </Suspense>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

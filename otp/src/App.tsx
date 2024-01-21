import { FC, lazy, Suspense } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
const OTPInput = lazy(() => import("./OTPInput.tsx"));
const NumberInput = lazy(() => import("./NumberInput.tsx"));
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Number Input Loading...</div>}>
                  <NumberInput />
                </Suspense>
              }
            />
            <Route
              path="/otp"
              element={
                <Suspense fallback={<div>OTP Input Loading...</div>}>
                  <OTPInput />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
};

export default App;

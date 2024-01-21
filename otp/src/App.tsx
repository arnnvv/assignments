import { FC } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import OTPInput from "./OTPInput.tsx";
import NumberInput from "./NumberInput.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<NumberInput />} />
            <Route path="/otp" element={<OTPInput />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
};

export default App;

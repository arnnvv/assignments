import { FC } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import OTPInput from "./OTPInput.tsx";

const App: FC = () => {
  return (
    <>
      <RecoilRoot>
        <div>
          <h1>LogIn via OTP</h1>
          <OTPInput />
        </div>
      </RecoilRoot>
    </>
  );
};

export default App;

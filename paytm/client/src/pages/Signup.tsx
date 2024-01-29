import { lazy } from "react";
const Heading = lazy(() => import("../components/Heading"));
const SubHeading = lazy(() => import("../components/SubHeading"));
const InputBox = lazy(() => import("../components/InputBox"));
const Button = lazy(() => import("../components/Button"));
const BottomWarning = lazy(() => import("../components/ButtonWarning"));
import { useSetRecoilState } from "recoil";
import {
  firstNameState,
  lastNameState,
  usernameState,
  passwordState,
} from "../store/atoms.ts";
import axios from "axios";
const Signup = () => {
  const setFirstName = useSetRecoilState(firstNameState);
  const setLastName = useSetRecoilState(lastNameState);
  const setUsername = useSetRecoilState(usernameState);
  const setPassword = useSetRecoilState(passwordState);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                axios.post("http://localhost:3000/api/v1/users/signup", {
                  firstNameState,
                  lastNameState,
                  usernameState,
                  passwordState,
                });
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;

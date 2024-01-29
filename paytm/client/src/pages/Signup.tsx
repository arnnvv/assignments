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
  authTokenState,
} from "../store/atoms.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const setFirstName = useSetRecoilState(firstNameState);
  const setLastName = useSetRecoilState(lastNameState);
  const setUsername = useSetRecoilState(usernameState);
  const setPassword = useSetRecoilState(passwordState);
  const setToken = useSetRecoilState(authTokenState);
  const navigate = useNavigate();
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
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/users/signup",
                    {
                      firstName: firstNameState,
                      lastName: lastNameState,
                      username: usernameState,
                      password: passwordState,
                    },
                  );
                  setToken(response.data.token);
                  axios.interceptors.request.use(
                    (config) => {
                      if (response.data.token) {
                        config.headers.Authorization = `Bearer ${response.data.token}`;
                      }
                      return config;
                    },
                    (error) => {
                      return Promise.reject(error);
                    },
                  );
                  navigate("/dashboard");
                } catch (e) {
                  console.error(`Error in sigining up: ${e}`);
                }
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

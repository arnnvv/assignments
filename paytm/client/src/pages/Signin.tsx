import { lazy } from "react";
const Heading = lazy(() => import("../components/Heading"));
const SubHeading = lazy(() => import("../components/SubHeading"));
const InputBox = lazy(() => import("../components/InputBox"));
const Button = lazy(() => import("../components/Button"));
const BottomWarning = lazy(() => import("../components/ButtonWarning"));
import {
  usernameState,
  passwordState,
  authTokenState,
} from "../store/atoms.ts";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const setUsername = useSetRecoilState(usernameState);
  const setPassword = useSetRecoilState(passwordState);
  const setToken = useSetRecoilState(authTokenState);
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
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
                    "http://localhost:3000/api/v1/users/signin",
                    {
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
                  console.error(`Error in Sigining in :{e}`);
                }
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;

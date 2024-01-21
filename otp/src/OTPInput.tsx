import { createRef, FC, ChangeEvent, KeyboardEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { otpState, otpLengthState } from "./store/atoms.ts";
import { useLocation } from "react-router-dom";
import "./OTPInput.css";

const OTPInput: FC = () => {
  const otp = useRecoilValue(otpState);
  const otpLength = useRecoilValue(otpLengthState);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get("phone");

  const setOtp = useRecoilState(otpState)[1];

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (index < otpLength - 1 && value !== "") {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      index > 0 &&
      otp[index] === ""
    ) {
      // If backspace or delete is pressed and the current input is empty,
      // focus on the previous input using the index
      inputRefs[index - 1].current?.focus();
    }
  };

  const inputRefs = Array(otpLength)
    .fill(0)
    ?.map(() => createRef<HTMLInputElement>());

  return (
    <div className="otp-input-container">
      <h1>OTP sent to ${phone}</h1>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;

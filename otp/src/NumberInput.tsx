import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { phoneState } from "./store/atoms.ts";
import { useRecoilState } from "recoil";

const NumberInput: FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useRecoilState(phoneState);

  const handleSubmit = () => {
    // Perform phone number validation if needed

    // Redirect to OTP input page with phone number as query parameter
    navigate(`/otp?phone=${phone}`);
  };
  return (
    <div>
      <h2>Enter Phone Number</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NumberInput;

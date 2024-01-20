import { useSetRecoilState } from "recoil";
import { backgroundColorState } from "./atoms";

const BackgroundChanger = () => {
  const setBackgroundColor = useSetRecoilState(backgroundColorState);

  const changeBackgroundColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
    document.body.style.backgroundColor = randomColor;
  };

  return (
    <div className="background-changer">
      <button onClick={changeBackgroundColor}>Change Background</button>
    </div>
  );
};

export default BackgroundChanger;

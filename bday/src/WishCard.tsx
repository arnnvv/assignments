import { FC } from "react";

interface WishCardProps {
  message: string;
}

const WishCard: FC<WishCardProps> = ({ message }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default WishCard;

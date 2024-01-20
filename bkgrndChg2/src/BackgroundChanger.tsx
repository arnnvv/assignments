const BackgroundChanger = () => {
  const changeBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "80px",
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#268bd6",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "15px",
  };

  const colors = [
    { name: "Red", backgroundColor: "red", textColor: "white" },
    { name: "Green", backgroundColor: "green", textColor: "white" },
    { name: "Blue", backgroundColor: "blue", textColor: "white" },
    { name: "Purple", backgroundColor: "purple", textColor: "white" },
    { name: "Orange", backgroundColor: "orange", textColor: "white" },
    { name: "Black", backgroundColor: "black", textColor: "white" },
    { name: "Yellow", backgroundColor: "yellow", textColor: "black" },
    { name: "Pink", backgroundColor: "pink", textColor: "black" },
    { name: "Cyan", backgroundColor: "cyan", textColor: "black" },
    { name: "Brown", backgroundColor: "brown", textColor: "white" },
  ];

  return (
    <div className="background-changer" style={buttonContainerStyle}>
      {colors?.map((color) => (
        <button
          key={color.name}
          style={{
            ...buttonStyle,
            backgroundColor: color.backgroundColor,
            color: color.textColor,
          }}
          onClick={() => changeBackgroundColor(color.backgroundColor)}
        >
          {color.name}
        </button>
      ))}
    </div>
  );
};

export default BackgroundChanger;

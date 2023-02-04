import { useState } from "react";
import leftChevron from "../../assets/img/left-chevron.png";
import rightChevron from "../../assets/img/right-chevron.png";
import { useMediaQuery } from "../../hooks";

const ChangeMonthButton = ({ handleChangeMonth, direction }) => {
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const calendarButtonMonthStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: isHover
      ? isClicked
        ? "rgb(230, 230, 230)"
        : "grey"
      : "white",
    height: query900 ? "40px" : query600 ? "30px" : "25px",
    width: query900 ? "40px" : query600 ? "30px" : "25px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <button
      style={calendarButtonMonthStyle}
      onClick={() => handleChangeMonth(direction)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {direction === "left" ? (
        <img
          style={{ height: "70%", width: "100%", marginRight: "10px" }}
          src={leftChevron}
          alt="left-pointing cheveron icon"
        />
      ) : (
        <img
          style={{ height: "70%", width: "100%", marginLeft: "2px" }}
          src={rightChevron}
          alt="right-pointing cheveron icon"
        />
      )}
    </button>
  );
};

export default ChangeMonthButton;

import { EventDateContext, EventListContext } from "../../App";
import { useContext, useState } from "react";

const Day = ({ day, month, year, setEventDate }) => {
  const { selectedDate } = useContext(EventDateContext);
  const { eventList } = useContext(EventListContext);
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

  const style = {
    position: "relative",
    display: "flex",
    fontSize: "16px",
    backgroundColor: isHover ? (isClicked ? "rgb(250, 230, 230)" : "rgb(250, 200, 200)") : "white",
    height: "130px",
    padding: "15px 20px",
    border: "none",
    cursor: "pointer",
  };

  const dateStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: JSON.stringify(selectedDate) === JSON.stringify({ year, month, day }) ? "lightblue" : "",
    height: "30px",
    width: "30px",
    borderRadius: "20px",
  };

  const eventStyle = {
    position: "absolute",
    bottom: "10%",
    right: "15%",
  };

  const numEvents = eventList.filter((e) => {
    const eventDay = new Date(e.date);
    if (eventDay.getDate() === day && eventDay.getMonth() === month && eventDay.getFullYear() === year) {
      return e;
    } else {
      return null;
    }
  }).length;

  return (
    <>
      <EventDateContext.Consumer>
        {({ setSelectedDate }) => (
          <button
            style={style}
            onClick={() => {
              setEventDate(new Date(year, month, day));
              setSelectedDate(year, month, day);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div style={{ position: "relative" }}>
              <span style={dateStyle}>{day}</span>
            </div>
            <span style={eventStyle}>{numEvents ? numEvents : null}</span>
          </button>
        )}
      </EventDateContext.Consumer>
    </>
  );
};

export default Day;

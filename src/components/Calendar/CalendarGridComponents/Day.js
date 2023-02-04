import { EventDayContext, EventListContext } from "../../../App";
import { useContext, useState } from "react";
import { useMediaQuery } from "../../../hooks";

const Day = ({ year, month, day }) => {
  const { eventDayState, eventDayDispatch } = useContext(EventDayContext);
  const { eventList } = useContext(EventListContext);
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");

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
    justifyContent: query600 ? "0" : "center",
    fontSize: query900 ? "16px" : "14px",
    backgroundColor: isHover
      ? isClicked
        ? "rgb(250, 230, 230)"
        : "rgb(250, 200, 200)"
      : "white",
    padding: query900 ? "15px 20px" : query600 ? "10px" : "5px 0",
    border: "none",
    cursor: "pointer",
  };

  const dateStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      JSON.stringify({
        year: eventDayState.eventYear,
        month: eventDayState.eventMonth,
        day: eventDayState.eventDay,
      }) === JSON.stringify({ year, month, day })
        ? "lightblue"
        : "",
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
    if (
      eventDay.getDate() === day &&
      eventDay.getMonth() === month &&
      eventDay.getFullYear() === year
    ) {
      return e;
    } else {
      return null;
    }
  }).length;

  return (
    <>
      <button
        style={style}
        onClick={() => {
          eventDayDispatch({ type: "setEventYear", payload: year });
          eventDayDispatch({ type: "setEventMonth", payload: month });
          eventDayDispatch({ type: "setEventDay", payload: day });
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
    </>
  );
};

export default Day;

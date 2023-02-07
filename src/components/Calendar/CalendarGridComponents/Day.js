import { EventDayContext, EventListContext } from "../../../App";
import { useContext, useState } from "react";
import { useMediaQuery } from "../../../hooks";

const Day = ({ index, year, month, day }) => {
  const { eventDayState, eventDayDispatch } = useContext(EventDayContext);
  const { eventList } = useContext(EventListContext);
  const [mouseState, setMouseState] = useState({
    isHover: false,
    isClicked: false,
  });
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");

  const handleMouseState = (mouseEvent) => {
    switch (mouseEvent) {
      case "enter":
        setMouseState({ ...mouseState, isHover: true });
        break;
      case "leave":
        setMouseState({ ...mouseState, isHover: false });
        break;
      case "down":
        setMouseState({ ...mouseState, isClicked: true });
        break;
      case "up":
        setMouseState({ ...mouseState, isClicked: false });
        break;
      default:
        break;
    }
  };

  const style = {
    position: "relative",
    display: "flex",
    justifyContent: query600 ? "0" : "center",
    fontSize: query900 ? "16px" : "14px",
    backgroundColor:
      index % 7 === 0 || index % 7 === 6
        ? "rgb(240, 240, 240)"
        : mouseState.isHover
        ? mouseState.isClicked
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
    return eventDay.getDate() === day &&
      eventDay.getMonth() === month &&
      eventDay.getFullYear() === year
      ? e
      : null;
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
        onMouseEnter={() => handleMouseState("enter")}
        onMouseLeave={() => handleMouseState("leave")}
        onMouseDown={() => handleMouseState("down")}
        onMouseUp={() => handleMouseState("up")}
      >
        <div style={{ position: "relative" }}>
          <span style={dateStyle}>{day}</span>
        </div>
        <span style={eventStyle}>
          {numEvents ? (
            query600 ? (
              numEvents
            ) : (
              <div
                style={{
                  height: "3px",
                  width: "3px",
                  borderRadius: "3px",
                  backgroundColor: "black",
                }}
              ></div>
            )
          ) : null}
        </span>
      </button>
    </>
  );
};

export default Day;

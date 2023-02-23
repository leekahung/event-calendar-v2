import { EventDayContext, EventListContext } from "../../../App";
import { useContext } from "react";
import { useMediaQuery } from "../../../hooks";
import Button from "@mui/material/Button";

const Day = ({ index, year, month, day }) => {
  const { eventDayState, eventDayDispatch } = useContext(EventDayContext);
  const { eventList } = useContext(EventListContext);
  const query900 = useMediaQuery("(min-width: 900px)");
  const query600 = useMediaQuery("(min-width: 600px)");

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
      <Button
        sx={{
          position: "relative",
          fontSize: query900 ? "16px" : "14px",
          borderRadius: 0,
          padding: query900 ? "15px 20px" : query600 ? "10px" : "5px 0",
          color: "rgb(30, 30, 30)",
          backgroundColor:
            index % 7 === 0 || index % 7 === 6 ? "rgb(240, 240, 240)" : "white",
          "&:hover": {
            backgroundColor: "rgb(200, 160, 200)",
            "&:active": {
              backgroundColor: "lightgrey",
            },
          },
        }}
        onClick={() => {
          eventDayDispatch({ type: "setEventYear", payload: year });
          eventDayDispatch({ type: "setEventMonth", payload: month });
          eventDayDispatch({ type: "setEventDay", payload: day });
        }}
      >
        <div style={{ position: "absolute", top: "20%" }}>
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
      </Button>
    </>
  );
};

export default Day;

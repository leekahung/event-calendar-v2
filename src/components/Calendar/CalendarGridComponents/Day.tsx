import { EventDayContext, EventListContext } from "../../../App";
import { useContext } from "react";
import { useMediaQuery } from "../../../hooks";
import Button from "@mui/material/Button";

interface Props {
  index: number;
  year: number;
  month: number;
  day: number;
}

const Day = ({ index, year, month, day }: Props) => {
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
    height: query600 ? "30px" : "25px",
    width: query600 ? "30px" : "25px",
    borderRadius: "20px",
  };

  const eventStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "10%",
    right: "15%",
  };

  const numEvents = eventList!.filter((e) => {
    const eventDate = e.date as Date;
    const eventDay = new Date(eventDate);
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
          minWidth: "20px",
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
        <div style={{ position: "absolute", top: "15%" }}>
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

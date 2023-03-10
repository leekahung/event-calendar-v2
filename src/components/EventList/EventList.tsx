import React, { useContext } from "react";
import {
  EventDayContext,
  EventListContext,
  ToggleContext,
} from "../../context";
import { indexToMonth } from "../../utils/calendar-helper";
import { useMediaQuery } from "../../hooks";
import { Slide } from "@mui/material";

const EventList = () => {
  const { eventList } = useContext(EventListContext);
  const { eventDayState, eventDayDispatch } = useContext(EventDayContext);
  const { toggleState, toggleDispatch } = useContext(ToggleContext);

  const query1200 = useMediaQuery("(min-width: 1200px)");
  const query900 = useMediaQuery("(min-width: 900px)");
  const queryBtwn900And1200 = useMediaQuery(
    "(min-width: 900px) and (max-width: 1200px)"
  );

  const eventListStyle1200 = !query1200
    ? ({
        position: "absolute",
        height: "100%",
        width: "40%",
      } as IEventListStyle1200)
    : null;

  const eventListStyle900 = !query900
    ? ({
        height: "50%",
        width: "100%",
        bottom: "0",
      } as IEventListStyle900)
    : null;

  let eventListStyle: eventListStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: query1200 ? "white" : "rgba(255, 255, 255, 0.95)",
    zIndex: "2",
    overflowY: query900 ? "hidden" : "scroll",
    ...eventListStyle1200,
    ...eventListStyle900,
  };

  const eventListCtnrStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  };

  const eventBoxStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    width: "80%",
    height: "70px",
    border: "1px solid black",
    cursor: "pointer",
  };

  return (
    <Slide
      direction="right"
      in={queryBtwn900And1200 ? toggleState.openEventList : true}
      timeout={500}
    >
      <div style={eventListStyle} className="event-list">
        <h2>
          {indexToMonth.get(eventDayState.eventMonth)} {eventDayState.eventDay},{" "}
          {eventDayState.eventYear}
        </h2>
        <div style={eventListCtnrStyle}>
          {eventList.map((e) => {
            const eventDate = e.date as Date;
            const eventId = e.id as number;
            const dayEvent = new Date(eventDate);
            if (
              dayEvent.getFullYear() === eventDayState.eventYear &&
              dayEvent.getMonth() === eventDayState.eventMonth &&
              dayEvent.getDate() === eventDayState.eventDay
            ) {
              return (
                <button
                  style={eventBoxStyle}
                  key={e.id}
                  onClick={() => {
                    eventDayDispatch({
                      type: "setEventId",
                      payload: eventId,
                    });
                    toggleDispatch({ type: "openModalEdit" });
                    toggleDispatch({ type: "closeEventList" });
                  }}
                >
                  {e.name}
                </button>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Slide>
  );
};

export default EventList;

import { useContext } from "react";
import { EventDayContext, EventListContext, ToggleContext } from "../../App";
import { indexToMonth } from "../../utils/calendar-helper";
import { useMediaQuery } from "../../hooks";

const EventList = () => {
  const { eventList } = useContext(EventListContext);
  const { eventDayState, eventDayDispatch } = useContext(EventDayContext);
  const { toggleState, toggleDispatch } = useContext(ToggleContext);

  const query1200 = useMediaQuery("(min-width: 1200px)");
  const query900 = useMediaQuery("(min-width: 900px)");

  const eventListStyle1200 = !query1200
    ? {
        position: "absolute",
        height: "100%",
        width: "40%",
      }
    : null;

  const eventListStyle900 = !query900
    ? {
        height: "50%",
        width: "100%",
        bottom: "0",
      }
    : null;

  const eventListStyle = {
    visibility: !query900 ? "" : toggleState.openEventList ? "" : "hidden",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: query1200 ? "white" : "rgba(255, 255, 255, 0.95)",
    zIndex: "2",
    overflowY: query900 ? "" : "scroll",
    ...eventListStyle1200,
    ...eventListStyle900,
  };

  const eventListCtnrStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  };

  const eventBoxStyle = {
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
    <div style={eventListStyle} className="event-list">
      <h2>
        {indexToMonth.get(eventDayState.eventMonth)} {eventDayState.eventDay},{" "}
        {eventDayState.eventYear}
      </h2>
      <div style={eventListCtnrStyle}>
        {eventList.map((e) => {
          const dayEvent = new Date(e.date);
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
                  eventDayDispatch({ type: "setEventId", payload: e.id });
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
  );
};

export default EventList;

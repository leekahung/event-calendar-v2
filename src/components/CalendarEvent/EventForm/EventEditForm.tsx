import DialogContent from "@mui/material/DialogContent";
import React, { useContext } from "react";
import {
  EventDayContext,
  EventListContext,
  ToggleContext,
} from "../../../context";
import { useField } from "../../../hooks";

interface Props {
  indexToMonth: Map<number, string>;
}

const EventEditForm = ({ indexToMonth }: Props) => {
  let { clearValue: clearEventName, ...eventName } = useField("text");
  let {
    clearValue: clearEventDescription,
    type,
    ...eventDescription
  } = useField("textarea");
  const { eventList, setEventList } = useContext(EventListContext);
  const { eventDayState } = useContext(EventDayContext);
  const { toggleDispatch } = useContext(ToggleContext);
  const eventToEdit = eventList.find(
    (e) => e.id === eventDayState.eventId
  ) as ICalendarEventState;

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedEvent: ICalendarEventState = {
      ...eventToEdit,
      name: eventName.value,
      description: eventDescription.value,
    };
    setEventList(
      eventList.map((e) => (e.id === eventDayState.eventId ? updatedEvent : e))
    );
    window.localStorage.setItem("eventList", JSON.stringify(eventList));
    clearEventName();
    clearEventDescription();
    toggleDispatch({ type: "closeModalEdit" });
  };

  const handleDeleteEvent = (eventId: number) => {
    if (eventList.length === 1) {
      window.localStorage.removeItem("eventList");
      setEventList(eventList.filter((e) => e.id !== eventId));
    } else {
      setEventList(eventList.filter((e) => e.id !== eventId));
      window.localStorage.setItem("eventList", JSON.stringify(eventList));
    }

    toggleDispatch({ type: "closeModalEdit" });
  };

  const style = {
    display: "grid",
    gridTemplateColumns: "40px 1fr",
    alignItems: "center",
    gap: "10px",
  };

  const inputStyle = {
    padding: "5px",
  };

  const textAreaStyle = {
    fontFamily: "Arial",
    padding: "5px",
  };

  const fullWidthStyle = {
    gridColumn: "1 / 3",
  };

  const buttonStyle = {
    padding: "5px 10px",
    borderRadius: "15px",
    borderStyle: "none",
    cursor: "pointer",
  };

  return (
    <DialogContent sx={{ backgroundColor: "rgb(210, 210, 210)" }}>
      <p>Edit Event?</p>
      <form style={style} onSubmit={handleFormSubmit}>
        <p>Date:</p>
        <div>
          {indexToMonth.get(eventDayState.eventMonth)} {eventDayState.eventDay},{" "}
          {eventDayState.eventYear}
        </div>
        <label>Event: </label>
        <input
          style={inputStyle}
          placeholder={eventToEdit.name}
          {...eventName}
        />
        <label style={fullWidthStyle}>Event Description: </label>
        <textarea
          style={{ ...fullWidthStyle, ...textAreaStyle }}
          placeholder={eventToEdit.description}
          {...eventDescription}
        />
        <button style={{ ...buttonStyle, gridColumn: "1 / 3", width: "70px" }}>
          submit
        </button>
      </form>
      <div style={{ marginTop: "10px" }}>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "rgb(255, 45, 45)",
            width: "70px",
          }}
          onClick={() => {
            handleDeleteEvent(eventDayState.eventId);
          }}
        >
          delete
        </button>
      </div>
    </DialogContent>
  );
};

export default EventEditForm;
